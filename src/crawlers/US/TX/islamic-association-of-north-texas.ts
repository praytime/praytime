import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ATHANPLUS_FALLBACK_URL =
  "https://timing.athanplus.com/masjid/widgets/embed?theme=1&masjid_id=xdy03lAX";

const normalizeClock = (value: string): string => {
  const extracted = util.extractTimeAmPm(value) || util.extractTime(value);
  return extracted.replace(/\s+/g, " ").trim();
};

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "e4e3fa99-3df8-4e8c-8e37-5d353c2b51eb",
    name: "Islamic Assocation of North Texas",
    url: "https://iant.com/",
    timeZoneId: "America/Chicago",
    address: "840 Abrams Rd, Richardson, TX 75081, USA",
    geo: {
      latitude: 32.939541,
      longitude: -96.730714,
    },
    placeId: "ChIJJ7Bj_J4fTIYRfWVohOA_w60",
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);
  const widgetUrl =
    $("iframe[src*='timing.athanplus.com/masjid/widgets/embed']")
      .first()
      .attr("src") ?? ATHANPLUS_FALLBACK_URL;

  const $$ = await util.load(widgetUrl);
  const iqamaTimes = util
    .mapToText($$, "#table_div_0 table.full-table-sec tr td:nth-child(3) b")
    .map(normalizeClock)
    .filter((time) => time.length > 0);
  if (iqamaTimes.length < 5) {
    throw new Error("failed to parse iqamah times");
  }
  util.setIqamaTimes(ids[0], iqamaTimes.slice(0, 5));

  const jumaTimes = util
    .mapToText($$, "#table_div_0 ul.testing-sec > li > b")
    .map(normalizeClock)
    .filter((time) => time.length > 0);
  if (jumaTimes.length === 0) {
    throw new Error("failed to parse juma times");
  }
  util.setJumaTimes(ids[0], jumaTimes.slice(0, 3));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/islamic-association-of-north-texas",
  ids,
  run,
};
