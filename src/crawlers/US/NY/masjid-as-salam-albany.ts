import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c9f1fae4-b8e8-4bd5-86ea-86a4b7084000",
    name: "Masjid As-Salam",
    url: "http://www.assalammasjid.org/",
    timeZoneId: "America/New_York",
    address: "276 Central Ave, Albany, NY 12206, USA",
    placeId: "ChIJpfl7Y0oK3okRtyZlCC-pb-E",
    geo: {
      latitude: 42.663953,
      longitude: -73.77221399999999,
    },
  },
];

const PRAYER_LABELS = new Set([
  "asr",
  "fajr",
  "friday khutba",
  "isha",
  "magrib",
  "zuhr",
]);

const run = async () => {
  const $ = await util.load(ids[0].url);
  const prayerTimes = new Map<string, string>();

  $("h4.elementor-heading-title").each((_, element) => {
    const label = util.normalizeSpace($(element).text()).toLowerCase();
    if (!PRAYER_LABELS.has(label)) {
      return;
    }

    const section = $(element).closest("section.elementor-inner-section");
    const time = util.normalizeSpace(
      section.find("h3.elementor-heading-title").first().text(),
    );
    if (time) {
      prayerTimes.set(label, time);
    }
  });

  const fajr = util.extractTimeAmPm(prayerTimes.get("fajr"));
  const zuhr = util.extractTimeAmPm(prayerTimes.get("zuhr"));
  const asr = util.extractTimeAmPm(prayerTimes.get("asr"));
  const maghribRaw = prayerTimes.get("magrib") ?? "";
  const maghrib = /^on time$/i.test(util.normalizeSpace(maghribRaw))
    ? "sunset"
    : util.extractTimeAmPm(maghribRaw);
  const isha = util.extractTimeAmPm(prayerTimes.get("isha"));
  const juma1 = util.extractTimeAmPm(prayerTimes.get("friday khutba"));

  if (!fajr || !zuhr || !asr || !maghrib || !isha || !juma1) {
    throw new Error("failed to parse Masjid As-Salam prayer times");
  }

  util.setIqamaTimes(ids[0], [fajr, zuhr, asr, maghrib, isha]);
  util.setJumaTimes(ids[0], [juma1]);
  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/masjid-as-salam-albany",
  ids,
  run,
};
