// @ts-nocheck

import tz from "timezone";
import timezoneAmerica from "timezone/America";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const us = tz(timezoneAmerica);

const ids = [
  {
    uuid4: "e4e3fa99-3df8-4e8c-8e37-5d353c2b51eb",
    name: "Islamic Assocation of North Texas",
    url: "https://iant.com/",
    timeZoneId: "America/Chicago",
    address: "840 Abrams Rd, Richardson, TX 75081, USA",
    geo: {
      latitude: 32.939541,
      longitude: -96.730714,
    },
    placeId: "ChIJJ7Bj_J4fTIYRfWVohOA_w60",
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);
  // %u: the weekday, Monday as the first day of the week (1-7)
  const day = us(Date.now(), ids[0].timeZoneId, "%u");

  const a = util.mapToText($, "table.dptTimetable td.jamah");
  util.setIqamaTimes(ids[0], a);

  let j = [];
  // on juma, dhuhr is replaced
  if (day === "5") {
    j = a[1].match(/\d+\s*:\s*\d+/g);
  } else {
    j = a[5].match(/\d+\s*:\s*\d+/g);
  }

  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/islamic-association-of-north-texas",
  ids,
  run,
};
