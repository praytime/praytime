import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3d4df36b-9532-44a1-be32-2cfd4fb08010",
    name: "New Brunswick Islamic Center",
    url: "https://www.nbic.org/",
    address: "1330 Livingston Ave, North Brunswick Township, NJ 08902, USA",
    placeId: "ChIJaz5NthjEw4kR8CNP7bVa7II",
    timeZoneId: "America/New_York",
    geo: {
      latitude: 40.461986,
      longitude: -74.477192,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);
  const prayerTimes = $(".prayertimes tr")
    .eq(1)
    .find("td")
    .toArray()
    .map((cell) =>
      $(cell)
        .text()
        .replace(/\s+/g, " ")
        .replace(/^(Fajr|Dhuhr|Asr|Maghrib|Isha)\s*/i, "")
        .trim(),
    );
  if (prayerTimes.length < 5) {
    throw new Error("failed to parse prayer table");
  }

  const jumaText =
    $(".sqs-html-content")
      .toArray()
      .map((element) => $(element).text().replace(/\s+/g, " ").trim())
      .find((text) => /juma timings/i.test(text)) ?? "";
  const jumaTimes = util.matchTimeG(jumaText) ?? [];
  if (jumaTimes.length === 0) {
    throw new Error("failed to parse juma times");
  }

  util.setIqamaTimes(ids[0], prayerTimes.slice(0, 5));
  util.setJumaTimes(ids[0], jumaTimes.slice(0, 3));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NJ/new-brunswick-islamic-center-new-jersey",
  ids,
  run,
};
