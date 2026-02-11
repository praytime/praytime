// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "d0ff7397-b3a3-44a0-9936-2699007d85f1",
    name: "Annoor Islamic Center",
    url: "https://www.an-noorislamiccenter.com",
    timeZoneId: "America/Los_Angeles",
    address: "12419 NE Glisan St, Portland, OR 97230, USA",
    placeId: "ChIJLfPQCxuhlVQRFk8LFI2dl8E",
    geo: {
      latitude: 45.5273495,
      longitude: -122.5354265,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/OR/annoor-islamic-center-portland",
  ids,
};
