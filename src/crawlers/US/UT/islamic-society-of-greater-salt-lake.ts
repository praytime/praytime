import { parse } from "csv-parse/sync";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "9fe30cc6-6683-46c3-808e-71646b1e124d",
    name: "Khadeeja Islamic Center (Islamic Society of Greater Salt Lake)",
    url: "http://utahmuslims.com/",
    timeZoneId: "America/Denver",
    address: "1019 W Parkway Ave, West Valley City, UT 84119, USA",
    placeId: "ChIJv-gQ9zmLUocR-VsHTtn0umU",
    geo: {
      latitude: 40.7169444,
      longitude: -111.9227778,
    },
  },
  {
    uuid4: "4e54bcd0-1bd5-47af-8df4-9d1d8f8c6003",
    name: "Masjid Al-Noor (Islamic Society of Greater Salt Lake)",
    url: "http://www.utahmuslims.com/",
    timeZoneId: "America/Denver",
    address: "740 S 700 E, Salt Lake City, UT 84102, USA",
    placeId: "ChIJrR-7dUP1UocRTHm55kiQTjU",
    geo: {
      latitude: 40.75311360000001,
      longitude: -111.8713079,
    },
  },
];

const run = async () => {
  const csvResponse = await util.get(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTFca2lbPuRp4XteUyuiMlBUupPh5AL5O5raB2s_QNbq4QN4qX0RHfhPOh21IVMXryJtX67k55djrNe/pub?gid=0&single=true&output=csv",
  );
  const rows = parse(csvResponse.data, {
    relaxColumnCount: true,
    skipEmptyLines: false,
  }) as unknown as string[][];
  const header = rows[0];
  if (!header) {
    throw new Error("missing sheet header");
  }

  const khadeejaIndex = header.findIndex((value) => /khadeeja/i.test(value));
  const noorIndex = header.findIndex((value) => /al-noor/i.test(value));
  if (khadeejaIndex < 0 || noorIndex < 0) {
    throw new Error("missing masjid columns in sheet");
  }

  const getColumnValue = (label: RegExp, columnIndex: number): string => {
    const row = rows.find((candidate) => {
      const firstCell = candidate[0];
      return typeof firstCell === "string" && label.test(firstCell.trim());
    });
    const value = row?.[columnIndex]?.trim();
    if (!value) {
      throw new Error(`missing ${label.source} value in sheet`);
    }
    return value;
  };

  const getJumaTimes = (columnIndex: number): string[] => {
    const jumaText = getColumnValue(/Juma'h/i, columnIndex);
    const jumaTimes = util.matchTimeG(jumaText) ?? [];
    if (jumaTimes.length > 0) {
      return jumaTimes;
    }
    throw new Error("missing juma times in sheet");
  };

  const timesByColumn = (columnIndex: number): string[] => [
    getColumnValue(/^Fajr$/i, columnIndex),
    getColumnValue(/^Zuhr$/i, columnIndex),
    getColumnValue(/^Asar$/i, columnIndex),
    getColumnValue(/^Maghrib$/i, columnIndex),
    getColumnValue(/^Isha$/i, columnIndex),
  ];

  const first = ids[0];
  if (first) {
    util.setIqamaTimes(first, timesByColumn(khadeejaIndex));
    util.setJumaTimes(first, getJumaTimes(khadeejaIndex));
  }

  const second = ids[1];
  if (second) {
    util.setIqamaTimes(second, timesByColumn(noorIndex));
    util.setJumaTimes(second, getJumaTimes(noorIndex));
  }

  if (!first || !second) {
    throw new Error("missing crawler ids");
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/UT/islamic-society-of-greater-salt-lake",
  ids,
  run,
};
