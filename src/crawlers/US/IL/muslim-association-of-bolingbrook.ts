import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

type PrayerWithIqama = {
  iqamahTime?: unknown;
};

type JumaBlock = {
  juma1IqamahTime?: unknown;
  juma2IqamahTime?: unknown;
  juma3IqamahTime?: unknown;
};

type JumaTimeEntry = {
  iqamahTime?: unknown;
};

type PrayerDataEntry = {
  date?: unknown;
  fajr?: PrayerWithIqama;
  dhuhr?: PrayerWithIqama;
  zuhr?: PrayerWithIqama;
  asr?: PrayerWithIqama;
  maghrib?: PrayerWithIqama;
  isha?: PrayerWithIqama;
  juma?: JumaBlock;
  jumaTimes?: JumaTimeEntry[];
};

type Page = Awaited<ReturnType<typeof util.load>>;

const extractAssignedJson = (
  scriptText: string,
  variableName: string,
  openChar: "{" | "[",
  closeChar: "}" | "]",
): string => {
  const assignmentPattern = new RegExp(`\\bvar\\s+${variableName}\\s*=`);
  const assignmentMatch = assignmentPattern.exec(scriptText);
  if (!assignmentMatch) {
    return "";
  }

  const start = scriptText.indexOf(openChar, assignmentMatch.index);
  if (start === -1) {
    return "";
  }

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = start; index < scriptText.length; index += 1) {
    const char = scriptText[index];
    if (!char) {
      continue;
    }

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }
    if (char === openChar) {
      depth += 1;
      continue;
    }
    if (char === closeChar) {
      depth -= 1;
      if (depth === 0) {
        return scriptText.slice(start, index + 1);
      }
    }
  }

  return "";
};

const parsePrayerDataEntries = ($: Page): PrayerDataEntry[] => {
  for (const script of $("script").toArray()) {
    const scriptText = $(script).html() ?? "";
    if (!scriptText) {
      continue;
    }

    const jsonDataText = extractAssignedJson(scriptText, "json_data", "[", "]");
    if (jsonDataText) {
      try {
        const parsed = JSON.parse(jsonDataText) as unknown;
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed as PrayerDataEntry[];
        }
      } catch {
        // Keep scanning script tags for a valid payload.
      }
    }

    const mnDataText = extractAssignedJson(scriptText, "mn", "{", "}");
    if (mnDataText) {
      try {
        const parsed = JSON.parse(mnDataText) as {
          prayerTimes?: PrayerDataEntry[];
        };
        if (
          Array.isArray(parsed.prayerTimes) &&
          parsed.prayerTimes.length > 0
        ) {
          return parsed.prayerTimes;
        }
      } catch {
        // Keep scanning script tags for a valid payload.
      }
    }
  }

  return [];
};

const normalizeTime = (value: unknown): string => {
  if (typeof value !== "string") {
    return "";
  }
  return util.extractTimeAmPm(value) || util.extractTime(value);
};

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "e8ba38bf-3c61-4e3f-8167-9e6c0c770dea",
    name: "Masjid Al-Islam",
    address: "560 E N Frontage Rd, Bolingbrook, IL 60440, USA",
    placeId: "ChIJqbAvBARbDogRZHT8ue9eZD4",
    timeZoneId: "America/Chicago",
    url: "http://bolingbrookmasjid.com",
    geo: {
      latitude: 41.698385,
      longitude: -88.044029,
    },
  },
  {
    uuid4: "f15a753e-bae3-4f37-a81c-d352cb8eec72",
    name: "Masjid Al-Jumu'ah",
    address: "351 Veterans Pkwy, Bolingbrook, IL 60490, USA",
    placeId: "ChIJGe_RdBdZDogRrHICztUkdME",
    timeZoneId: "America/Chicago",
    url: "http://bolingbrookmasjid.com",
    geo: {
      latitude: 41.688226,
      longitude: -88.118169,
    },
  },
];
const run = async () => {
  const $ = await util.load("http://bolingbrookmasjid.com");
  const entries = parsePrayerDataEntries($);
  if (entries.length === 0) {
    throw new Error("missing prayer data payload on bolingbrookmasjid.com");
  }

  const localDate = util.strftime("%d %B %Y", ids[0]).toLowerCase();
  const todayEntry =
    entries.find(
      (entry) =>
        typeof entry.date === "string" &&
        entry.date.trim().toLowerCase() === localDate,
    ) ?? entries[0];

  if (!todayEntry) {
    throw new Error("missing prayer data entry for bolingbrookmasjid.com");
  }

  const iqamaTimes = [
    normalizeTime(todayEntry.fajr?.iqamahTime),
    normalizeTime(todayEntry.dhuhr?.iqamahTime ?? todayEntry.zuhr?.iqamahTime),
    normalizeTime(todayEntry.asr?.iqamahTime),
    normalizeTime(todayEntry.maghrib?.iqamahTime),
    normalizeTime(todayEntry.isha?.iqamahTime),
  ];

  if (iqamaTimes.some((value) => value.length === 0)) {
    throw new Error("incomplete iqama times on bolingbrookmasjid.com");
  }

  let jumaTimes = (
    Array.isArray(todayEntry.jumaTimes) ? todayEntry.jumaTimes : []
  )
    .map((entry) => normalizeTime(entry.iqamahTime))
    .filter((value) => value.length > 0);

  if (jumaTimes.length === 0) {
    const juma = todayEntry.juma;
    jumaTimes = [
      normalizeTime(juma?.juma1IqamahTime),
      normalizeTime(juma?.juma2IqamahTime),
      normalizeTime(juma?.juma3IqamahTime),
    ].filter((value) => value.length > 0);
  }

  jumaTimes = [...new Set(jumaTimes)];
  if (jumaTimes.length === 0) {
    throw new Error("missing Juma times on bolingbrookmasjid.com");
  }

  util.setIqamaTimesAll(ids, iqamaTimes);
  util.setJumaTimesAll(ids, jumaTimes.slice(0, 3));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/muslim-association-of-bolingbrook",
  ids,
  run,
};
