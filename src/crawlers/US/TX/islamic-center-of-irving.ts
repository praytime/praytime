import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "6948d2fc-99ae-4bfa-a459-a2db0dd43802",
    name: "Islamic Center of Irving",
    url: "https://irvingmasjid.org/",
    timeZoneId: "America/Chicago",
    address: "2555 Esters Rd, Irving, TX 75062, USA",
    geo: {
      latitude: 32.843397,
      longitude: -97.010652,
    },
    placeId: "ChIJfegQy4aBToYRcINprM4zk7M",
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);
  const iqamaTimes = util
    .mapToText($, ".dpt_jamah")
    .map((value) => util.extractTimeAmPm(value))
    .filter((value) => value.length > 0);
  if (iqamaTimes.length < 5) {
    throw new Error("failed to parse Islamic Center of Irving iqama times");
  }

  const jumaTimes = $("li")
    .toArray()
    .flatMap((item) => {
      const text = util.normalizeSpace($(item).text());
      if (!/jumu/i.test(text)) {
        return [];
      }

      const times = util.matchTimeAmPmG(text) ?? [];
      return times[0] ? [times[0]] : [];
    });
  if (jumaTimes.length > 0) {
    util.setJumaTimes(ids[0], jumaTimes);
  }
  util.setIqamaTimes(ids[0], iqamaTimes);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/islamic-center-of-irving",
  ids,
  run,
};
