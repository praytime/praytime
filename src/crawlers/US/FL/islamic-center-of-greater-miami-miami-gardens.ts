import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const PRAYER_TIMES_URL = "https://www.icgm-fl.org/";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "4309d979-d730-4a9e-a12e-316a0f6218da",
    name: "Islamic Center of Greater Miami",
    url: PRAYER_TIMES_URL,
    timeZoneId: "America/New_York",
    address: "4305 NW 183rd St, Miami Gardens, FL 33055, USA",
    placeId: "ChIJXzKFYoav2YgREiNAZ9Ly22M",
    geo: {
      latitude: 25.9407944,
      longitude: -80.2718556,
    },
  },
  {
    uuid4: "23932380-e633-4c90-a41d-6218f72be2cf",
    name: "Miami Masjid",
    url: PRAYER_TIMES_URL,
    timeZoneId: "America/New_York",
    address: "7350 NW 3rd St, Miami, FL 33126, USA",
    placeId: "ChIJLzBk26652YgRoq6Ojwn5pFo",
    geo: {
      latitude: 25.7734119,
      longitude: -80.3147256,
    },
  },
];

const rowTexts = (values: string[]): string[] =>
  values.map((value) => value.replace(/\s+/g, " ").trim()).filter(Boolean);

const extractTimes = (values: string[]): string[] =>
  rowTexts(values)
    .map((value) => util.extractTimeAmPm(value))
    .filter((value) => value.length > 0);

const run: CrawlerModule["run"] = async () => {
  const $ = await util.load(PRAYER_TIMES_URL);

  const iqamaTimes = extractTimes(
    $(".gcm-daily-table")
      .first()
      .find("tr")
      .eq(1)
      .find("td > div")
      .toArray()
      .map((cell) => $(cell).text()),
  );
  if (iqamaTimes.length < 5) {
    throw new Error("failed to parse ICGM daily iqama table");
  }

  const jumaRows = $("table tr")
    .toArray()
    .map((row) =>
      rowTexts(
        $(row)
          .find("td")
          .toArray()
          .map((cell) => $(cell).text()),
      ),
    )
    .filter((row) => row.some((cell) => /jummah/i.test(cell)));

  const greaterMiamiJuma = jumaRows.find((row) =>
    /greater miami/i.test(row[0] ?? ""),
  );
  const flaglerJuma = jumaRows.find((row) => /flagler/i.test(row[0] ?? ""));
  if (!greaterMiamiJuma || !flaglerJuma) {
    throw new Error("failed to parse ICGM jummah table");
  }

  util.setIqamaTimes(ids[0], iqamaTimes);
  util.setJumaTimes(ids[0], extractTimes(greaterMiamiJuma));
  util.setIqamaTimes(ids[1], iqamaTimes);
  util.setJumaTimes(ids[1], extractTimes(flaglerJuma));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/FL/islamic-center-of-greater-miami-miami-gardens",
  ids,
  run,
};
