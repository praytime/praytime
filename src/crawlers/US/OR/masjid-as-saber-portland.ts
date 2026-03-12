import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const MUSLIM_PLUS_CALENDAR_URL =
  "https://muslimplus.org/masjids/calendar?token=b6d4da395dfd59836f190119641afbd8";

type BrowserTable = {
  headers: string[];
  rows: string[][];
};

type BrowserCellNode = {
  textContent: string | null;
};

type BrowserRowNode = {
  querySelectorAll: (selector: string) => ArrayLike<BrowserCellNode>;
};

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "94265ac9-b99c-475f-a385-c8a3e1b6905e",
    name: "Masjid As-Saber",
    url: "https://assaber.org/",
    timeZoneId: "America/Los_Angeles",
    address: "10323 SW 43rd Ave, Portland, OR 97219, USA",
    placeId: "ChIJGx6EHGALlVQRCfVJpo8LraM",
    geo: {
      latitude: 45.4516421,
      longitude: -122.7220092,
    },
  },
];

const getCurrentCalendarLabel = (timeZoneId: string): string =>
  `${util.strftime("%A", { timeZoneId })}, ${util.strftime("%b", {
    timeZoneId,
  })} ${Number(util.strftime("%d", { timeZoneId }))}`;

const getHeaderIndex = (headers: string[], header: string): number => {
  const index = headers.indexOf(header);
  if (index === -1) {
    throw new Error(`missing Masjid As-Saber calendar column: ${header}`);
  }
  return index;
};

const run = async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto(MUSLIM_PLUS_CALENDAR_URL, { waitUntil: "networkidle0" });

    const tables = await page.$$eval("table", (nodes) =>
      nodes.map((node) => ({
        headers: Array.from(
          node.querySelectorAll("th") as ArrayLike<BrowserCellNode>,
        ).map((cell) => cell.textContent?.trim() ?? ""),
        rows: Array.from(
          node.querySelectorAll("tbody tr") as ArrayLike<BrowserRowNode>,
        ).map((row) =>
          Array.from(row.querySelectorAll("td")).map(
            (cell) => cell.textContent?.trim() ?? "",
          ),
        ),
      })),
    );

    const calendarTable = (tables as BrowserTable[]).find(
      (table) =>
        table.headers.includes("Gregorian Date") &&
        table.headers.includes("Fajr Iqama"),
    );
    if (!calendarTable) {
      throw new Error("missing Masjid As-Saber monthly prayer table");
    }

    const todayLabel = getCurrentCalendarLabel(ids[0].timeZoneId);
    const todayRow = calendarTable.rows.find(
      (row) => (row[0] ?? "").trim() === todayLabel,
    );
    if (!todayRow) {
      throw new Error(`missing Masjid As-Saber calendar row for ${todayLabel}`);
    }

    const iqamaTimes = [
      util.normalizeLooseClock(
        todayRow[getHeaderIndex(calendarTable.headers, "Fajr Iqama")],
      ),
      util.normalizeLooseClock(
        todayRow[getHeaderIndex(calendarTable.headers, "Dhuhr Iqama")],
      ),
      util.normalizeLooseClock(
        todayRow[getHeaderIndex(calendarTable.headers, "Asr Iqama")],
      ),
      util.normalizeLooseClock(
        todayRow[getHeaderIndex(calendarTable.headers, "Maghrib Iqama")],
      ),
      util.normalizeLooseClock(
        todayRow[getHeaderIndex(calendarTable.headers, "Isha Iqama")],
      ),
    ];
    if (iqamaTimes.some((value) => value.length === 0)) {
      throw new Error("failed to parse Masjid As-Saber iqama times");
    }

    const jumahTable = (tables as BrowserTable[]).find(
      (table) =>
        table.headers.length === 2 &&
        table.headers[0] === "Khutbah" &&
        table.headers[1] === "Prayer",
    );
    const jumahRow = jumahTable?.rows[0];
    const jumahTime = util.normalizeLooseClock(
      jumahRow?.[0] || jumahRow?.[1] || "",
    );
    if (!jumahTime) {
      throw new Error("failed to parse Masjid As-Saber Jumu'ah time");
    }

    util.setIqamaTimes(ids[0], iqamaTimes);
    // Muslim+ publishes khutbah and prayer separately; keep the khutbah start.
    util.setJumaTimes(ids[0], [jumahTime]);

    return ids;
  } finally {
    await browser.close();
  }
};

export const crawler: CrawlerModule = {
  name: "US/OR/masjid-as-saber-portland",
  ids,
  run,
  puppeteer: crawlerPuppeteer,
};
