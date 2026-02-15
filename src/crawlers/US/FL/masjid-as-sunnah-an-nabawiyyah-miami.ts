import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "0fa82644-76a0-4855-be3f-657a3b8532d2",
    name: "Masjid As-Sunnah An-Nabawiyyah",
    url: "https://www.facebook.com/pages/category/Interest/Masjid-As-Sunnah-An-Nabawiyyah-North-Miami-%D9%85%D8%B3%D8%AC%D8%AF-%D8%A7%D9%84%D8%B3%D9%86%D8%A9-%D8%A7%D9%84%D9%86%D8%A8%D9%88%D9%8A%D8%A9-%D9%85%D9%8A%D8%A7%D9%85%D9%8A-934978139970357/",
    timeZoneId: "America/New_York",
    address: "560 NW 165th St, Miami, FL 33169, USA",
    placeId: "ChIJgyLvsWqu2YgRLoXDgzkIqAQ",
    geo: {
      latitude: 25.9233792,
      longitude: -80.20927449999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/masjid-as-sunnah-an-nabawiyyah-miami",
  ids,
};
