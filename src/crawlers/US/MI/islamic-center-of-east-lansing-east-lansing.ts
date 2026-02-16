import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ATHANPLUS_FALLBACK_URL =
  "https://timing.athanplus.com/masjid/widgets/embed?theme=1&masjid_id=0aAeyzAj";

const normalizeClock = (value: string): string => {
  const extracted = util.extractTimeAmPm(value) || util.extractTime(value);
  return extracted.replace(/\s+/g, " ").trim();
};

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

// alt: ChIJqWjTK9XDIogRfx_4Ob4JHOY
const run = async () => {
  const $ = await util.load(ids[0].url);
  const widgetUrl =
    $("iframe[src*='timing.athanplus.com/masjid/widgets/embed']")
      .first()
      .attr("src") ?? ATHANPLUS_FALLBACK_URL;

  const $$ = await util.load(widgetUrl);
  const iqamaTimes = util
    .mapToText($$, "#table_div_0 table.full-table-sec tr td:nth-child(3) b")
    .map(normalizeClock);
  if (iqamaTimes.length < 5) {
    throw new Error("failed to parse iqamah times");
  }
  util.setIqamaTimes(ids[0], iqamaTimes.slice(0, 5));

  const jumaTimes = util
    .mapToText($$, "#table_div_0 ul.testing-sec > li > b")
    .map(normalizeClock);
  if (jumaTimes.length === 0) {
    throw new Error("failed to parse juma times");
  }
  util.setJumaTimes(ids[0], jumaTimes.slice(0, 3));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MI/islamic-center-of-east-lansing-east-lansing",
  ids,
  run,
};
