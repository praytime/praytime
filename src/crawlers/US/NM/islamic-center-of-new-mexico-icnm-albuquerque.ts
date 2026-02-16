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
  const iqamaTimes = [...userHtml.matchAll(/"iqamahFormatted":"([^"]+)"/g)]
    .map((match) => match[1])
    .slice(0, 5);
  if (iqamaTimes.length < 5) {
    throw new Error("failed to parse iqamah times");
  }

  util.setIqamaTimes(ids[0], iqamaTimes);

  const jumahNotice = userHtml.match(/"jumahNotice":"([^"]+)"/)?.[1];
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
