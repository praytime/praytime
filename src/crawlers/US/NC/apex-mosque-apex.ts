import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f1cd423f-daef-40c5-b074-18f0613b3801",
    name: "Apex Mosque",
    url: "http://www.apexmosque.org/",
    timeZoneId: "America/New_York",
    address: "733 Center St, Apex, NC 27502, USA",
    placeId: "ChIJuSIwU6aSrIkRpc40xGuB12A",
    geo: {
      latitude: 35.7296577,
      longitude: -78.8410203,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/NC/apex-mosque-apex",
  ids,
  run: async () => {
    const $ = await util.load(ids[0].url ?? "");
    const iqamaTimes = util.mapToText($, ".dptTimetable td.jamah").slice(0, 5);
    const jumaTimes = util
      .mapToText($, ".dptTimetable .dsJumuah")
      .map(util.extractTimeAmPm)
      .filter((value): value is string => Boolean(value));

    if (iqamaTimes.length < 5) {
      throw new Error(
        `failed to parse selector iqama times from ${ids[0].url}`,
      );
    }

    if (util.isJumaToday(ids[0])) {
      iqamaTimes[1] = "Juma";
    }

    util.setIqamaTimes(ids[0], iqamaTimes);
    util.setJumaTimes(ids[0], jumaTimes);

    return ids;
  },
};
