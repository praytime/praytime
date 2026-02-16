import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const PRAYER_LABELS: Record<
  string,
  "fajr" | "zuhr" | "asr" | "maghrib" | "isha" | "juma"
> = {
  aljumua: "juma",
  asr: "asr",
  fajr: "fajr",
  dhuhr: "zuhr",
  isha: "isha",
  isya: "isha",
  juma: "juma",
  jumah: "juma",
  jumuah: "juma",
  jumua: "juma",
  maghrib: "maghrib",
  zuhr: "zuhr",
};

const normalizeLabel = (text: string): string =>
  text.toLowerCase().replace(/[^a-z]/g, "");

const extractClock = (text: string): string =>
  util.extractTimeAmPm(text) || util.extractTime(text);

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "faef4be0-6fa3-4c76-89dc-136e5806a34f",
    name: "Lewiston/Auburn Islamic Center",
    url: "https://lewistonauburnislamiccenter.com/prayers/",
    timeZoneId: "America/New_York",
    address: "21 Lisbon St, Lewiston, ME 04240, USA",
    placeId: "ChIJa4bob8RrskwRtrEWjjryv_4",
    geo: {
      latitude: 44.09828919999999,
      longitude: -70.218144,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);
  const headingTexts = util.mapToText($, "h5.elementor-heading-title");

  const parsedTimes = new Map<
    "fajr" | "zuhr" | "asr" | "maghrib" | "isha" | "juma",
    string
  >();

  for (let i = 0; i < headingTexts.length - 1; i += 1) {
    const labelText = headingTexts[i];
    const valueText = headingTexts[i + 1];
    if (!labelText || !valueText) {
      continue;
    }

    const label = PRAYER_LABELS[normalizeLabel(labelText)];
    if (!label) {
      continue;
    }

    const time = extractClock(valueText);
    if (!time || parsedTimes.has(label)) {
      continue;
    }

    parsedTimes.set(label, time);
  }

  const iqamaTimes = [
    parsedTimes.get("fajr") ?? "",
    parsedTimes.get("zuhr") ?? "",
    parsedTimes.get("asr") ?? "",
    parsedTimes.get("maghrib") ?? "",
    parsedTimes.get("isha") ?? "",
  ];
  if (iqamaTimes.some((time) => !time)) {
    throw new Error("failed to parse prayer times");
  }
  util.setIqamaTimes(ids[0], iqamaTimes);

  const jumaTime = parsedTimes.get("juma");
  if (!jumaTime) {
    throw new Error("failed to parse juma time");
  }
  util.setJumaTimes(ids[0], [jumaTime]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/ME/lewiston-auburn-islamic-center-lewiston",
  ids,
  run,
};
