import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "ba6cf0e1-3e4f-402f-968e-d3b6e6945430",
    name: "Al Falāh Institute",
    url: "http://alfalahinstitute.org/index.html",
    timeZoneId: "America/Detroit",
    address: "38325 W 14 Mile Rd, Farmington Hills, MI 48331, USA",
    placeId: "ChIJUR4saVGlJIgReZXB5OAFHx4",
    geo: {
      latitude: 42.5256307,
      longitude: -83.4279052,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/al-falah-institute-farmington-hills",
  ids,
};
