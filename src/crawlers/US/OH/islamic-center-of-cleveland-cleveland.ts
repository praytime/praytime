import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "8dc6bf99-4ddc-4816-bd2c-a6b32619b4e8",
    name: "Islamic Center of Cleveland",
    url: "https://www.iccleveland.org/",
    timeZoneId: "America/New_York",
    address: "6055 W 130th St, Cleveland, OH 44130, USA",
    placeId: "ChIJufqDvxzsMIgR0e4IaTPZRHI",
    geo: {
      latitude: 41.3988454,
      longitude: -81.78069169999999,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/OH/islamic-center-of-cleveland-cleveland",
  ids,
  run: createMasjidalRun(ids, "M0dYGxL6", { jumaCount: 1 }),
};
