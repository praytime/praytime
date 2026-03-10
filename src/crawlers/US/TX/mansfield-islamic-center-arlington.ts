import { createSelectorRun } from "../../../selectors";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "5b0ac5ac-cc16-48ef-94cf-5bb695d2a062",
    name: "Mansfield Islamic Center",
    url: "https://mansfieldmasjid.org/",
    timeZoneId: "America/Chicago",
    address: "6401 New York Ave # 135, Arlington, TX 76018, USA",
    geo: {
      latitude: 32.642461,
      longitude: -97.074488,
    },
    placeId: "ChIJeTgrLsaJToYRtcOVJIVkLBw",
  },
];
export const crawler: CrawlerModule = {
  name: "US/TX/mansfield-islamic-center-arlington",
  ids,
  run: createSelectorRun(ids, {
    iqama: {
      emptyValue: "-",
      parser: "extractTimeAmPm",
      selector: '.elementor-shortcode:contains("Iqama: ")',
    },
    juma: {
      filterPattern: /\d{1,2}\s*:\s*\d{1,2}/,
      parser: "extractTime",
      selector: '.elementor-widget-container > p:contains("Azan: ")',
    },
  }),
};
