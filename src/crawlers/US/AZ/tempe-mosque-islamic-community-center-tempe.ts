import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "fd321b99-7fc2-47ef-b040-d8d273351c04",
    name: "Tempe Mosque (Islamic Community Center)",
    url: "http://www.tempemosque.com/",
    timeZoneId: "America/Phoenix",
    address: "131 E 6th St, Tempe, AZ 85281, USA",
    placeId: "ChIJ7fmN_dgIK4cRNAm4iKGKt5A",
    geo: {
      latitude: 33.4240604,
      longitude: -111.9369396,
    },
  },
];
const run = async () => {
  const masjid = ids[0];
  if (!masjid) {
    throw new Error(
      "No masjid record configured for US/AZ/tempe-mosque-islamic-community-center-tempe",
    );
  }

  const $ = await util.load(masjid.url);
  const iqamaTimes = util.mapToText($, ".table_new.count_1 td.iqama-time");
  const jumaTimes = util.mapToText(
    $,
    ".table_new.count_1 .layout_jumah_inner h1",
  );

  if (iqamaTimes.length < 5) {
    throw new Error(
      "missing prayer iqama cells in .table_new.count_1 td.iqama-time",
    );
  }

  util.setIqamaTimes(masjid, iqamaTimes);
  util.setJumaTimes(masjid, jumaTimes);
  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/AZ/tempe-mosque-islamic-community-center-tempe",
  ids,
  run,
};
