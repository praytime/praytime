import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

type ApiPrayer = {
  type: {
    IQAMA?: {
      time: string;
    };
    AZAAN?: {
      time: string;
    };
  };
};

type ApiDay = {
  prayerDay: string;
  prayerSchedule: ApiPrayer[];
};

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "2b458b1f-a75a-40a2-bd9e-9aef24305a99",
    name: "Al Iman Islamic Centre",
    url: "http://al-imancenter.com/",
    timeZoneId: "America/Vancouver",
    address: "13478 78 Ave Unit #18, Surrey, BC V3W 8J6, Canada",
    placeId: "ChIJF_8EqfKDC0ERYBnV7veSj94",
    geo: {
      latitude: 49.1437403,
      longitude: -122.8478201,
    },
  },
];
const run = async () => {
  //        %B     The full month name according to the current locale.
  //        %Y     The full year, including the century.
  const d = await util.loadJson<ApiDay[]>(
    util.strftime(
      "http://al-imancenter.com/api/prayerTimeTable?prayerMonth=%B&prayerYear=%Y",
      ids[0],
    ),
  );

  //        %d     The day of the month as a decimal number (range 01 to 31).
  const day = util.strftime("%d", ids[0]);
  const schedule = d.find(({ prayerDay }) => prayerDay === day);
  if (!schedule) {
    throw new Error(`missing schedule for day ${day}`);
  }

  util.setTimes(
    ids[0],
    schedule.prayerSchedule.map(
      (prayer) => prayer.type.IQAMA?.time ?? prayer.type.AZAAN?.time ?? "",
    ),
  );

  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/al-iman-islamic-centre-surrey",
  ids,
  run,
};
