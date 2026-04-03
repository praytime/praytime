import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "7c6a201a-c4e5-4203-b6af-4f495eede526",
    name: "Islamic Center of New Mexico (ICNM)",
    url: "https://www.icnmabq.org/",
    timeZoneId: "America/Denver",
    address: "1100 Yale Blvd SE, Albuquerque, NM 87106, USA",
    placeId: "ChIJzVJIwHsLIocRkCrgX3ez2SU",
    geo: {
      latitude: 35.0682941,
      longitude: -106.6216504,
    },
  },
];

type AppsScriptInitPayload = {
  userHtml?: string;
};

type ServerDataPrayerScheduleEntry = {
  iqamahFormatted?: unknown;
  name?: unknown;
};

type ServerDataPayload = {
  jumahNotice?: unknown;
  prayerSchedule?: unknown;
};

const normalizeClock = (value: unknown): string =>
  util.extractTimeAmPm(typeof value === "string" ? value : undefined) ||
  util.extractTime(typeof value === "string" ? value : undefined);

const parseAppsScriptUserHtml = (rawHtml: string): string => {
  const initPayload = rawHtml.match(
    /goog\.script\.init\("([\s\S]*?)",\s*""\s*,\s*undefined,\s*true/s,
  )?.[1];
  if (!initPayload) {
    throw new Error("missing apps script init payload");
  }

  const decodedPayload = Function(
    `"use strict"; return "${initPayload}";`,
  )() as string;
  const payload = JSON.parse(decodedPayload) as AppsScriptInitPayload;
  if (typeof payload.userHtml !== "string" || payload.userHtml.length === 0) {
    throw new Error("missing apps script userHtml");
  }

  return payload.userHtml;
};

const parseServerData = (userHtml: string): ServerDataPayload | null => {
  const payload = userHtml.match(
    /const\s+serverData\s*=\s*(\{[\s\S]*?\});/s,
  )?.[1];
  if (!payload) {
    return null;
  }

  try {
    return JSON.parse(payload) as ServerDataPayload;
  } catch {
    throw new Error("failed to parse apps script serverData");
  }
};

const prayerScheduleEntries = (
  serverData: ServerDataPayload | null,
): ServerDataPrayerScheduleEntry[] =>
  Array.isArray(serverData?.prayerSchedule)
    ? (serverData.prayerSchedule as ServerDataPrayerScheduleEntry[])
    : [];

const run = async () => {
  const $ = await util.load(ids[0].url);
  const prayerIframeSrc = $("iframe[aria-label='Apps Script']")
    .first()
    .attr("src");
  if (!prayerIframeSrc) {
    throw new Error("missing prayer iframe src");
  }

  const response = await util.get<string>(prayerIframeSrc);
  if (typeof response.data !== "string") {
    throw new Error("unexpected prayer iframe response type");
  }

  const userHtml = parseAppsScriptUserHtml(response.data);
  const serverData = parseServerData(userHtml);
  const schedule = prayerScheduleEntries(serverData);

  if (schedule.length > 0) {
    const scheduleByName = new Map<string, string>();
    const jumuahTimes: string[] = [];

    for (const entry of schedule) {
      const label =
        typeof entry.name === "string"
          ? entry.name.toLowerCase().replace(/[^a-z]/g, "")
          : "";
      const time = normalizeClock(entry.iqamahFormatted);
      if (!label || !time) {
        continue;
      }

      if (label.includes("jumu")) {
        jumuahTimes.push(time);
      }

      scheduleByName.set(label, time);
    }

    const iqamaTimes = [
      scheduleByName.get("fajr") ?? "",
      scheduleByName.get("dhuhr") ?? scheduleByName.get("jumuah") ?? "",
      scheduleByName.get("asr") ?? "",
      scheduleByName.get("maghrib") ?? "",
      scheduleByName.get("isha") ?? "",
    ];
    if (iqamaTimes.some((time) => !time)) {
      throw new Error("failed to parse iqamah times");
    }

    util.setIqamaTimes(ids[0], iqamaTimes);

    if (jumuahTimes.length > 0) {
      util.setJumaTimes(ids[0], jumuahTimes);
    }

    return ids;
  }

  const iqamaTimes = [...userHtml.matchAll(/"iqamahFormatted":"([^"]+)"/g)]
    .map((match) => match[1])
    .slice(0, 5);
  if (iqamaTimes.length < 5) {
    throw new Error("failed to parse iqamah times");
  }

  util.setIqamaTimes(ids[0], iqamaTimes);

  const jumahNotice =
    (typeof serverData?.jumahNotice === "string" && serverData.jumahNotice) ||
    userHtml.match(/"jumahNotice":"([^"]+)"/)?.[1];
  const jumahTimes = util.matchTimeAmPmG(jumahNotice);
  if (jumahTimes?.length) {
    util.setJumaTimes(ids[0], jumahTimes);
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NM/islamic-center-of-new-mexico-icnm-albuquerque",
  ids,
  run,
};
