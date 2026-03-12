import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const CHICAGO_MOSQUE_PRAYER_RX =
  /\\"name\\":\\"([^\\"]+)\\",\\"adhanTime\\":\\"[^\\"]*\\",\\"iqamahTime\\":\\"([^\\"]+)\\"/g;

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "5f1bdbb0-bb66-416b-b9ab-dc21242b8cf1",
    name: "Chicago Mosque",
    url: "http://chicagomosque.org/",
    address: "6201 W Peterson Ave, Chicago, IL 60646, USA",
    placeId: "ChIJyRnwWE7JD4gRcBUTeEOPZRo",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.989844,
      longitude: -87.782923,
    },
  },
];
const run = async () => {
  const { data: html } = await util.get<string>(ids[0].url);
  const prayers = new Map<util.StandardPrayerKey, string>();

  for (const match of html.matchAll(CHICAGO_MOSQUE_PRAYER_RX)) {
    const prayerKey = util.getStandardPrayerKey(match[1] ?? "");
    const iqama = util.extractTimeAmPm(match[2] ?? "");
    if (!prayerKey || !iqama || prayers.has(prayerKey)) {
      continue;
    }

    prayers.set(prayerKey, iqama);
  }

  util.setIqamaTimes(
    ids[0],
    util.requireStandardPrayerTimes(
      prayers,
      "failed to parse Chicago Mosque iqama times",
    ),
  );

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/chicago-mosque",
  ids,
  run,
};
