import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "03abe42b-deaa-45e1-bb96-2916836b57aa",
    name: "Selden Masjid - IALI",
    url: "http://seldenmasjid.org/",
    timeZoneId: "America/New_York",
    address: "10 Park Hill Dr, Selden, NY 11784, USA",
    placeId: "ChIJuQrJrg5H6IkRxkrEJCnzsZo",
    geo: {
      latitude: 40.8614376,
      longitude: -73.0571557,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/NY/selden-masjid-iali-selden",
  ids,
  run: createMasjidalRun(ids, "pVdw1xLe", {
    jumaCount: 2,
    jumaMode: "setJumaTimes",
  }),
};
