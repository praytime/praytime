import { loadPdfText } from "../../../pdftext";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const PRAYER_TIMES_PDF_URL =
  "https://www.alamaan.org/_files/ugd/db7ef5_409d76110e04490092e27bf19cfbbab9.pdf";

const findPrayerTimesPdfLine = (
  text: string,
  record: CrawlerModule["ids"][number] | undefined,
): string | undefined => {
  if (!record) {
    return undefined;
  }

  const month = util.strftime("%b", record);
  const day = String(Number.parseInt(util.strftime("%d", record), 10));
  const datePattern = new RegExp(`^${day}-${month}\\b`, "i");

  return text
    .split(/\r?\n/)
    .map(util.normalizeSpace)
    .find((line) => datePattern.test(line));
};

const prayerTimesFromPdfLine = (line: string): string[] => {
  const times = line.match(/\b\d{1,2}:\d{2}\b/g) ?? [];
  if (times.length < 9) {
    throw new Error("unexpected Al-Amaan prayer times row format");
  }

  const fajr = util.normalize24HourClock(times[1] ?? "");
  const zuhr = util.normalize24HourClock(times[4] ?? "");
  const asr = util.normalize24HourClock(times[6] ?? "");
  const maghrib = util.normalize24HourClock(times[7] ?? "");
  const isha = util.normalize24HourClock(times[8] ?? "");
  if (!fajr || !zuhr || !asr || !maghrib || !isha) {
    throw new Error("missing Al-Amaan daily prayer times in PDF");
  }

  return [fajr, zuhr, asr, maghrib, isha];
};

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "d6abef87-f2f3-4f90-8daa-74e2c7ba6172",
    name: "Al-Amaan Center",
    url: "https://www.alamaan.org/",
    timeZoneId: "America/Chicago",
    address: "5620 Smetana Dr, Minnetonka, MN 55343, USA",
    placeId: "ChIJ2yoQ9-Ih9ocRQBeJrTD1hns",
    geo: {
      latitude: 44.900831,
      longitude: -93.4049311,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/al-amaan-center-minnetonka",
  ids,
  run: async () => {
    const prayerTimesPdfText = await loadPdfText(PRAYER_TIMES_PDF_URL);
    const todayLine = findPrayerTimesPdfLine(prayerTimesPdfText, ids[0]);
    if (!todayLine) {
      throw new Error("missing Al-Amaan prayer times PDF row");
    }

    const jumaLine = prayerTimesPdfText
      .split(/\r?\n/)
      .map(util.normalizeSpace)
      .find((line) => /Friday Khutbas:/i.test(line));
    const jumaTimes = [...(util.matchTimeAmPmG(jumaLine) ?? [])]
      .map(util.extractTimeAmPm)
      .filter((value): value is string => Boolean(value));
    if (jumaTimes.length === 0) {
      throw new Error("missing Al-Amaan Friday khutbah times in PDF");
    }

    util.setIqamaTimes(ids[0], prayerTimesFromPdfLine(todayLine));
    util.setJumaTimes(ids[0], jumaTimes);

    return ids;
  },
};
