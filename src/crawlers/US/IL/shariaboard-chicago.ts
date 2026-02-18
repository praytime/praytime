import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "9fcf6eb9-9795-4ea9-b2bc-cf74b68e2994",
    name: "Rahmat-e-Alam Foundation - Western Building",
    url: "https://www.shariahboard.org/",
    address: "7045 N Western Ave, Chicago, IL 60645, USA",
    placeId: "ChIJT7yggtHRD4gRlUbrWuBRJYw",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 42.009954,
      longitude: -87.689971,
    },
  },
  {
    uuid4: "eff0d63a-3b35-4c54-bfa7-9b5b6d8a76d7",
    name: "Rahmat-e-Alam Foundation - California Building",
    url: "https://www.shariahboard.org/",
    address: "6201 N California Ave, Chicago, IL 60659, USA",
    placeId: "ChIJdQdsux_OD4gRkH5DT01BEpI",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.994201,
      longitude: -87.699305,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);
  const tables = $(".prayer-timings table.timings-table");

  const parseTable = (
    tableIndex: number,
  ): { iqamah: string[]; jummah: string[] } => {
    const table = tables.eq(tableIndex);
    if (!table.length) {
      throw new Error(`missing prayer table ${tableIndex}`);
    }

    const prayers = {
      asr: "",
      fajr: "",
      isha: "",
      maghrib: "",
      zuhr: "",
    };
    let jummah: string[] = [];

    table.find("tr").each((_, row) => {
      const cells = $(row).find("td");
      if (cells.length < 2) {
        return;
      }

      const label = cells.first().text().trim().toLowerCase();
      const iqamahCell = cells.length >= 3 ? cells.eq(2) : cells.last();
      const iqamahText = iqamahCell.text().trim();
      const iqamah = util.extractTimeAmPm(iqamahText);

      if (label.includes("fajr")) {
        prayers.fajr = iqamah;
      } else if (label.includes("zuhr") || label.includes("dhuhr")) {
        prayers.zuhr = iqamah;
      } else if (label.includes("asr")) {
        prayers.asr = iqamah;
      } else if (label.includes("maghrib")) {
        prayers.maghrib = iqamah;
      } else if (label.includes("isha")) {
        prayers.isha = iqamah;
      } else if (label.includes("jummah")) {
        jummah = util.matchTimeAmPmG(iqamahText) ?? [];
      }
    });

    if (
      !prayers.fajr ||
      !prayers.zuhr ||
      !prayers.asr ||
      !prayers.maghrib ||
      !prayers.isha
    ) {
      throw new Error(`incomplete prayer table ${tableIndex}`);
    }

    return {
      iqamah: [
        prayers.fajr,
        prayers.zuhr,
        prayers.asr,
        prayers.maghrib,
        prayers.isha,
      ],
      jummah,
    };
  };

  const west = parseTable(0);
  util.setIqamaTimes(ids[0], west.iqamah);
  util.setJumaTimes(ids[0], west.jummah);

  const california = parseTable(1);
  util.setIqamaTimes(ids[1], california.iqamah);
  util.setJumaTimes(ids[1], california.jummah);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/shariaboard-chicago",
  ids,
  run,
};
