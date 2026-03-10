import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "31fcb158-9de2-4739-96df-cc4db4688189",
    name: "Masjid Hidayath (Islamic Center of Aurora)",
    url: "http://masjidhidayath.com/",
    timeZoneId: "America/Chicago",
    address: "543 S Lake St, Aurora, IL 60506, USA",
    placeId: "ChIJaahZgKPlDogRueGjTIdJgUA",
    geo: {
      latitude: 41.7517794,
      longitude: -88.3298903,
    },
  },
];
// https://timing.athanplus.com/masjid/widgets/embed?theme=1&masjid_id=pVdwNMAe&allowTransparency='true'
export const crawler: CrawlerModule = {
  name: "US/IL/masjid-hidayath-islamic-center-of-aurora-aurora",
  ids,
  run: createMasjidalRun(ids, "pVdwNMAe", { jumaCount: 2 }),
};
