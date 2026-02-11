// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "36965964-475c-4d5a-bd4d-2a76c57943ff",
    name: "Islamic Society of Greater Oklahoma City",
    url: "http://www.isgoc.com/",
    timeZoneId: "America/Chicago",
    address: "3815 St Clair Ave, Oklahoma City, OK 73112, USA",
    placeId: "ChIJc5MXSWgQsocRapsVj0EKdmM",
    geo: {
      latitude: 35.5098237,
      longitude: -97.5817479,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const [a] = util
    .mapToText($, '.featured-section-header:contains("Iqama") + div')
    .map((t) =>
      t
        .split("\n")
        .slice(1) // remove 'Ramadan Iqama:'
        .map((s) =>
          s
            .split(":") // remove 'Fajr:' etc
            .slice(1)
            .join(":")
            .trim(),
        ),
    );
  const [j] = util
    .mapToText($, '.featured-section-header:contains("Friday Khutbah") + div')
    .map(util.matchTimeAmPmG);

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/OK/islamic-society-of-greater-oklahoma-city-oklahoma-city",
  ids,
  run,
};
