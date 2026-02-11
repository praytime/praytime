// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "63bce80c-2f58-43f5-9e7b-952ec9b1abf0",
    name: "Masjid Al-Quba",
    url: "https://masjidqubawa.org/",
    timeZoneId: "America/Los_Angeles",
    address: "12608 SE 240th St, Kent, WA 98031, USA",
    placeId: "ChIJh96iy1ZfkFQRwwkOnSw-CCc",
    geo: {
      latitude: 47.3872766,
      longitude: -122.1729033,
    },
  },
];
const run = async () => {
  const $ = await util.load("https://themasjidapp.net/41/prayers");

  $('tr:contains("Sunrise")').remove();

  const a = util.mapToText($, "tbody td:last-child").map(util.extractTimeAmPm);

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/WA/masjid-al-quba-kent",
  ids,
  run,
};
