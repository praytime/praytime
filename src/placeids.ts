import ts from "typescript";

import type { GeoPoint } from "./types";

export interface PlaceIdRefreshTarget {
  address: string;
  crawlerName: string;
  geo: GeoPoint;
  name: string;
  placeId: string;
  sourcePath: string;
  uuid4: string;
}

export interface PlaceLookupCandidate {
  address: string;
  geo?: GeoPoint;
  name: string;
  placeId: string;
}

export interface PlaceCandidateScore {
  accepted: boolean;
  addressExact: boolean;
  addressSimilarity: number;
  candidate: PlaceLookupCandidate;
  distanceMeters: number;
  nameExact: boolean;
  nameSimilarity: number;
  score: number;
}

const tokenAliasMap = new Map<string, string>([
  ["aly", "alley"],
  ["ave", "avenue"],
  ["blvd", "boulevard"],
  ["cir", "circle"],
  ["ct", "court"],
  ["dr", "drive"],
  ["e", "east"],
  ["hwy", "highway"],
  ["ln", "lane"],
  ["mt", "mount"],
  ["n", "north"],
  ["ne", "northeast"],
  ["nw", "northwest"],
  ["pkwy", "parkway"],
  ["pl", "place"],
  ["rd", "road"],
  ["s", "south"],
  ["se", "southeast"],
  ["sq", "square"],
  ["st", "street"],
  ["ste", "suite"],
  ["sw", "southwest"],
  ["ter", "terrace"],
  ["w", "west"],
]);

const postalCodeRx = /\b(?:\d{5}(?:-\d{4})?|[a-z]\d[a-z]\s?\d[a-z]\d)\b/i;

const normalizeToken = (token: string): string =>
  tokenAliasMap.get(token) ?? token;

const toTokens = (value: string): string[] =>
  value
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter((token) => token.length > 0)
    .map(normalizeToken);

export const normalizePlaceText = (value: string): string =>
  toTokens(value).join(" ");

const toTokenSet = (value: string): Set<string> => new Set(toTokens(value));

const overlapRatio = (left: Set<string>, right: Set<string>): number => {
  if (left.size === 0 || right.size === 0) {
    return 0;
  }

  let shared = 0;
  for (const token of left) {
    if (right.has(token)) {
      shared += 1;
    }
  }

  return shared / Math.max(left.size, right.size);
};

const toRadians = (value: number): number => (value * Math.PI) / 180;

export const haversineMeters = (left: GeoPoint, right: GeoPoint): number => {
  const earthRadiusMeters = 6_371_000;
  const latitudeDelta = toRadians(right.latitude - left.latitude);
  const longitudeDelta = toRadians(right.longitude - left.longitude);
  const leftLatitude = toRadians(left.latitude);
  const rightLatitude = toRadians(right.latitude);

  const a =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(leftLatitude) *
      Math.cos(rightLatitude) *
      Math.sin(longitudeDelta / 2) ** 2;

  return 2 * earthRadiusMeters * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const extractPostalCode = (value: string): string | null => {
  const match = value.match(postalCodeRx);
  return match?.[0]?.replace(/\s+/g, "").toLowerCase() ?? null;
};

const computeDistanceMeters = (
  target: PlaceIdRefreshTarget,
  candidate: PlaceLookupCandidate,
): number => {
  if (!candidate.geo) {
    return Number.POSITIVE_INFINITY;
  }

  return haversineMeters(target.geo, candidate.geo);
};

export const scorePlaceCandidate = (
  target: PlaceIdRefreshTarget,
  candidate: PlaceLookupCandidate,
): PlaceCandidateScore => {
  const normalizedTargetName = normalizePlaceText(target.name);
  const normalizedCandidateName = normalizePlaceText(candidate.name);
  const normalizedTargetAddress = normalizePlaceText(target.address);
  const normalizedCandidateAddress = normalizePlaceText(candidate.address);
  const nameExact =
    normalizedTargetName.length > 0 &&
    normalizedTargetName === normalizedCandidateName;
  const addressExact =
    normalizedTargetAddress.length > 0 &&
    normalizedTargetAddress === normalizedCandidateAddress;
  const nameSimilarity = overlapRatio(
    toTokenSet(target.name),
    toTokenSet(candidate.name),
  );
  const addressSimilarity = overlapRatio(
    toTokenSet(target.address),
    toTokenSet(candidate.address),
  );
  const distanceMeters = computeDistanceMeters(target, candidate);
  const targetPostalCode = extractPostalCode(target.address);
  const candidatePostalCode = extractPostalCode(candidate.address);
  const postalCodeMatches =
    targetPostalCode !== null &&
    candidatePostalCode !== null &&
    targetPostalCode === candidatePostalCode;

  let score = 0;

  score += nameExact ? 500 : Math.round(nameSimilarity * 300);
  score += addressExact ? 700 : Math.round(addressSimilarity * 450);

  if (postalCodeMatches) {
    score += 120;
  }

  if (Number.isFinite(distanceMeters)) {
    if (distanceMeters <= 50) {
      score += 250;
    } else if (distanceMeters <= 250) {
      score += 200;
    } else if (distanceMeters <= 1_000) {
      score += 150;
    } else if (distanceMeters <= 5_000) {
      score += 100;
    } else if (distanceMeters <= 20_000) {
      score += 25;
    } else {
      score -= Math.min(200, Math.round(distanceMeters / 1_000));
    }
  }

  const accepted =
    addressExact ||
    (nameExact && (distanceMeters <= 1_000 || addressSimilarity >= 0.75)) ||
    (addressSimilarity >= 0.92 && distanceMeters <= 5_000) ||
    (nameSimilarity >= 0.95 &&
      addressSimilarity >= 0.75 &&
      distanceMeters <= 2_000);

  return {
    accepted,
    addressExact,
    addressSimilarity,
    candidate,
    distanceMeters,
    nameExact,
    nameSimilarity,
    score,
  };
};

export const pickBestPlaceCandidate = (
  target: PlaceIdRefreshTarget,
  candidates: PlaceLookupCandidate[],
): PlaceCandidateScore | null => {
  const scoredCandidates = candidates
    .map((candidate) => scorePlaceCandidate(target, candidate))
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return left.distanceMeters - right.distanceMeters;
    });

  const best = scoredCandidates[0];
  if (!best || !best.accepted) {
    return null;
  }

  const runnerUp = scoredCandidates[1];
  if (
    runnerUp?.accepted &&
    runnerUp.candidate.placeId !== best.candidate.placeId &&
    best.score - runnerUp.score < 120
  ) {
    return null;
  }

  return best;
};

