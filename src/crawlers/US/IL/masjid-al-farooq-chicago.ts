import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3d831335-0908-48b8-a30e-1f21d5d3e899",
    name: "Masjid Al Farooq",
    url: "https://www.mafchicago.com/",
    timeZoneId: "America/Chicago",
    address: "8950 S Stony Island Ave, Chicago, IL 60617, USA",
    placeId: "ChIJHXOKFykmDogRwk7cbmZqngM",
    geo: {
      latitude: 41.7316667,
      longitude: -87.58583329999999,
    },
  },
];

const run: CrawlerModule["run"] = async () => {
  const primary = ids[0];
  if (!primary) {
    throw new Error("crawler ids is empty");
  }

  const $ = await util.load(primary.url ?? "");

  const iqama = util.mapToText($, ".mpt_daily td:last-child");
  const juma = util.mapToText($, ".mpt_jumua .mpt_time").slice(0, 1);

  util.setIqamaTimes(primary, iqama);
  util.setJumaTimes(primary, juma);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/masjid-al-farooq-chicago",
  ids,
  run,
};
