// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "7bc0c531-73b4-49ae-a25b-d7525f3a6104",
    name: "Fox Valley Muslim Community Center",
    url: "http://www.auroramasjid.org/",
    address: "1187 Timberlake Dr, Aurora, IL 60506, USA",
    placeId: "ChIJpyouLQXlDogRbZ1oyLj1418",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.780753,
      longitude: -88.353097,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const [t] = util.mapToText($, 'span:contains("Fajr")');
  // EX:
  // Fajr:         6:00
  // Duhr:       1:30
  // Asr:          5:15
  // Maghrib: Sunset
  // Isha:         8:30
  // Jumah:    1:15

  ids[0].fajrIqama = t.match(/Fajr\s*:\s*(\S+)/)[1];
  ids[0].zuhrIqama = t.match(/Duhr\s*:\s*(\S+)/)[1];
  ids[0].asrIqama = t.match(/Asr\s*:\s*(\S+)/)[1];
  ids[0].maghribIqama = t.match(/Maghrib\s*:\s*(\S+)/)[1];
  ids[0].ishaIqama = t.match(/Isha\s*:\s*(\S+)/)[1];
  ids[0].juma1 = t.match(/Jumah\s*:\s*(\S+)/)[1];

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/fox-valley-muslim-community-center",
  ids,
  run,
};
