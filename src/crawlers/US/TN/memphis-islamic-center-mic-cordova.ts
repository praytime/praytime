import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "ee619996-700b-4fd6-909a-b8d8fae3c46f",
    name: "Memphis Islamic Center (MIC)",
    url: "http://www.memphisislamiccenter.org/",
    timeZoneId: "America/Chicago",
    address: "10225 Humphrey Rd, Cordova, TN 38018, USA",
    placeId: "ChIJR3aYUD6ff4gR3KZcVG9oJFo",
    geo: {
      latitude: 35.145349,
      longitude: -89.72174799999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText(
    $,
    "td:last-child",
    $('th:contains("Iqama")').closest("tbody"),
  );

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], ["check website"]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TN/memphis-islamic-center-mic-cordova",
  ids,
  run,
};
