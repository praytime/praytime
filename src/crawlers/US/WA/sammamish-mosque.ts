import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "e4dfb36d-7b2e-4ce8-8487-e544569ab459",
    name: "Sammamish Mosque",
    url: "http://www.sammamishmosque.com/",
    timeZoneId: "America/Los_Angeles",
    address: "22011 SE 20th St, Sammamish, WA 98075, USA",
    geo: {
      latitude: 47.591208,
      longitude: -122.04579,
    },
    placeId: "ChIJqYkmdyFukFQRZTbGcP7iuvg",
  },
];
export const crawler: CrawlerModule = {
  name: "US/WA/sammamish-mosque",
  ids,
  run: async () => {
    const $ = await util.load(ids[0].url ?? "");
    const localDate = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "short",
      day: "2-digit",
      year: "numeric",
      timeZone: ids[0].timeZoneId,
    }).format(new Date());
    const todayTable = $(".table_new.mySlides_new")
      .toArray()
      .find((element) =>
        $(element)
          .find(".date_section #gregorian-date_new")
          .toArray()
          .some((node) =>
            util.normalizeSpace($(node).text()).includes(localDate),
          ),
      );

    if (!todayTable) {
      throw new Error(`missing Sammamish prayer table for ${localDate}`);
    }

    const prayerRows = $(todayTable).find("tr").toArray();
    const prayerTimes = new Map<util.StandardPrayerKey, string>();
    for (const row of prayerRows) {
      const label = util.normalizeSpace(
        $(row).find("td.prayer-name, th.prayerName").first().text(),
      );
      const prayerKey = util.getStandardPrayerKey(label);
      if (!prayerKey || prayerTimes.has(prayerKey)) {
        continue;
      }

      const iqama = util.extractTimeAmPm(
        $(row).find("td.iqama-time, td.jamah").last().text(),
      );
      if (iqama) {
        prayerTimes.set(prayerKey, iqama);
      }
    }

    const jumaTimes = $(todayTable)
      .find(".jamu_sec_layout2 h1")
      .toArray()
      .map((node) => util.extractTimeAmPm($(node).text()))
      .filter((value): value is string => Boolean(value));

    util.setIqamaTimes(
      ids[0],
      util.requireStandardPrayerTimes(
        prayerTimes,
        "failed to parse Sammamish Mosque prayer times",
      ),
    );
    util.setJumaTimes(ids[0], jumaTimes);

    return ids;
  },
};
