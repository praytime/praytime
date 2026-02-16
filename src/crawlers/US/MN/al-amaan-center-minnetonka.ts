import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "d6abef87-f2f3-4f90-8daa-74e2c7ba6172",
    name: "Al-Amaan Center",
    url: "http://alamaan.org/",
    timeZoneId: "America/Chicago",
    address: "5620 Smetana Dr, Minnetonka, MN 55343, USA",
    placeId: "ChIJ2yoQ9-Ih9ocRQBeJrTD1hns",
    geo: {
      latitude: 44.900831,
      longitude: -93.4049311,
    },
  },
];

const PRAYER_TIMES_PDF_URL =
  "https://www.alamaan.org/_files/ugd/db7ef5_a51cb27a3e184cf385c4fdecc2230422.pdf";

const extractLayoutTextFromPdf = async (url: string): Promise<string> => {
  const response = await Bun.fetch(url);
  if (!response.ok) {
    throw new Error(`failed to download prayer times pdf: ${response.status}`);
  }

  const tempPath = `/tmp/alamaan-prayer-times-${Date.now()}.pdf`;
  const pdfBuffer = await response.arrayBuffer();
  await Bun.write(tempPath, new Uint8Array(pdfBuffer));

  try {
    return await Bun.$`pdftotext -layout ${tempPath} -`.text();
  } catch (error) {
    throw new Error(
      `failed to extract prayer times pdf text: ${String(error)}`,
    );
  } finally {
    await Bun.$`rm -f ${tempPath}`.quiet();
  }
};

const findTodayRow = (
  pdfText: string,
  record: CrawlerModule["ids"][number],
) => {
  const dateKey = `${Number.parseInt(util.strftime("%d", record), 10)}-${util.strftime("%b", record)}`;
  const rowPattern = new RegExp(
    `^\\s*${dateKey}\\s+\\w{3}\\s+\\d+\\s+` +
      `(\\d{1,2}:\\d{2})\\s+` +
      `(\\d{1,2}:\\d{2})\\s+` +
      `(\\d{1,2}:\\d{2})\\s+` +
      `(\\d{1,2}:\\d{2})\\s+` +
      `(\\d{1,2}:\\d{2})\\s+` +
      `(\\d{1,2}:\\d{2})\\s+` +
      `(\\d{1,2}:\\d{2})\\s+` +
      `(\\d{1,2}:\\d{2})\\s+` +
      `(\\d{1,2}:\\d{2})\\s*$`,
    "m",
  );
  return pdfText.match(rowPattern);
};

const extractJumaTimes = (pdfText: string): string[] => {
  const match = pdfText.match(
    /Friday Khutbas:\s*1st at\s*([0-9: ]+[ap]m).*?2nd at\s*([0-9: ]+[ap]m)/i,
  );
  if (!match) {
    throw new Error("missing juma timings in prayer pdf");
  }

  const juma1 = util.extractTimeAmPm(match[1]);
  const juma2 = util.extractTimeAmPm(match[2]);
  if (!juma1 || !juma2) {
    throw new Error("failed to parse juma timings in prayer pdf");
  }

  return [juma1, juma2];
};

const run = async () => {
  const record = ids[0];
  if (!record) {
    throw new Error("missing masjid record");
  }

  const pdfText = await extractLayoutTextFromPdf(PRAYER_TIMES_PDF_URL);
  const rowMatch = findTodayRow(pdfText, record);
  if (!rowMatch) {
    const targetDate = `${Number.parseInt(util.strftime("%d", record), 10)}-${util.strftime("%b", record)}`;
    throw new Error(`no prayers found for ${targetDate}`);
  }

  const fajrIqama = rowMatch[2];
  const zuhrIqama = rowMatch[5];
  const asrIqama = rowMatch[7];
  const maghrib = rowMatch[8];
  const isha = rowMatch[9];
  if (!fajrIqama || !zuhrIqama || !asrIqama || !maghrib || !isha) {
    throw new Error("failed to parse required iqama fields from prayer pdf");
  }

  const jumaTimes = extractJumaTimes(pdfText);
  util.setTimes(record, [
    fajrIqama,
    zuhrIqama,
    asrIqama,
    maghrib,
    isha,
    ...jumaTimes,
  ]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MN/al-amaan-center-minnetonka",
  ids,
  run,
};
