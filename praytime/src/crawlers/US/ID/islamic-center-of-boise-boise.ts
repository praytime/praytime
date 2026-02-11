// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "ef540806-85f9-4e23-a6b8-737818c75af5",
    name: "Islamic Center of Boise",
    url: "http://www.boisemuslims.org/",
    timeZoneId: "America/Boise",
    address: "3077 Christine St, Boise, ID 83704, USA",
    placeId: "ChIJYVzNm8_4rlQRVowhPcW8MKM",
    geo: {
      latitude: 43.6327429,
      longitude: -116.2874314,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/ID/islamic-center-of-boise-boise",
  ids,
};
