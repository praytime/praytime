import { createPuppeteerRun } from "../../../ppt";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "98f01538-d4f3-4325-b064-cfd2e2e9bdaa",
    name: "Dar Alhuda Inc مسجد",
    url: "https://www.daralhudamasjid.com/",
    timeZoneId: "America/Chicago",
    address: "1245 Karla Dr, Hurst, TX 76053, USA",
    placeId: "ChIJC1hNWyt_ToYRAZM_rWwLe6w",
    geo: {
      latitude: 32.8331572,
      longitude: -97.17820780000001,
    },
  },
];
const normalizeSpace = (text: string): string =>
  text.replace(/\s+/g, " ").trim();

const addMinutes = (value: string, minutesToAdd: number): string => {
  const match = value.match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
  if (!match) {
    return value;
  }

  const hour = Number.parseInt(match[1] ?? "", 10) % 12;
  const minute = Number.parseInt(match[2] ?? "", 10);
  const suffix = match[3]?.toUpperCase() === "PM" ? 12 * 60 : 0;
  const totalMinutes = hour * 60 + minute + suffix + minutesToAdd;
  const normalizedMinutes = ((totalMinutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const hours24 = Math.floor(normalizedMinutes / 60);
  const minutes = String(normalizedMinutes % 60).padStart(2, "0");
  const amPm = hours24 >= 12 ? "PM" : "AM";
  const hours12 = ((hours24 + 11) % 12) + 1;
  return `${hours12}:${minutes} ${amPm}`;
};

const extractSection = (text: string, label: string): string => {
  const match = text.match(
    new RegExp(
      `${label}(.*?)(?=Fajr|Sunrise|Dhuhr|Asr|Maghrib|Isha|Jummah \\(Friday\\)|Tuesday,|Wednesday,|Thursday,|Friday,|Saturday,|Sunday,|Monday,|$)`,
      "i",
    ),
  );
  return normalizeSpace(match?.[1] ?? "");
};

export const crawler: CrawlerModule = {
  name: "US/TX/dar-alhuda-inc-msjd-hurst",
  ids,
  run: createPuppeteerRun(ids, async (page) => {
    await page.goto(ids[0].url ?? "", { waitUntil: "networkidle0" });
    const pageText = normalizeSpace(
      await page.evaluate(() => {
        const body = (
          globalThis as { document?: { body?: { innerText?: string } } }
        ).document?.body;
        return typeof body?.innerText === "string" ? body.innerText : "";
      }),
    );

    const extractIqama = (label: string): string => {
      const section = extractSection(pageText, label);
      const explicitTimes = [...(util.matchTimeAmPmG(section) ?? [])]
        .map((value) => util.extractTimeAmPm(value))
        .filter((value): value is string => Boolean(value));
      if (explicitTimes.length >= 2) {
        return explicitTimes.at(-1) ?? "";
      }

      const relativeMatch = section.match(
        /(\d+)\s+minutes?\s+after the Athan/i,
      );
      if (explicitTimes[0] && relativeMatch?.[1]) {
        return addMinutes(
          explicitTimes[0],
          Number.parseInt(relativeMatch[1], 10),
        );
      }

      return explicitTimes[0] ?? "";
    };

    util.setIqamaTimes(ids[0], [
      extractIqama("Fajr"),
      extractIqama("Dhuhr"),
      extractIqama("Asr"),
      extractIqama("Maghrib"),
      extractIqama("Isha"),
    ]);
    util.setJumaTimes(
      ids[0],
      [
        ...(util.matchTimeAmPmG(
          extractSection(pageText, "Jummah \\(Friday\\)"),
        ) ?? []),
      ]
        .map((value) => util.extractTimeAmPm(value))
        .filter((value): value is string => Boolean(value)),
    );
  }),
  puppeteer: true,
};
