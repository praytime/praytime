// @ts-nocheck

import * as https from "node:https";
import axios from "axios";
import * as cheerio from "cheerio";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "f1a68dea-86c9-40e4-a8ab-b25c3364e511",
    name: "Islamic Center of Osceola Masjid Taqwa",
    url: "https://masjidtaqwa.org/",
    timeZoneId: "America/New_York",
    address: "2417 N Central Ave, Kissimmee, FL 34741, USA",
    placeId: "ChIJtdQH_6KG3YgR0zDhii3d9Ro",
    geo: {
      latitude: 28.318015,
      longitude: -81.408603,
    },
  },
];
const run = async () => {
  const response = await axios.get(ids[0].url, {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });
  const $ = cheerio.load(response.data);

  const a = util.mapToText($, ".table-bordered td:last-child");
  const j = a
    .slice(-1)
    .flatMap((t) => t.split("\n"))
    .filter(util.matchTimeAmPm)
    .map(util.extractTimeAmPm);

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/FL/islamic-center-of-osceola-masjid-taqwa-kissimmee",
  ids,
  run,
};
