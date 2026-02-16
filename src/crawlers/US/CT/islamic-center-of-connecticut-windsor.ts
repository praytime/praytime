import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const MONTHLY_CSV_FALLBACK_URL =
  "https://docs.google.com/spreadsheets/d/1BmoygJSbCiYXu-ZzR_CgyWAm-rlO5fGVsnyRucSFBwU/export?format=csv";

const normalizeClock = (value: string | undefined): string =>
  util.extractTimeAmPm(value) || util.extractTime(value);

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "d7aba698-1629-47f0-81e3-43eb4793950e",
    name: "Islamic Center of Connecticut",
    url: "http://www.icct.org/",
    timeZoneId: "America/New_York",
    address: "140 White Rock Dr, Windsor, CT 06095, USA",
    placeId: "ChIJ22c7-gFV5okR5VB31z_PwWc",
    geo: {
      latitude: 41.8117238,
      longitude: -72.6712632,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);
  const pageScript = util
    .mapToText($, "script")
    .find((text) => text.includes("spreadsheets/d/"));
  const csvUrl =
    pageScript?.match(
      /https:\/\/docs\.google\.com\/spreadsheets\/d\/[^"'\\\s]+\/export\?format=csv/,
    )?.[0] ?? MONTHLY_CSV_FALLBACK_URL;

  const response = await util.get<string>(csvUrl);
  if (typeof response.data !== "string") {
    throw new Error("unexpected prayer csv response type");
  }

  const day = Number.parseInt(util.strftime("%d", ids[0]), 10);
  if (!Number.isFinite(day) || day < 1) {
    throw new Error("failed to derive local day");
  }

  const rows = response.data
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  const currentRow = rows[day - 1];
  if (!currentRow) {
    throw new Error(`missing csv row for day ${day}`);
  }

  const columns = currentRow.split(",");
  if (columns.length < 11) {
    throw new Error("unexpected prayer csv row format");
  }
  const iqamaTimes = [
    normalizeClock(columns[2]),
    normalizeClock(columns[5]),
    normalizeClock(columns[7]),
    normalizeClock(columns[8]),
    normalizeClock(columns[10]),
  ];
  if (iqamaTimes.some((time) => !time)) {
    throw new Error("failed to parse iqamah times");
  }

  util.setIqamaTimes(ids[0], iqamaTimes);
  util.setJumaTimes(ids[0], ["check website"]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CT/islamic-center-of-connecticut-windsor",
  ids,
  run,
};
