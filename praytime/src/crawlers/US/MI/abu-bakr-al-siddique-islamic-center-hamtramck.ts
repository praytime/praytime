// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "6e93bf80-145a-4daf-a8f5-bbee7112a85d",
    name: "Abu-Bakr Al-Siddique Islamic Center",
    url: "http://www.alsideeq.org/",
    timeZoneId: "America/Detroit",
    address: "8904 St Aubin St, Hamtramck, MI 48212, USA",
    placeId: "ChIJewdUS2bSJIgRGO50fJTELEI",
    geo: {
      latitude: 42.3887259,
      longitude: -83.0603994,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/abu-bakr-al-siddique-islamic-center-hamtramck",
  ids,
};
