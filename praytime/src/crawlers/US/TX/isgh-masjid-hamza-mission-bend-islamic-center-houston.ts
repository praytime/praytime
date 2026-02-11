// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "4c1c8d32-3dfb-459d-a062-3538af88e5f8",
    name: "ISGH Masjid Hamza - Mission Bend Islamic Center",
    url: "http://www.isghmasjidhamza.org/",
    timeZoneId: "America/Chicago",
    address: "6233 Tres Lagunas Dr, Houston, TX 77083, USA",
    placeId: "ChIJ-TJp29PdQIYRNdzKNKoBtrE",
    geo: {
      latitude: 29.71004109999999,
      longitude: -95.6380552,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, "td .dpt_jamah");
  const j = util
    .mapToText($, '#dsPrayerTimetable td:contains("Khutba")')
    // lookbehind assertion - only match time if preceded by 'Khutba'
    .map((t) => t.match(/(?<=Khutba )(\d{1,2}\s*:\s*\d{1,2})/gi))
    .shift();

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/isgh-masjid-hamza-mission-bend-islamic-center-houston",
  ids,
  run,
};
