import { parsePrayerTable } from "../../../prayertable";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1b00962b-9568-4cee-95e2-ee2056c9ffbe",
    name: "Muslim Community Association",
    url: "https://www.mcabayarea.org/",
    address: "3003 Scott Blvd, Santa Clara, CA 95054, USA",
    placeId: "ChIJY0jYD4jJj4ARPCSyL7wSOCM",
    timeZoneId: "America/Los_Angeles",
    geo: {
      latitude: 37.376718,
      longitude: -121.959827,
    },
  },
  {
    uuid4: "9926fc63-5281-4aa9-9bc1-3aa96cf44ebb",
    name: "Masjid Al-Noor",
    url: "https://www.mcabayarea.org/",
    address: "1755 Catherine St, Santa Clara, CA 95050, USA",
    placeId: "ChIJhY9EUU7Kj4ARX5CNKSkhU4Y",
    timeZoneId: "America/Los_Angeles",
    geo: {
      latitude: 37.35044,
      longitude: -121.955431,
    },
  },
];
const run = async () => {
  const $ = await util.load("https://www.mcabayarea.org/prayer-schedule/");
  const parseJumaTimes = ({ cells }: { cells: ReturnType<typeof $> }) => {
    const time = util.extractTimeAmPm(cells.last().text().trim());
    return time ? [time] : [];
  };

  const mca = parsePrayerTable($, $("#loc_mca table.prayer-timing-table"), {
    errorContext: "#loc_mca table.prayer-timing-table",
    iqamaCellIndex: 2,
    parseJumaTimes,
  });
  util.setIqamaTimes(ids[0], mca.iqamah);
  util.setJumaTimes(ids[0], mca.jummah);

  const second = ids[1];
  if (second) {
    const alNoor = parsePrayerTable(
      $,
      $("#loc_alnoor table.prayer-timing-table"),
      {
        errorContext: "#loc_alnoor table.prayer-timing-table",
        iqamaCellIndex: 2,
        parseJumaTimes,
      },
    );
    util.setIqamaTimes(second, alNoor.iqamah);
    util.setJumaTimes(second, alNoor.jummah);
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CA/mca-bay-area",
  ids,
  run,
};
