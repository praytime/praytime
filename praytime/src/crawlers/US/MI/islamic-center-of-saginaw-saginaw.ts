// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "8893d657-1a92-457b-8d9b-b670fb043419",
    name: "Islamic Center of Saginaw - Township",
    url: "https://www.icsaginaw.org/",
    timeZoneId: "America/Detroit",
    address: "4330 N Center Rd, Saginaw, MI 48604, USA",
    placeId: "ChIJy18B51nDI4gRB6EqDvUW9cU",
    geo: {
      latitude: 43.4704499,
      longitude: -84.01309189999999,
    },
  },
  {
    uuid4: "2f29f33b-257a-4c2d-879e-0331df6d2073",
    name: "Islamic Center of Saginaw - Downtown",
    url: "http://www.icsaginaw.org/",
    timeZoneId: "America/Detroit",
    address: "114 N 4th Ave, Saginaw, MI 48607, USA",
    placeId: "ChIJ8QDKlNbpI4gRjDI5EWAgmqo",
    geo: {
      latitude: 43.4324246,
      longitude: -83.9287435,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, 'h2:contains("Iqama") ~ h3');
  util.setIqamaTimesAll(ids, a);

  util.setJumaTimes(
    ids[0],
    util
      .mapToText($, 'h2:contains("Township") ~ h3:contains("Khutba")')
      .map(util.extractTimeAmPm),
  );
  util.setJumaTimes(
    ids[1],
    util
      .mapToText($, 'h2:contains("Downtown") ~ h3:contains("Khutba")')
      .map(util.extractTimeAmPm),
  );

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MI/islamic-center-of-saginaw-saginaw",
  ids,
  run,
};
