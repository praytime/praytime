import Tesseract from "tesseract.js";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const JUMUAH_BANNER_URL =
  "https://masjidal-huda.org/wp-content/uploads/2025/04/Jumuah-Schedule-Web-Banner.png";

const loadBannerJumaTime = async (): Promise<string> => {
  const { data } = await Tesseract.recognize(JUMUAH_BANNER_URL, "eng");
  const rawTimes =
    data.text.match(
      /[^\s\d]?\s*:\s*\d{2}\s*[AP]M|\d{1,2}\s*:\s*\d{2}\s*[AP]M/gi,
    ) ?? [];
  const recognizedHours = Array.from(
    new Set(
      rawTimes
        .map((value) => value.trim().match(/^\d/)?.[0])
        .filter((value): value is string => Boolean(value)),
    ),
  );
  const fallbackHour =
    recognizedHours.length === 1 ? (recognizedHours[0] ?? "") : "";
  const normalizedTimes = rawTimes
    .map((value) => {
      const normalized = value.trim().replace(/^[^\d]+/, fallbackHour);
      return util.extractTimeAmPm(normalized);
    })
    .filter((value): value is string => Boolean(value));
  const firstTime = normalizedTimes[0];
  if (!firstTime) {
    throw new Error("failed to OCR Masjid Al-Huda Jumu'ah banner");
  }
  return firstTime;
};

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a97bd954-7ddc-4244-91fd-15e0d1898f48",
    name: "Masjid Al-Huda",
    url: "http://www.masjidal-huda.org/",
    timeZoneId: "America/Los_Angeles",
    address: "3880 Smith St, Union City, CA 94587, USA",
    placeId: "ChIJIxHdetmVj4ARLg0REb22r_A",
    geo: {
      latitude: 37.5961509,
      longitude: -122.0786946,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);
  const prayerTimes = new Map<string, string>();
  const jumaTimes = $("table tr")
    .toArray()
    .flatMap((row) => {
      const prayerName = $(row).find(".prayerName").first().text().trim();
      if (!/jum['’]?(u|o)?a?h/i.test(prayerName)) {
        return [];
      }

      const publishedTime = util.normalizeLooseClock(
        $(row).find("td").first().text(),
      );
      return publishedTime ? [publishedTime] : [];
    });

  $("table tr").each((_, row) => {
    const prayerName = $(row).find(".prayerName").first().text().trim();
    const prayerKey = util.getStandardPrayerKey(prayerName);
    if (!prayerKey) {
      return;
    }

    const iqamaTime = util.normalizeLooseClock(
      $(row).find("td.jamah").first().text(),
    );
    if (iqamaTime) {
      prayerTimes.set(prayerKey, iqamaTime);
    }
  });

  util.setIqamaTimes(
    ids[0],
    util.requireStandardPrayerTimes(
      prayerTimes,
      "failed to parse Masjid Al-Huda iqama times",
    ),
  );
  if (util.isJumaToday(ids[0])) {
    const publishedJumaTimes =
      jumaTimes.length > 0 ? jumaTimes : [await loadBannerJumaTime()];
    util.setJumaTimes(ids[0], publishedJumaTimes.slice(0, 3));
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CA/masjid-al-huda-union-city",
  ids,
  run,
};
