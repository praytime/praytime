import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "b2bb6aa2-dc2b-433c-a490-6c444a2dc36b",
    name: "Makki Masjid",
    url: "https://makkimasjid.com",
    address: "3418 W Ainslie St, Chicago, IL 60625, USA",
    placeId: "ChIJf2or3ebND4gR6xnJDpsS1QU",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.970328,
      longitude: -87.714355,
    },
  },
  {
    uuid4: "b03ba861-7727-4099-b078-a4e9a089fce5",
    name: "Makki Education Academy",
    url: "https://makkimasjid.com/mea/",
    address: "4926 N Kimball Ave, Chicago, IL 60625, USA",
    placeId: "ChIJKd69y-bND4gRhnBRKC-_1Gw",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.97112,
      longitude: -87.713793,
    },
  },
];

const run = async () => {
  const iqama = await util.loadMasjidalIqama("1VL4WVKx");

  util.setTimes(ids[0], [
    iqama.fajr,
    iqama.zuhr,
    iqama.asr,
    iqama.maghrib,
    iqama.isha,
    iqama.jummah1,
    iqama.jummah2,
    iqama.jummah3,
  ]);

  const second = ids[1];
  if (second) {
    second.juma1 = "check website";
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/makki-masjid-chicago",
  ids,
  run,
};
