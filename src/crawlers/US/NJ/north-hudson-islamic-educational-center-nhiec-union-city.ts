import { createSelectorRun } from "../../../selectors";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "e320b76d-aad7-423f-970c-0c3891fabc37",
    name: "North Hudson Islamic Educational Center(NHIEC)",
    url: "http://www.nhiec.com/",
    timeZoneId: "America/New_York",
    address: "4613 Cottage Pl, Union City, NJ 07087, USA",
    placeId: "ChIJEUaPpRhYwokRIxIJlMYYPPU",
    geo: {
      latitude: 40.7812446,
      longitude: -74.02344819999999,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/NJ/north-hudson-islamic-educational-center-nhiec-union-city",
  ids,
  run: createSelectorRun(ids, {
    iqama: { selector: ".masjidnow-salah-time-iqamah" },
    juma: {
      parser: "matchTimeAmPmG",
      selector: ".masjidnow-extra-info",
    },
  }),
};
