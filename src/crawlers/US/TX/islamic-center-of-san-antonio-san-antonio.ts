import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "51bb3385-287e-4f46-82cd-9a059ec4fb9f",
    name: "Islamic Center of San Antonio",
    url: "https://icsaonline.org/",
    timeZoneId: "America/Chicago",
    address: "8638 Fairhaven St, San Antonio, TX 78229, USA",
    placeId: "ChIJc6BFAK9gXIYRKKYSv50VmiU",
    geo: {
      latitude: 29.52070550000001,
      longitude: -98.56413309999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);
  const tableTimes = util
    .mapToText($, "table.prayer td")
    .map(util.extractTimeAmPm)
    .filter((value) => value.length > 0);

  if (tableTimes.length < 10) {
    throw new Error("unexpected prayer table: missing times");
  }

  const iqama = [
    tableTimes[1],
    tableTimes[3],
    tableTimes[5],
    tableTimes[7],
    tableTimes[9],
  ];
  if (iqama.some((value) => !value)) {
    throw new Error("unexpected prayer table: incomplete iqama times");
  }

  const juma = [tableTimes[10], tableTimes[12]].filter(
    (value): value is string => Boolean(value),
  );

  util.setIqamaTimes(ids[0], iqama);
  util.setJumaTimes(ids[0], juma);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/islamic-center-of-san-antonio-san-antonio",
  ids,
  run,
};
