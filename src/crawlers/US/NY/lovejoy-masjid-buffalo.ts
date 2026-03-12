import type { CrawlerModule } from "../../../types";
import { validateCrawlRecord } from "../../../validation";
import { createWnyMuslimsRun } from "../../../wnymuslims";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "bb8768c4-cff0-4dea-b627-976fcd52edb1",
    name: "Lovejoy Masjid",
    url: "http://lovejoymasjid.com/",
    timeZoneId: "America/New_York",
    address: "1107 E Lovejoy St, Buffalo, NY 14206, USA",
    placeId: "ChIJXwXZKuMN04kR7YL_si8OFr8",
    geo: {
      latitude: 42.8895743,
      longitude: -78.8072567,
    },
  },
];
const loadRun = createWnyMuslimsRun(ids, {
  cardTitle: "Lovejoy Masjid",
  addressText: "1107 East Lovejoy Street",
  normalizeIqamaSequence: true,
});

const run = async () => {
  await loadRun();

  const validation = validateCrawlRecord(ids[0]);
  if (validation.errors.length > 0) {
    throw new Error(
      `failed Lovejoy Masjid validation: ${validation.errors.join("; ")}`,
    );
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/lovejoy-masjid-buffalo",
  ids,
  run,
};
