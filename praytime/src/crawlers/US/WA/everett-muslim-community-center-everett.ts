// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "efb65c0e-52e0-49eb-b9d7-1e70a4fc26c9",
    name: "Everett Muslim Community Center",
    url: "http://everettmasjid.org/",
    timeZoneId: "America/Los_Angeles",
    address: "500 SE Everett Mall Way B110, Everett, WA 98208, USA",
    placeId: "ChIJRee1XtIGkFQRy94tokxYxeM",
    geo: {
      latitude: 47.908234,
      longitude: -122.2259754,
    },
  },
];
const run = async () => {
  const $ = await util.load("http://www.everettmasjid.org/prayer");

  const a = util.mapToText($, "td:last-child");

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/WA/everett-muslim-community-center-everett",
  ids,
  run,
};
