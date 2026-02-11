// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "011860bc-b2ef-49ed-9ab7-2a85e539f79d",
    name: "Masjid Qubaa",
    url: "http://www.qubaamasjid.org/",
    timeZoneId: "America/New_York",
    address: "3043 Curry Ford Rd, Orlando, FL 32806, USA",
    placeId: "ChIJsbZpbDJ754gRi9knkDHdCPE",
    geo: {
      latitude: 28.52499839999999,
      longitude: -81.34530509999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/masjid-qubaa-orlando",
  ids,
};
