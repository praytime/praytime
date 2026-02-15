import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "12bb8655-933d-49b5-a160-521bccb2c2e8",
    name: "Abbotsford Islamic Center",
    url: "http://abbotsford.thebcma.com/",
    timeZoneId: "America/Vancouver",
    address: "1980 Salton Rd, Abbotsford, BC V2S 3W7, Canada",
    placeId: "ChIJ6Ul5jZdKhFQRUMmkV5eHIZQ",
    geo: {
      latitude: 49.0383665,
      longitude: -122.2874597,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const t = $('th:contains("IQAMA")').closest("table");

  $('tr:contains("Sunrise")', t).remove();

  const a = util.mapToText($, "td:last-child", t);
  if ((a[3] ?? "").length === 0) {
    a[3] = "-";
  }
  const j = util.mapToText($, "td:nth-child(2)", t).slice(5);

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/abbotsford-islamic-center-abbotsford",
  ids,
  run,
};
