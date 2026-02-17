import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "9fdbe98b-27fb-4f42-92d4-2ddb130ea15d",
    name: "Peace River Muslim Association",
    url: "http://www.awqat.net/Masjids/BCPeaceRiver/bcpeaceriver.html",
    timeZoneId: "America/Dawson_Creek",
    address: "9715 102 St, Fort St John, BC V1J 4B1, Canada",
    placeId: "ChIJjYXQNI42klMRTboSgGwNhF4",
    geo: {
      latitude: 56.2441719,
      longitude: -120.8506049,
    },
  },
];
const run = async () => {
  const masjid = ids[0];
  if (!masjid) {
    throw new Error(
      "No masjid record configured for Peace River Muslim Association",
    );
  }

  await util.setAwqatIqamaTimes(masjid, "2a182e04-7959-4b22-b8a1-4b575c8c825c");
  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/peace-river-muslim-association-fort-st-john",
  ids,
  run,
};
