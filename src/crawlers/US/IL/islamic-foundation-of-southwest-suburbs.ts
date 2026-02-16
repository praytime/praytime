import * as cheerio from "cheerio";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

// Sample return
// {
//     "status": "success",
//     "data": {
//         "date": "2018-07-18",
//         "hijri": "4-Dhul-Qadah-1439",
//         "salah": {
//             "fajr": "3:32 AM",
//             "sunrise": "5:34 AM",
//             "zuhr": "12:59 PM",
//             "asr": "6:09 PM",
//             "maghrib": "8:23 PM",
//             "sunset": "8:23 PM",
//             "isha": "10:01 PM"
//         },
//         "iqama": {
//             "fajr": "5:00 AM",
//             "zuhr": "1:30 PM",
//             "asr": "6:45 PM",
//             "maghrib": "8:26 PM",
//             "isha": "10:10 PM",
//             "jummah1": "1:30 PM",
//             "jummah2": "-"
//         }
//     },
//     "message": null
// }

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "7d5464b4-d759-4306-a865-f7dbe6744146",
    name: "Islamic Foundation of Southwest Suburbs",
    url: "http://ifsws.org/",
    address: "23616 W Main St, Plainfield, IL 60544, USA",
    timeZoneId: "America/Chicago",
    placeId: "ChIJu65wgiz1DogR8FD5FLA1Wj4",
    geo: {
      latitude: 41.618266,
      longitude: -88.193512,
    },
  },
];
const run = async () => {
  let response = await util.get(
    "https://masjidal.com/api/v1/time?masjid_id=3wdqjKbN",
  );
  const data = response.data;
  if (data.status === "success") {
    util.setIqamaTimes(ids[0], [
      data.data.iqama.fajr,
      data.data.iqama.zuhr,
      data.data.iqama.asr,
      data.data.iqama.maghrib,
      data.data.iqama.isha,
    ]);
  }

  // Juma time not in API, comes from template
  response = await util.get("http://masjidal.com/ifsws/");
  const $ = cheerio.load(response.data);
  ids[0].juma1 = $("#jummah1 > td.salah").text().trim();

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/islamic-foundation-of-southwest-suburbs",
  ids,
  run,
};
