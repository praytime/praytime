import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "b1aeb1aa-ec91-4ba0-9c90-c445a48ef089",
    name: "Masjid as-Sunnah an-Nabawiyyah مسجد السنة",
    url: "http://germantownmasjid.com/",
    timeZoneId: "America/New_York",
    address: "4944 Germantown Ave, Philadelphia, PA 19144, USA",
    placeId: "ChIJU0IceCW4xokRyxqc5iq6yA8",
    geo: {
      latitude: 40.02892629999999,
      longitude: -75.1634262,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/PA/masjid-as-sunnah-an-nabawiyyah-msjd-lsn-philadelphia",
  ids,
};
