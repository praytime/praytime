import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "33a6100c-a7e2-42c3-9c5c-fbccd8f9e30a",
    name: "Fleetwood Islamic Center",
    url: "https://www.facebook.com/pages/Fleetwood-Islamic-Centre/374700776014820",
    timeZoneId: "America/Vancouver",
    address: "8462 162 St unit #209-210, Surrey, BC V4N 1B3, Canada",
    placeId: "ChIJl3njCLrQhVQRnbiwaIEVcOw",
    geo: {
      latitude: 49.15658359999999,
      longitude: -122.7718178,
    },
  },
];
const run = async () => {
  const masjid = ids[0];
  if (!masjid) {
    throw new Error("No masjid record configured for Fleetwood Islamic Center");
  }

  await util.setAwqatIqamaTimes(masjid, "3fc905d5-5fc3-4d74-975c-f167c425e315");
  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/fleetwood-islamic-center-surrey",
  ids,
  run,
};
