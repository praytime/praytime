import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const PRAYER_TIMES_URL = "https://www.davenportmasjid.org/";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "bd0a9214-ddf6-41ba-9bdb-49401752a59b",
    name: "Davenport Muslim Prayer",
    url: PRAYER_TIMES_URL,
    timeZoneId: "America/New_York",
    address: "1624 Florida Development Rd, Davenport, FL 33837, USA",
    placeId: "ChIJv06YZIVx3YgRk7ncT2DaVQ4",
    geo: {
      latitude: 28.18719789999999,
      longitude: -81.63003030000002,
    },
  },
];

const run: CrawlerModule["run"] = async () => {
  const $ = await util.load(PRAYER_TIMES_URL);
  const prayers = new Map<util.StandardPrayerKey, string>();
  const jumaTimes: string[] = [];

  $(".timer-num li").each((_, item) => {
    const text = $(item).text().replace(/\s+/g, " ").trim();
    const time = util.extractTimeAmPm(text);
    if (!time) {
      return;
    }

    const label = text.replace(time, "").trim();
    const prayerKey = util.getStandardPrayerKey(label);
    if (prayerKey) {
      prayers.set(prayerKey, time);
      return;
    }

    if (/jumma/i.test(label)) {
      jumaTimes.push(time);
    }
  });

  util.setIqamaTimes(
    ids[0],
    util.requireStandardPrayerTimes(
      prayers,
      "failed to parse Davenport Muslim Prayer times",
    ),
  );
  util.setJumaTimes(ids[0], jumaTimes);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/FL/davenport-muslim-prayer-davenport",
  ids,
  run,
};
