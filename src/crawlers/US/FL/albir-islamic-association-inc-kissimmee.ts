import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "403af7a7-b7ae-4d9b-b29a-8d2e902ad439",
    name: "Albir Islamic Association Inc",
    url: "http://www.albircenter.org/",
    timeZoneId: "America/New_York",
    address: "4870 Old Tampa Hwy, Kissimmee, FL 34758, USA",
    placeId: "ChIJebXjXPuC3YgRuDiCo-Ecoak",
    geo: {
      latitude: 28.2577859,
      longitude: -81.47803239999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = ["Fajr", "Dzuhr", "Asr", "Maghreb", "Isha", "Jumaa"]
    .map((s) => util.toText($, `span:not(:has(*)):contains("${s}")`))
    .map(util.extractTimeAmPm);

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/FL/albir-islamic-association-inc-kissimmee",
  ids,
  run,
};
