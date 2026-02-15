import axios from "axios";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "e15b52ff-5df0-48f0-938c-65066c8d9b00",
    name: "Masjid Al-Islam",
    url: "http://masjidalislam.org",
    timeZoneId: "America/Chicago",
    address: "2604 S Harwood St, Dallas, TX 75215, USA",
    geo: {
      latitude: 32.767267,
      longitude: -96.779057,
    },
    placeId: "ChIJy0rX1_CYToYRpBUJvsi-7fI",
  },
];

// Example response:
// {
//   "title": "Dallas, TX, USA",
//   "query": "Dallas, TX",
//   "for": "daily",
//   "method": 4,
//   "prayer_method_name": "Islamic Circle of North America",
//   "daylight": "1",
//   "timezone": "-6",
//   "map_image": "https://maps.google.com/maps/api/staticmap?center=32.780140,-96.800451&sensor=false&zoom=13&size=300x300",
//   "sealevel": "137",
//   "today_weather": {
//     "pressure": null,
//     "temperature": "34.4"
//   },
//   "link": "http://muslimsalat.com/Dallas%2C+TX",
//   "qibla_direction": "43.55",
//   "latitude": "32.780140",
//   "longitude": "-96.800451",
//   "address": "Dallas, TX, USA",
//   "city": "Dallas",
//   "state": "Texas",
//   "postal_code": "",
//   "country": "United States",
//   "country_code": "US",
//   "items": [
//     {
//       "date_for": "2019-7-16",
//       "fajr": "5:10 am",
//       "shurooq": "6:24 am",
//       "dhuhr": "1:33 pm",
//       "asr": "5:15 pm",
//       "maghrib": "8:41 pm",
//       "isha": "9:55 pm"
//     }
//   ],
//   "status_valid": 1,
//   "status_code": 1,
//   "status_description": "Success."
// }
const run = async () => {
  const response = await axios.get(
    "https://muslimsalat.com/Dallas%2C+TX/daily.json?key=1b2297a8451063cfc67ad03aade14c4b",
  );

  ids[0].fajrIqama = response.data.items[0].fajr;
  ids[0].zuhrIqama = response.data.items[0].dhuhr;
  ids[0].asrIqama = response.data.items[0].asr;
  ids[0].maghribIqama = response.data.items[0].maghrib;
  ids[0].ishaIqama = response.data.items[0].isha;
  ids[0].juma1 = "check website";

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/masjid-al-islam-dallas",
  ids,
  run,
};
