import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "2e57224c-16ae-4b4d-90db-475e20a2e687",
    name: "Masjid At-Taqwa",
    url: "https://www.masjidaltaqwainc.org/salat",
    timeZoneId: "America/New_York",
    address: "1188 Fulton St, Brooklyn, NY 11216, USA",
    placeId: "ChIJLzi5H5pbwokR8XG55bRJdzk",
    geo: {
      latitude: 40.6805556,
      longitude: -73.9536111,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const timesText = util.mapToText($, 'span:contains("FAJR")')[0] ?? "";
  const a = timesText.match(/\d+\s*:\s*\d+\s*\w{2}/g);
  const times = a ?? [];
  times.splice(1, 1); // remove sunrise

  util.setIqamaTimes(ids[0], times);
  util.setJumaTimes(ids[0], ["check website"]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/masjid-at-taqwa",
  ids,
  run,
};
