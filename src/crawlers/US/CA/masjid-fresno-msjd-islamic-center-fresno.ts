import { sunsetOffsetClock } from "../../../suntime";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const normalizeClock = (value: string): string =>
  util.extractTimeAmPm(value) || util.extractTime(value) || value;

const maghribOffsetMinutes = (value: string): number | null => {
  const sunsetOffset = value.match(
    /(\d+)\s*mins?\s*after\s*(?:adhan|athan|azan)/i,
  );
  if (!sunsetOffset?.[1]) {
    return null;
  }

  const minutes = Number.parseInt(sunsetOffset[1], 10);
  return Number.isFinite(minutes) ? minutes : null;
};

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f0a43d83-c05f-4665-a311-b4d0d9afbfc6",
    name: "Masjid Fresno مسجد Islamic Center",
    url: "http://www.masjidfresno.org/",
    timeZoneId: "America/Los_Angeles",
    address: "2111 E Shaw Ave, Fresno, CA 93710, USA",
    placeId: "ChIJx85SUQZdlIARdeRWM6bepZU",
    geo: {
      latitude: 36.8082955,
      longitude: -119.7517433,
    },
  },
];
const run = async () => {
  const $ = await util.load("https://masjidfresno.org/");
  const rows = $(".iqama-table-section tbody tr").toArray();
  const values = new Map<string, string>();

  for (const row of rows) {
    const cells = $(row)
      .find("td")
      .toArray()
      .map((cell) => util.normalizeSpace($(cell).text()));
    const label = cells[0]?.toLowerCase() ?? "";
    const value = cells[1] ?? "";

    if (!label || !value) {
      continue;
    }

    values.set(label, value);
  }

  const maghribRaw = values.get("maghrib") ?? "";
  const maghrib =
    maghribOffsetMinutes(maghribRaw) !== null
      ? sunsetOffsetClock(ids[0], maghribOffsetMinutes(maghribRaw) ?? 0)
      : normalizeClock(maghribRaw);

  util.setIqamaTimes(ids[0], [
    normalizeClock(values.get("fajr") ?? ""),
    normalizeClock(values.get("dhuhr") ?? ""),
    normalizeClock(values.get("asr") ?? ""),
    maghrib,
    normalizeClock(values.get("isha") ?? ""),
  ]);
  util.setJumaTimes(ids[0], [normalizeClock(values.get("jumu'ah") ?? "")]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CA/masjid-fresno-msjd-islamic-center-fresno",
  ids,
  run,
};
