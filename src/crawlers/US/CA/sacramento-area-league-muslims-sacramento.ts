import {
  extractSunsetOffsetMinutes,
  sunsetOffsetClock,
} from "../../../suntime";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "65dcb0ba-d743-42cd-9fef-664d2efdf947",
    name: "Sacramento Area League-Muslims",
    url: "http://salamcenter.org/",
    timeZoneId: "America/Los_Angeles",
    address: "4545 College Oak Dr, Sacramento, CA 95841, USA",
    placeId: "ChIJAQDAYcremoARqsMwnalMKrY",
    geo: {
      latitude: 38.647282,
      longitude: -121.35102,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const rawIqamaTimes = util
    .mapToText($, ".nectar-list-item[data-text-align=right]")
    .slice(1);
  if (rawIqamaTimes.length < 5) {
    throw new Error("missing iqama times on SALAM Center homepage");
  }
  const iqamaTimes = rawIqamaTimes.slice(0, 5).map((time, index) => {
    if (index === 3) {
      const fallbackOffsetMinutes = Number.parseInt(
        time.match(/after\s*(\d+)\s*min/i)?.[1] ?? "",
        10,
      );
      const sunsetOffsetMinutes =
        extractSunsetOffsetMinutes(time) ||
        (Number.isFinite(fallbackOffsetMinutes) ? fallbackOffsetMinutes : null);
      if (sunsetOffsetMinutes !== null) {
        return sunsetOffsetClock(ids[0], sunsetOffsetMinutes);
      }
    }

    return util.normalizeLooseClock(time);
  });

  const jumaTimesFromHeadings = util
    .mapToText($, "h3")
    .filter((text) => text.toLowerCase().includes("jumu"))
    .map((text) => util.extractTimeAmPm(text))
    .filter((time): time is string => Boolean(time));

  const jumaTimesFromEvents = $(".mec-event-title")
    .toArray()
    .flatMap((title) => {
      if (!$(title).text().toLowerCase().includes("jumu")) {
        return [];
      }

      const startTimeText =
        $(title).siblings(".mec-time-details").find(".mec-start-time").text() ||
        $(title).closest("article, li, div").find(".mec-start-time").text();
      const startTime = util.extractTimeAmPm(startTimeText);
      return startTime ? [startTime] : [];
    });

  const jumaTimes = Array.from(
    new Set([...jumaTimesFromHeadings, ...jumaTimesFromEvents]),
  );
  if (jumaTimes.length === 0) {
    throw new Error("missing Juma times on SALAM Center homepage");
  }

  util.setIqamaTimes(ids[0], iqamaTimes);
  util.setJumaTimes(ids[0], jumaTimes.slice(0, 3));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CA/sacramento-area-league-muslims-sacramento",
  ids,
  run,
};
