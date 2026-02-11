// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "28b3575e-ee0c-4119-a007-17acb27451e0",
    name: "South Metro Islamic Center",
    url: "https://www.southmetroic.org/",
    timeZoneId: "America/Chicago",
    address: "15400 S Robert Trail, Rosemount, MN 55068, USA",
    placeId: "ChIJXbQWP4Q09ocRrozNTohb57U",
    geo: {
      latitude: 44.72677119999999,
      longitude: -93.13164909999999,
    },
  },
];
const run = async () => {
  const data = await util.loadJson(
    "https://www.masjidnow.com/api/v2/salah_timings/daily.json?masjid_id=10116",
  );

  if (data.masjid.salah_timing.date === util.strftime("%Y-%m-%d", ids[0])) {
    util.setIqamaTimes(ids[0], [
      data.masjid.salah_timing.fajr,
      data.masjid.salah_timing.dhuhr,
      data.masjid.salah_timing.asr,
      data.masjid.salah_timing.maghrib,
      data.masjid.salah_timing.isha,
    ]);
  } else {
    util.setIqamaTimes(ids[0], Array(5).fill("--"));
  }
  util.setJumaTimes(ids[0], ["check website"]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MN/south-metro-islamic-center-rosemount",
  ids,
  run,
};
