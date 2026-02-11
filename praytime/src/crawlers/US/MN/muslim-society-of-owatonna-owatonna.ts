// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "969692c6-400b-40eb-857f-4853928376dd",
    name: "Muslim Society of Owatonna",
    url: "http://www.muslimsocietyofowatonna.org/",
    timeZoneId: "America/Chicago",
    address: "509 12th St NE, Owatonna, MN 55060, USA",
    placeId: "ChIJdap0Sfjm9ocRqYj57Ahef8I",
    geo: {
      latitude: 44.0969065,
      longitude: -93.2156565,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/muslim-society-of-owatonna-owatonna",
  ids,
};
