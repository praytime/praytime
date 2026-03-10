import type { Cheerio, CheerioAPI } from "cheerio";
import type { AnyNode } from "domhandler";
import type { CrawlerIds, CrawlerRun } from "./types";
import * as util from "./util";

type PrayerTableContext = {
  $: CheerioAPI;
  cells: Cheerio<AnyNode>;
  iqamaText: string;
  label: string;
};

type PrayerTableOptions = {
  errorContext: string;
  iqamaCellIndex?: number;
  parseJumaTimes: (context: PrayerTableContext) => string[];
};

type PrayerTableRunOptions = PrayerTableOptions & {
  jumaLimit?: number;
  tableSelector: string;
  url?: string;
};

const uniqueTimes = (times: string[]): string[] =>
  Array.from(new Set(times.filter((time) => time.length > 0)));

const toPrayerKey = (text: string): util.StandardPrayerKey | "" =>
  util.getStandardPrayerKey(text);

export const parsePrayerTable = (
  $: CheerioAPI,
  table: Cheerio<AnyNode>,
  options: PrayerTableOptions,
): { iqamah: string[]; jummah: string[] } => {
  if (!table.length) {
    throw new Error(`missing prayer table: ${options.errorContext}`);
  }

  const prayers: Record<util.StandardPrayerKey, string> = {
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
    const iqamaCellIndex = options.iqamaCellIndex;
    const iqamahCell =
      iqamaCellIndex !== undefined && cells.length > iqamaCellIndex
        ? cells.eq(iqamaCellIndex)
        : cells.last();
    const iqamaText = iqamahCell.text().trim();
    const prayerKey = toPrayerKey(label);

    if (prayerKey) {
      prayers[prayerKey] = util.extractTimeAmPm(iqamaText);
      return;
    }

    if (label.includes("jummah")) {
      jummah = uniqueTimes(
        options.parseJumaTimes({
          $,
          cells,
          iqamaText,
          label,
        }),
      );
    }
  });

  if (Object.values(prayers).some((value) => !value)) {
    throw new Error(`incomplete prayer table: ${options.errorContext}`);
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

export const createPrayerTableRun = (
  ids: CrawlerIds,
  options: PrayerTableRunOptions,
): CrawlerRun => {
  return async () => {
    const $ = await util.load(options.url ?? ids[0]?.url ?? "");
    const prayerTable = parsePrayerTable(
      $,
      $(options.tableSelector).first(),
      options,
    );

    util.setIqamaTimes(ids[0], prayerTable.iqamah);
    util.setJumaTimes(
      ids[0],
      prayerTable.jummah.slice(0, options.jumaLimit ?? 3),
    );

    return ids;
  };
};
