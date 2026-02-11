// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "fc30b931-b8a3-471b-a84c-4e0cad17654c",
    name: "Islamic Center of Siouxland",
    url: "https://www.icsiouxland.net/",
    timeZoneId: "America/Chicago",
    address: "2701 Willow St, South Sioux City, NE 68776, USA",
    placeId: "ChIJBwBch0QHjocRD9v3WhxBGCE",
    geo: {
      latitude: 42.4640465,
      longitude: -96.42102659999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".prayer-time td:last-child");
  const j = util.mapToText($, ".khutba-salah td:first-child");

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NE/islamic-center-of-siouxland-south-sioux-city",
  ids,
  run,
};
