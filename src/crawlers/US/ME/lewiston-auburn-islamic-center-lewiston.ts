import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "faef4be0-6fa3-4c76-89dc-136e5806a34f",
    name: "Lewiston/Auburn Islamic Center",
    url: "http://laislamiccenter.com/",
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
  // xmlMode: true so that script tags don't get special treatment
  const $ = await util.load(ids[0].url, { cheerio: { xmlMode: true } });

  type Prayer = {
    prayerName: string;
    prayerTime: string;
  };

  type Jumuah = {
    jumuaTiming: string;
  };

  type PrayerSection = {
    name: string;
    data: Array<{
      prayers: Prayer[];
      jumuahs: Jumuah[];
      [key: string]: unknown;
    }>;
  };

  type PrayerApiData = {
    props: {
      pageProps: {
        initialData: {
          sections: PrayerSection[];
        };
      };
    };
  };

  const d = util
    .mapToText($, "script#__NEXT_DATA__")
    .map((text) => JSON.parse(text) as PrayerApiData)
    .map(
      (j) =>
        j.props.pageProps.initialData.sections.find(
          (s) => s.name === "Prayer Times",
        )?.data,
    )
    .shift();

  if (!d || !Array.isArray(d) || d.length === 0) {
    throw new Error("failed to parse prayer times");
  }

  const prayerDay = d[0];
  if (!prayerDay) {
    throw new Error("failed to parse prayer day");
  }
  const prayers = prayerDay.prayers as Array<Prayer>;
  const jumuahs = prayerDay.jumuahs as Array<Jumuah>;

  util.setIqamaTimes(ids[0], [
    prayers.find((p: Prayer) => p.prayerName === "Fajr")?.prayerTime,
    prayers.find((p: Prayer) => p.prayerName === "Zuhr")?.prayerTime,
    prayers.find((p: Prayer) => p.prayerName === "Asr")?.prayerTime,
    prayers.find((p: Prayer) => p.prayerName === "Magrib")?.prayerTime,
    prayers.find((p: Prayer) => p.prayerName === "Isha")?.prayerTime,
  ]);

  util.setJumaTimes(
    ids[0],
    jumuahs.map((j: Jumuah) => j.jumuaTiming),
  );

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/ME/lewiston-auburn-islamic-center-lewiston",
  ids,
  run,
};
