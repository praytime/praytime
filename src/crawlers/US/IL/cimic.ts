import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "aa3e7e64-947c-4943-b4fc-6e5bf39b50fb",
    name: "Central Illinois Mosque and Islamic Center",
    url: "http://www.cimic.org",
    address: "106 S Lincoln Ave, Urbana, IL 61801, USA",
    placeId: "ChIJZxhDOm3XDIgRwO5K4Cbi840",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 40.111639,
      longitude: -88.218979,
    },
  },
];

const run: CrawlerModule["run"] = async () => {
  const primary = ids[0];
  if (!primary) {
    throw new Error("crawler ids is empty");
  }

  const $ = await util.load(
    "https://us.mohid.co/il/school/cimic/masjid/widget/api/index/?m=prayertimings",
  );

  const iqama = util.mapToText($, "#daily .prayer_iqama_div");
  iqama.splice(0, 1);

  const juma = util
    .mapToText($, "#jummah li")
    .filter((line) => /khateeb/i.test(line))
    .map((line) => util.extractTime(line))
    .filter((line) => line.length > 0);

  util.setIqamaTimes(primary, iqama);
  util.setJumaTimes(primary, juma);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/cimic",
  ids,
  run,
};
