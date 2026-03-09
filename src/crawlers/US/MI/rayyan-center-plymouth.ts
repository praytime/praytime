import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const MASJIDAL_ID = "b3AOggAe";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "5a1e7a1d-ed50-41dc-ac2d-08b94e32e287",
    name: "Rayyan Center",
    url: "http://www.rayyancenter.org/",
    timeZoneId: "America/Detroit",
    address: "46441 Five Mile Rd, Plymouth, MI 48170, USA",
    placeId: "ChIJYZtjbJusJIgRbM5U867YGkA",
    geo: {
      latitude: 42.3940077,
      longitude: -83.5022957,
    },
  },
];
const run = async () => {
  const [{ data: html }, iqama] = await Promise.all([
    util.get<string>(ids[0].url),
    util.loadMasjidalIqama(MASJIDAL_ID),
  ]);
  const jumaText =
    /"title":"Jummah Prayer Timings","message":"([^"]+)"/i.exec(html)?.[1] ??
    "";
  const jumaTimes = util.matchTimeAmPmG(jumaText) ?? [];
  if (jumaTimes.length === 0) {
    throw new Error("failed to parse juma announcement");
  }

  util.setIqamaTimes(ids[0], [
    iqama.fajr,
    iqama.zuhr,
    iqama.asr,
    iqama.maghrib,
    iqama.isha,
  ]);
  util.setJumaTimes(ids[0], jumaTimes.slice(0, 3));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MI/rayyan-center-plymouth",
  ids,
  run,
};
