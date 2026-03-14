import * as cheerio from "cheerio";
import {
  extractSunsetOffsetMinutes,
  sunsetOffsetClock,
} from "../../../suntime";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "8aba0bd2-35b0-4550-bdee-c9d9feae5fd2",
    name: "Masjid Al-Mustafa",
    url: "https://masjidalmustafa.weebly.com",
    address: "300 E 55th St, Westmont, IL 60559, USA",
    timeZoneId: "America/Chicago",
    placeId: "ChIJw4fh4PtODogRC2F1kp2jYq0",
    geo: {
      latitude: 41.788639,
      longitude: -87.967464,
    },
  },
];

const normalizeLine = (value: string): string =>
  value.replace(/\s+/g, " ").trim();

const run = async () => {
  const response = await util.get("https://masjidalmustafa.weebly.com");
  const $ = cheerio.load(response.data);

  const target = $("div.paragraph")
    .toArray()
    .find((element) => /Fajr:/i.test($(element).text()));
  if (!target) {
    throw new Error("missing Masjid Al-Mustafa iqama text");
  }

  const text = normalizeLine($(target).text());
  const matches = text.match(/\d{1,2}:\d{2}\s*[ap]\.?m\.?/gi) ?? [];
  const maghribValue =
    /Maghrib:\s*(.+?)\s*Isha:/i.exec(text)?.[1]?.trim() ?? "";
  const maghribOffsetMinutes = extractSunsetOffsetMinutes(maghribValue);
  if (matches.length < 4 || maghribOffsetMinutes === null) {
    throw new Error(`failed to parse Masjid Al-Mustafa iqama block: ${text}`);
  }

  const fridayHeading = $("h2")
    .toArray()
    .find((element) => /Friday Prayer/i.test($(element).text()));
  if (!fridayHeading) {
    throw new Error("missing Masjid Al-Mustafa Friday Prayer section");
  }

  const fridayText = normalizeLine(
    $(fridayHeading).nextUntil("h2", "div.paragraph").text(),
  );
  const jumaTimes = [
    ...fridayText.matchAll(/Start:\s*(\d{1,2}:\d{2}\s*[ap]\.?m\.?)/gi),
  ]
    .map((match) => util.extractTimeAmPm(match[1] ?? ""))
    .filter(Boolean);
  if (jumaTimes.length === 0) {
    throw new Error(
      `failed to parse Masjid Al-Mustafa Friday Prayer times: ${fridayText}`,
    );
  }

  util.setIqamaTimes(ids[0], [
    matches[0] ?? "",
    matches[1] ?? "",
    matches[2] ?? "",
    sunsetOffsetClock(ids[0], maghribOffsetMinutes),
    matches[3] ?? "",
  ]);
  util.setJumaTimes(ids[0], jumaTimes);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/masjid-al-mustafa-westmont",
  ids,
  run,
};
