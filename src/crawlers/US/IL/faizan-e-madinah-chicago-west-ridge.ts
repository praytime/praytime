import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const PRAYER_PAGE_URL = "https://www.faizanemadinahusa.org/chicago-center";

type PrayerKey = "fajr" | "zuhr" | "asr" | "maghrib" | "isha";

const toPrayerKey = (text: string): PrayerKey | "" => {
  const value = text.trim().toLowerCase();
  if (value.startsWith("fajr")) {
    return "fajr";
  }
  if (
    value.startsWith("duhr") ||
    value.startsWith("dhuhr") ||
    value.startsWith("zuhr")
  ) {
    return "zuhr";
  }
  if (value.startsWith("asr")) {
    return "asr";
  }
  if (value.startsWith("maghrib")) {
    return "maghrib";
  }
  if (value.startsWith("isha")) {
    return "isha";
  }
  return "";
};

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "87ee5daa-3203-43a4-93c2-1a96ad28c620",
    name: "Faizan e Madinah Chicago-West Ridge",
    url: "https://www.dawateislamiusa.org/centers",
    timeZoneId: "America/Chicago",
    address: "6821 N Western Ave, Chicago, IL 60645, USA",
    placeId: "ChIJ-Y2n0b_RD4gRMGks0fAD4ho",
    geo: {
      latitude: 42.0058613,
      longitude: -87.6897326,
    },
  },
];

const run = async () => {
  const $ = await util.load(PRAYER_PAGE_URL);

  const iqamaByPrayer = new Map<PrayerKey, string>();
  for (const paragraph of $("p").toArray()) {
    const prayerKey = toPrayerKey($(paragraph).text());
    if (!prayerKey || iqamaByPrayer.has(prayerKey)) {
      continue;
    }

    const timeText = $(paragraph).parent().find("h2").first().text();
    const iqama = util.extractTimeAmPm(timeText);
    if (!iqama) {
      continue;
    }
    iqamaByPrayer.set(prayerKey, iqama);
  }

  const iqamaTimes = [
    iqamaByPrayer.get("fajr") ?? "",
    iqamaByPrayer.get("zuhr") ?? "",
    iqamaByPrayer.get("asr") ?? "",
    iqamaByPrayer.get("maghrib") ?? "",
    iqamaByPrayer.get("isha") ?? "",
  ];

  if (iqamaTimes.some((value) => value.length === 0)) {
    throw new Error("incomplete iqama times on Faizan e Madinah Chicago page");
  }

  const fridayHeader = $("h2")
    .filter((_, element) =>
      $(element).text().toLowerCase().includes("friday prayer"),
    )
    .first();
  if (!fridayHeader.length) {
    throw new Error(
      "missing Friday prayer section on Faizan e Madinah Chicago page",
    );
  }

  const fridaySection = fridayHeader.closest("section");
  if (!fridaySection.length) {
    throw new Error("unable to scope Friday prayer section");
  }

  const jumaByOrder = new Map<number, string>();
  for (const row of fridaySection
    .find("div.flex.items-center.justify-center.gap-3")
    .toArray()) {
    const orderText = $(row).find("p").first().text().trim();
    const orderMatch = orderText.match(/^(\d+)/);
    if (!orderMatch?.[1]) {
      continue;
    }

    const order = Number.parseInt(orderMatch[1], 10);
    if (!Number.isFinite(order) || jumaByOrder.has(order)) {
      continue;
    }

    const timeText = $(row).find("h2").first().text();
    const time = util.extractTimeAmPm(timeText);
    if (!time) {
      continue;
    }

    jumaByOrder.set(order, time);
  }

  let jumaTimes = [...jumaByOrder.entries()]
    .sort((a, b) => a[0] - b[0])
    .map((entry) => entry[1]);

  if (jumaTimes.length === 0) {
    jumaTimes = [...new Set(util.matchTimeAmPmG(fridaySection.text()) ?? [])];
  }

  if (jumaTimes.length === 0) {
    throw new Error("missing Juma times on Faizan e Madinah Chicago page");
  }

  util.setIqamaTimes(ids[0], iqamaTimes);
  util.setJumaTimes(ids[0], jumaTimes.slice(0, 3));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/faizan-e-madinah-chicago-west-ridge",
  ids,
  run,
};
