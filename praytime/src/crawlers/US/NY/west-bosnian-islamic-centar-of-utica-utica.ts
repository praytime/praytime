// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "0acb70ce-382b-404e-b32a-cd766f7a430f",
    name: "West Bosnian Islamic Centar of Utica",
    url: "https://www.facebook.com/dzematwbicofuticany/",
    timeZoneId: "America/New_York",
    address: "763 Bleecker St, Utica, NY 13501, USA",
    placeId: "ChIJH0iq0fhH2YkRIesgyoVEzLg",
    geo: {
      latitude: 43.0976979,
      longitude: -75.2152473,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/west-bosnian-islamic-centar-of-utica-utica",
  ids,
};
