import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "fad49146-9293-498e-861e-aeca0b836abd",
    name: "Islamic Center of East Lansing",
    url: "https://www.lansingislam.com/",
    timeZoneId: "America/Detroit",
    address: "920 S Harrison Rd, East Lansing, MI 48823, USA",
    placeId: "ChIJnXBspnHCIogR1lRplpAjMPk",
    geo: {
      latitude: 42.72396489999999,
      longitude: -84.49419259999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/islamic-center-of-east-lansing-east-lansing",
  ids,
  run: createMasjidalRun(ids, "0aAeyzAj", { jumaMode: "setJumaTimes" }),
};
