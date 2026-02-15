import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "317e36bd-713b-4fd6-ad06-be2f5d8e6246",
    name: "ISGH River Oaks Islamic Center (ROIC)",
    url: "https://roicmasjid.org/",
    timeZoneId: "America/Chicago",
    address: "3110 Eastside St, Houston, TX 77098, USA",
    placeId: "ChIJjUn8THfAQIYRhtt6kAu1PpA",
    geo: {
      latitude: 29.7369222,
      longitude: -95.4249639,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/TX/isgh-river-oaks-islamic-center-roic-houston",
  ids,
};
