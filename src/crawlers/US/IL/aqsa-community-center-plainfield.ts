import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a29de6c9-b35b-4c29-956d-f0eda7338c61",
    name: "Al-Aqsa Community Center",
    url: "https://www.accplainfield.org/",
    address: "17940 Bronk Rd, Plainfield, IL 60586, USA",
    placeId: "ChIJu0A5cfKKDogRwwN7sNgCylw",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.556664,
      longitude: -88.19109,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const iqamaByPrayer = new Map<string, string>();
  let jumaTimes: string[] = [];

  $(".salah > div").each((_, block) => {
    const title = $(block).find(".salah-title").text().trim().toLowerCase();
    const spans = $(block)
      .find(".salah-desc span")
      .toArray()
      .map((span) =>
        $(span)
          .text()
          .replace(/^Iqamah:\s*/i, "")
          .trim(),
      )
      .filter(Boolean);

    if (title === "jumu'ah") {
      jumaTimes = spans
        .map((value) => util.extractTimeAmPm(value) || util.extractTime(value))
        .filter(Boolean);
      return;
    }

    const iqama = spans[0] ?? "";
    if (!iqama) {
      return;
    }

    if (title === "fajr") {
      iqamaByPrayer.set("fajr", iqama);
    } else if (title === "zuhr") {
      iqamaByPrayer.set("zuhr", iqama);
    } else if (title === "asr") {
      iqamaByPrayer.set("asr", iqama);
    } else if (title === "magrib") {
      iqamaByPrayer.set("maghrib", iqama);
    } else if (title === "isha'a") {
      iqamaByPrayer.set("isha", iqama);
    }
  });

  const iqamaTimes = util.requireStandardPrayerTimes(
    iqamaByPrayer,
    "incomplete salah blocks on Al-Aqsa homepage",
  );

  util.setIqamaTimes(ids[0], iqamaTimes);
  util.setJumaTimes(ids[0], jumaTimes);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/aqsa-community-center-plainfield",
  ids,
  run,
};
