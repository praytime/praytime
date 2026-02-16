import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f2127c83-683f-4f54-a0da-367c42ce7740",
    name: "Islamic Center of Grand Blanc",
    url: "https://www.gbic.us/",
    timeZoneId: "America/Detroit",
    address: "1479 E Baldwin Rd, Grand Blanc, MI 48439, USA",
    placeId: "ChIJT3Y3pn58I4gRriDSkfUQNp4",
    geo: {
      latitude: 42.887021,
      longitude: -83.67240509999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(
    "https://us.mohid.co/mi/detroit/gbic/masjid/widget/api/index/?m=prayertimings",
  );

  const iqamaTimes = util
    .mapToText($, "#daily .prayer_iqama_div")
    .map((value) => value.trim())
    .slice(1, 6);
  if (iqamaTimes.length !== 5 || iqamaTimes.some((value) => !value)) {
    throw new Error("failed to parse mohid iqama timings");
  }
  util.setIqamaTimes(ids[0], iqamaTimes);

  const jumaTimes = util
    .mapToText($, "#jummah .prayer_iqama_div")
    .map(util.extractTimeAmPm)
    .filter(Boolean);
  if (jumaTimes.length > 0) {
    util.setJumaTimes(ids[0], jumaTimes);
  } else {
    util.setJumaTimes(ids[0], ["check website"]);
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MI/islamic-center-of-grand-blanc-grand-blanc",
  ids,
  run,
};