type PlaceIdLiteralRange = {
  end: number;
  quote: '"' | "'";
  start: number;
};

const getPropertyName = (propertyName: ts.PropertyName): string | null => {
  if (ts.isIdentifier(propertyName) || ts.isStringLiteral(propertyName)) {
    return propertyName.text;
  }

  return null;
};

const getStringLiteralText = (expression: ts.Expression): string | null => {
  if (
    ts.isStringLiteral(expression) ||
    ts.isNoSubstitutionTemplateLiteral(expression)
  ) {
    return expression.text;
  }

  return null;
};

const collectPlaceIdLiteralRanges = (
  sourceText: string,
): Map<string, PlaceIdLiteralRange> => {
  const sourceFile = ts.createSourceFile(
    "crawler.ts",
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const ranges = new Map<string, PlaceIdLiteralRange>();

  const visit = (node: ts.Node): void => {
    if (ts.isObjectLiteralExpression(node)) {
      let uuid4: string | null = null;
      let placeIdInitializer: ts.Expression | null = null;

      for (const property of node.properties) {
        if (!ts.isPropertyAssignment(property)) {
          continue;
        }

        const name = getPropertyName(property.name);
        if (name === "uuid4") {
          uuid4 = getStringLiteralText(property.initializer);
        } else if (name === "placeId") {
          placeIdInitializer = property.initializer;
        }
      }

      const placeIdValue =
        placeIdInitializer && getStringLiteralText(placeIdInitializer);
      if (uuid4 && placeIdInitializer && placeIdValue !== null) {
        const start = placeIdInitializer.getStart(sourceFile);
        const quote = sourceText[start];
        if (quote !== '"' && quote !== "'") {
          throw new Error(`unsupported placeId literal for uuid4 ${uuid4}`);
        }

        ranges.set(uuid4, {
          end: placeIdInitializer.getEnd(),
          quote,
          start,
        });
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return ranges;
};

const quoteString = (value: string, quote: '"' | "'"): string => {
  if (quote === "'") {
    return `'${value.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
  }

  return JSON.stringify(value);
};

export const updateSourceTextPlaceIds = (
  sourceText: string,
  replacements: Array<{ placeId: string; uuid4: string }>,
): string => {
  const ranges = collectPlaceIdLiteralRanges(sourceText);
  let nextSourceText = sourceText;

  const sortedReplacements = replacements
    .map((replacement) => {
      const range = ranges.get(replacement.uuid4);
      if (!range) {
        throw new Error(
          `unable to find placeId for uuid4 ${replacement.uuid4}`,
        );
      }

      return {
        ...range,
        nextPlaceId: replacement.placeId,
        uuid4: replacement.uuid4,
      };
    })
    .sort((left, right) => right.start - left.start);

  for (const replacement of sortedReplacements) {
    nextSourceText =
      nextSourceText.slice(0, replacement.start) +
      quoteString(replacement.nextPlaceId, replacement.quote) +
      nextSourceText.slice(replacement.end);
  }

  return nextSourceText;
};
