import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const MASJIDAL_ID = "0dYBvoK6";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "7b11db40-224a-4762-90ce-1622e8fa7526",
    name: "Masjid Uthman",
    url: "https://www.masjiduthman.org",
    address: "1208 S. Lawler Ave, Lombard, IL 60148, USA",
    timeZoneId: "America/Chicago",
    placeId: "ChIJPypuKmhSDogRB1siIxiVoOQ",
    geo: {
      latitude: 41.8855953,
      longitude: -88.0573481,
    },
  },
];

const run = async () => {
  const iqama = await util.loadMasjidalIqama(MASJIDAL_ID);

  util.setIqamaTimes(ids[0], [
    iqama.fajr,
    iqama.zuhr,
    iqama.asr,
    iqama.maghrib,
    iqama.isha,
  ]);
  util.setJumaTimes(
    ids[0],
    [iqama.jummah1, iqama.jummah2, iqama.jummah3].filter(
      (value): value is string => Boolean(value),
    ),
  );

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/masjid-uthman-lombard",
  ids,
  run,
};
