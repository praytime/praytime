import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "517cec12-c6c4-4f13-a56d-ce379687930c",
    name: "Islamic Center of Pittsburgh",
    url: "https://www.icp-pgh.org/",
    timeZoneId: "America/New_York",
    address: "4100 Bigelow Blvd, Pittsburgh, PA 15213, USA",
    placeId: "ChIJFZREtS_yNIgR5nv22mFYtNU",
    geo: {
      latitude: 40.4487804,
      longitude: -79.955861,
    },
  },
];

// https://www.masjidnow.com/api/v2/salah_timings/daily.json?masjid_id=2904
// {
//   "masjid": {
//     "id": 2904,
//     "name": "Islamic Center Of Pittsburgh (icp)",
//     "latitude": 40.4488312,
//     "longitude": -79.9554223,
//     "ads_disabled": false,
//     "donations_enabled": false,
//     "salah_timing": {
//       "month": 11,
//       "day": 24,
//       "fajr": "6:30am",
//       "dhuhr": "12:30pm",
//       "asr": "3:00pm",
//       "maghrib": "5:01pm",
//       "isha": "7:00pm",
//       "year": 2021,
//       "date": "2021-11-24",
//       "fajr_adhan": "5:57am",
//       "sunrise_adhan": "7:17am",
//       "dhuhr_adhan": "12:07pm",
//       "asr_adhan": "2:37pm",
//       "maghrib_adhan": "4:56pm",
//       "isha_adhan": "6:16pm"
//     },
//     "donation_url": "https://www.masjidnow.com/masjids/2904-islamic-center-of-pittsburgh-icp/donations",
//     "push_messages_enabled": false,
//     "monthly_info": "",
//     "url": "/masjids/2904-islamic-center-of-pittsburgh-icp",
//     "cover_photo_url": null
//   }
// }
const run = async () => {
  const response = await util.get(
    "https://www.masjidnow.com/api/v2/salah_timings/daily.json?masjid_id=2904",
  );
  const data = response.data;

  util.setIqamaTimes(ids[0], [
    data.masjid.salah_timing.fajr,
    data.masjid.salah_timing.dhuhr,
    data.masjid.salah_timing.asr,
    data.masjid.salah_timing.maghrib,
    data.masjid.salah_timing.isha,
  ]);
  util.setJumaTimes(ids[0], ["check website"]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/PA/islamic-center-of-pittsburgh-pittsburgh",
  ids,
  run,
};
