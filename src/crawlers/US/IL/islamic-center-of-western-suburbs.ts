import * as cheerio from "cheerio";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "aad361ea-8f99-4cac-aec4-399249439cce",
    name: "Islamic Center of Western Suburbs",
    url: "http://www.icwsmasjid.org/",
    address: "28W774 Army Trail Rd, West Chicago, IL 60185, USA",
    placeId: "ChIJh8IdCooAD4gRzjD0rNJ1OTY",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.944168,
      longitude: -88.184075,
    },
  },
  {
    uuid4: "da94a43b-ab2c-4f80-8c2e-28a2bdfd8b19",
    name: "Islamic Center of Western Suburbs Juma",
    url: "http://www.icwsmasjid.org/",
    address: "700 S Bartlett Rd, Bartlett, IL 60103, USA",
    placeId: "ChIJTxX-1ckAD4gRc6nJx62Xdmc",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.977752,
      longitude: -88.18782,
    },
  },
];

const normalizeText = (value: string): string =>
  value.replace(/\s+/g, " ").trim();

const parseIqamaTime = (
  $: cheerio.CheerioAPI,
  label: string,
  description: string,
): string => {
  const parsed = util.extractTimeAmPm(
    normalizeText($(`thead:contains('${label}') + thead`).text()),
  );
  if (!parsed) {
    throw new Error(`missing ICWS ${description} iqama time`);
  }

  return parsed;
};

const findJumaSectionText = (
  $: cheerio.CheerioAPI,
  titlePattern: RegExp,
): string => {
  const heading = $("h2")
    .toArray()
    .find((element) => titlePattern.test(normalizeText($(element).text())));
  if (!heading) {
    throw new Error(`missing ICWS Juma section for ${titlePattern}`);
  }

  const sectionText = normalizeText(
    $(heading).closest(".wpb_row").next(".wpb_row").text(),
  );
  if (!sectionText) {
    throw new Error(`missing ICWS Juma timings for ${titlePattern}`);
  }

  return sectionText;
};

const parseKhutbahTimes = (sectionText: string): string[] => {
  const times = [
    ...sectionText.matchAll(
      /Khutbah(?:\s+\d+)?\s*\.\s*(\d{1,2}:\d{2}\s*[ap]\.?m\.?)/gi,
    ),
  ]
    .map((match) => util.extractTimeAmPm(match[1] ?? ""))
    .filter(Boolean);
  if (times.length === 0) {
    throw new Error(`missing ICWS khutbah times in section: ${sectionText}`);
  }

  return times;
};

const run = async () => {
  const response = await util.get("https://www.icwsmasjid.org/");
  const $ = cheerio.load(response.data);

  util.setIqamaTimes(ids[0], [
    parseIqamaTime($, "FAJR", "Fajr"),
    parseIqamaTime($, "DHUR", "Zuhr"),
    parseIqamaTime($, "ASR", "Asr"),
    parseIqamaTime($, "MAGHRIB", "Maghrib"),
    parseIqamaTime($, "ISHA", "Isha"),
  ]);
  util.setJumaTimes(
    ids[0],
    parseKhutbahTimes(
      findJumaSectionText($, /Jumaah Timings . West Chicago Location/i),
    ).slice(0, 1),
  );

  const second = ids[1];
  if (second) {
    util.setJumaTimes(
      second,
      parseKhutbahTimes(
        findJumaSectionText($, /Jumaah Timings . Bartlett Location/i),
      ),
    );
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/islamic-center-of-western-suburbs",
  ids,
  run,
};
