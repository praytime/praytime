import type { AnyNode } from "domhandler";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

type PrayerKey = util.StandardPrayerKey | "juma";
type IqamaPrayerKey = util.StandardPrayerKey;
type Page = Awaited<ReturnType<typeof util.load>>;

const prayerLabelToKey = (text: string): PrayerKey | "" => {
  if (text.trim().toLowerCase().startsWith("jumu")) {
    return "juma";
  }
  return util.getStandardPrayerKey(text);
};

const extractPrayerCardText = ($: Page, selector: AnyNode): string => {
  const card = $(selector).clone();
  card.find("script, style").remove();
  return card.text().replace(/\s+/g, " ").trim();
};

const parsePrayerCards = ($: Page) => {
  const iqamaByPrayer = new Map<IqamaPrayerKey, string>();
  let jumaTimes: string[] = [];

  for (const card of $(".mk-time .et_pb_text_inner").toArray()) {
    const text = extractPrayerCardText($, card);
    const prayerKey = prayerLabelToKey(text);
    if (!prayerKey) {
      continue;
    }

    const times = (util.matchTimeAmPmG(text) ?? []).map((value) =>
      util.extractTimeAmPm(value),
    );
    if (prayerKey === "juma") {
      jumaTimes = [...new Set(times.filter((value) => value.length > 0))];

      if (jumaTimes.length === 0) {
        jumaTimes = [
          ...new Set(
            (
              util.matchTimeAmPmG($(card).attr("data-et-multi-view") ?? "") ??
              []
            )
              .map((value) => util.extractTimeAmPm(value))
              .filter((value) => value.length > 0),
          ),
        ];
      }

      continue;
    }

    const iqama = times.at(-1) ?? "";
    if (!iqama || iqamaByPrayer.has(prayerKey)) {
      continue;
    }

    iqamaByPrayer.set(prayerKey, iqama);
  }

  const iqamaTimes = util.requireStandardPrayerTimes(
    iqamaByPrayer,
    "incomplete iqama times on bolingbrookmasjid.com/home/",
  );
  if (jumaTimes.length === 0) {
    throw new Error("missing Juma times on bolingbrookmasjid.com/home/");
  }

  return { iqamaTimes, jumaTimes };
};

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "e8ba38bf-3c61-4e3f-8167-9e6c0c770dea",
    name: "Masjid Al-Islam",
    address: "560 E N Frontage Rd, Bolingbrook, IL 60440, USA",
    placeId: "ChIJqbAvBARbDogRZHT8ue9eZD4",
    timeZoneId: "America/Chicago",
    url: "http://bolingbrookmasjid.com",
    geo: {
      latitude: 41.698385,
      longitude: -88.044029,
    },
  },
  {
    uuid4: "f15a753e-bae3-4f37-a81c-d352cb8eec72",
    name: "Masjid Al-Jumu'ah",
    address: "351 Veterans Pkwy, Bolingbrook, IL 60490, USA",
    placeId: "ChIJGe_RdBdZDogRrHICztUkdME",
    timeZoneId: "America/Chicago",
    url: "http://bolingbrookmasjid.com",
    geo: {
      latitude: 41.688226,
      longitude: -88.118169,
    },
  },
];

const run = async () => {
  const $ = await util.load("https://bolingbrookmasjid.com/home/");
  const { iqamaTimes, jumaTimes } = parsePrayerCards($);

  util.setIqamaTimesAll(ids, iqamaTimes);
  util.setJumaTimesAll(ids, jumaTimes.slice(0, 3));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/muslim-association-of-bolingbrook",
  ids,
  run,
};
