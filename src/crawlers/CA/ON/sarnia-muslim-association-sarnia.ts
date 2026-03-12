import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "95dc0e87-c5d0-4184-9cdd-bf46d7178cad",
    name: "Sarnia Muslim Association",
    url: "http://sarniamuslim.com/",
    timeZoneId: "America/Toronto",
    address: "1609 London Line, Sarnia, ON N7W 1A9, Canada",
    placeId: "ChIJh0ojepCDJYgRsTMgfVncHE4",
    geo: {
      latitude: 42.9831935,
      longitude: -82.33556689999999,
    },
  },
];
const run = async () => {
  const id = ids[0];
  if (!id) {
    throw new Error("Missing crawler metadata");
  }
  const prayerTimes = await util.loadAddinIqama("725", id.timeZoneId);

  util.setIqamaTimes(id, [
    prayerTimes.fajr,
    prayerTimes.zuhr,
    prayerTimes.asr,
    prayerTimes.maghrib,
    prayerTimes.isha,
  ]);
  util.setJumaTimes(id, prayerTimes.jumah);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/ON/sarnia-muslim-association-sarnia",
  ids,
  run,
};
