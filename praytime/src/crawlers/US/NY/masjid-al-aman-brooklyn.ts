// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "058b4e16-397a-4cd9-a0c6-e6e039684872",
    name: "Masjid Al-Aman",
    url: "http://www.masjidalaman.com/",
    timeZoneId: "America/New_York",
    address: "203 Forbell St, Brooklyn, NY 11208, USA",
    placeId: "ChIJTekAOpVdwokRwp9q-SJz80k",
    geo: {
      latitude: 40.67816639999999,
      longitude: -73.8636736,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".dptTimetable td:last-child");
  a.splice(1, 1); // remove sunrise

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/masjid-al-aman-brooklyn",
  ids,
  run,
};
