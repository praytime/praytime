import { createMawaqitMobileRun } from "../../../mawaqit";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "506ce41a-e1cf-4a96-9aa6-c880e520359d",
    name: "Masjid Al Raheem",
    url: "http://iscf.org/masjid/masjid-al-alrahim/",
    timeZoneId: "America/New_York",
    address: "4962 Old Winter Garden Rd, Orlando, FL 32811, USA",
    placeId: "ChIJLUbaknV554gRT415vYgBO4o",
    geo: {
      latitude: 28.5423395,
      longitude: -81.4460082,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/masjid-al-raheem-orlando",
  ids,
  run: createMawaqitMobileRun(ids, "arraheem-orlando-florida"),
};
