import * as cheerio from "cheerio";
import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids: CrawlerModule["ids"] = [
  {
    uuid4: "4b293ef0-14a0-41b7-9801-e7c6e6ff7e09",
    name: "ADAMS Ashburn",
    url: "https://www.adamscenter.org",
    address: "21740 Beaumeade Cir STE 100, Ashburn, VA 20147, USA",
    timeZoneId: "America/New_York",
    placeId: "ChIJK8JfXCY5tokRFka3F-HAnFU",
    geo: {
      latitude: 39.018021,
      longitude: -77.456387,
    },
  },
  {
    // not on juma page, but still in google maps
    uuid4: "81698dc4-41c1-4ca2-8053-bdaba43988b3",
    name: "ADAMS Fairfax",
    url: "https://www.adamscenter.org",
    timeZoneId: "America/New_York",
    address: "10359 B Democracy Ln, Fairfax, VA 22030, USA",
    geo: {
      latitude: 38.849321,
      longitude: -77.302137,
    },
    placeId: "ChIJfQ7sxpZOtokREf1z3G72pNI",
  },
  {
    uuid4: "31651405-d226-4c53-a0f3-d81d0efc7371",
    name: "Gainesville Juma - Wyndham Garden Manassas",
    url: "https://www.adamscenter.org/jumuah/",
    address: "10800 Vandor Ln, Manassas, VA 20109, USA",
    timeZoneId: "America/New_York",
    placeId: "ChIJz4XyACddtokRbyIZi_PWDzs",
    geo: {
      latitude: 38.8027792,
      longitude: -77.5177811,
    },
  },
  {
    uuid4: "1f858dc7-182a-48e7-b9f3-b0849703f22a",
    name: "ADAMS Sterling",
    url: "https://www.adamscenter.org",
    address: "46903 Sugarland Rd, Sterling, VA 20164, USA",
    timeZoneId: "America/New_York",
    placeId: "ChIJc6S_TtU5tokRgk_TpO3j3Kw",
    geo: {
      latitude: 39.006404,
      longitude: -77.379375,
    },
  },
  {
    uuid4: "f92dccc9-9582-49ce-9b38-8b4705006246",
    name: "ADAMS Sully",
    url: "https://www.adamscenter.org",
    address:
      "4431 Brookfield Corporate Dr building f, Chantilly, VA 20151, USA",
    timeZoneId: "America/New_York",
    placeId: "ChIJaVreXCZEtokR5wAA42IgIpM",
    geo: {
      latitude: 38.8853645,
      longitude: -77.4376983,
    },
  },
  // { // hilton, no longer on website
  //   uuid4: '05ed8229-4a57-43b0-974b-7c71860400f1',
  //   name: 'ADAMS Fairfax Juma',
  //   url: 'https://www.adamscenter.org/prayer-services',
  //   timeZoneId: 'America/New_York',
  //   address: '3950 Fair Ridge Dr, Fairfax, VA 22033, USA',
  //   geo: {
  //     latitude: 38.872725,
  //     longitude: -77.371139
  //   },
  //   placeId: 'ChIJw5yL7VBPtokRz6gzPH5FiYQ'
  // },
  // { // no longer on website
  //   uuid4: '43a0962a-2729-4234-ab04-0b216c8e2ea5',
  //   name: 'ADAMS Ashburn Satellite Juma - Embassy Suites - Heathrow Room',
  //   url: 'https://www.adamscenter.org/prayer-services',
  //   address: '44610 Waxpool Rd, Dulles, VA 20147, USA',
  //   timeZoneId: 'America/New_York',
  //   placeId: 'ChIJHz5FMtY4tokRi58O2xX5qxM',
  //   geo: {
  //     latitude: 39.01401,
  //     longitude: -77.461995
  //   }
  // },
  {
    uuid4: "cfd101b2-913f-4ace-9a74-244b2c7767b7",
    name: "ADAMS Tysons Juma - Marriot",
    url: "https://www.adamscenter.org/jumuah/",
    address: "8028 Leesburg Pike, Tysons, VA 22182, USA",
    timeZoneId: "America/New_York",
    placeId: "ChIJJ7WUjeZKtokRwadFeHcDM40",
    geo: {
      latitude: 38.913846,
      longitude: -77.221193,
    },
  },
  {
    uuid4: "1f9de882-0c5c-4de2-a1aa-904119aa752b",
    name: "ADAMS Reston Juma - NVHC",
    url: "https://www.adamscenter.org/jumuah/",
    address: "1441 Wiehle Ave, Reston, VA 20190, USA",
    timeZoneId: "America/New_York",
    placeId: "ChIJZcMNtTI2tokR-D3IxC5NQic",
    geo: {
      latitude: 38.971421,
      longitude: -77.332341,
    },
  },
  // { // no longer on website
  //   uuid4: '6763721a-01a9-4c79-9e15-e3482fc4d87e',
  //   name: 'ADAMS Crystal City Juma - Marriott',
  //   url: 'https://www.adamscenter.org/prayer-services',
  //   address: '1999 Jefferson Davis Hwy, Arlington, VA 22202, USA',
  //   timeZoneId: 'America/New_York',
  //   placeId: 'ChIJ6U5doCi3t4kRzcsHFmtZ4Z4',
  //   geo: {
  //     latitude: 38.856419,
  //     longitude: -77.051421
  //   }
  // },
  // { // no longer on website
  //   uuid4: '04348fb3-a402-4b0c-b117-520359718639',
  //   name: 'ADAMS DC Juma - Church of Epiphany',
  //   url: 'https://www.adamscenter.org/prayer-services',
  //   address: '1317 G St NW, Washington, DC 20005, USA', // TODO move to own state dir
  //   timeZoneId: 'America/New_York',
  //   placeId: 'ChIJ9XzH-Ja3t4kRfeWp9fECHM8',
  //   geo: {
  //     latitude: 38.898723,
  //     longitude: -77.03042
  //   }
  // },
  {
    uuid4: "c3e8e5a4-794d-4179-b8d6-dbf5eaf47cd1",
    name: "Muslim Community Center of Leesburg",
    url: "http://www.mccleesburg.org/",
    timeZoneId: "America/New_York",
    address: "19838 Sycolin Rd, Leesburg, VA 20175, USA",
    placeId: "ChIJ4fbayPw9tokRHhRI1hD5uBk",
    geo: {
      latitude: 39.0692386,
      longitude: -77.55177189999999,
    },
  },
  {
    uuid4: "5f90da3a-133e-467f-88d0-8b503cb0c77e",
    name: "Muslim Community Center of Leesburg Juma - Clarion Hotel & Conference Center Leesburg",
    url: "https://www.adamscenter.org/jumuah/",
    timeZoneId: "America/New_York",
    address: "1500 E Market St, Leesburg, VA 20176, USA",
    placeId: "ChIJbTLDLLA9tokRVRlngeslQ7E",
    geo: {
      latitude: 39.0931682,
      longitude: -77.52393649999999,
    },
  },
];

const ADAMS_IQAMA_WIDGET_URL =
  "https://www-adamscenter-org.filesusr.com/html/a49bbb_018741b5b83d5042e9cf79cb18576f7b.html";
const ADAMS_JUMUAH_URL = "https://www.adamscenter.org/jumuah/";
const ADAMS_JUMUAH_API_URL =
  "https://www.adamscenter.org/wp-json/wp/v2/pages?slug=jumuah&_fields=content.rendered";
const MCLEAN_PRAYER_URL = "https://themasjidapp.org/40/prayers";
const ADAMS_JUMUAH_LABELS = [
  "Sterling Jumu'ah",
  "Ashburn Jumu'ah",
  "Ashburn Satellite Jumu'ah",
  "Fairfax Jumu'ah",
  "Sully Jumu'ah",
  "Sully Satellite Jumu'ah",
  "Gainesville Satellite Jumu'ah",
  "Gainesville Jumu'ah",
  "Reston Jumu'ah",
  "Leesburg Satellite Jumu'ah",
  "Leesburg Jumu'ah",
  "Crescent Islamic Center Jumu'ah",
  "Tysons Jumu'ah partnership with McLean Islamic Center",
] as const;

type AdamsMasjidAppEvent = {
  isJuma?: unknown;
  locationDesc?: unknown;
  order?: unknown;
  timeDesc?: unknown;
};

type AdamsMasjidAppPayload = {
  props?: {
    pageProps?: {
      masjid?: {
        events?: unknown;
      };
    };
  };
};

type AdamsWordPressPage = {
  content?: {
    rendered?: unknown;
  };
};

type AdamsJumaTimes = {
  ashburn: string[];
  fairfax: string[];
  gainesville: string[];
  leesburg: string[];
  leesburgSatellite: string[];
  reston: string[];
  sterling: string[];
  sully: string[];
};

type SettledPromise<T> =
  | {
      ok: true;
      value: T;
    }
  | {
      ok: false;
      error: unknown;
    };

const normalizeSpace = (text: string): string =>
  text.replace(/[’]/g, "'").replace(/\s+/g, " ").trim();

const uniqueTimes = (times: string[]): string[] => Array.from(new Set(times));
const adamsCheckWebsiteTimes = (): string[] => ["check website"];

const settlePromise = async <T>(
  promise: Promise<T>,
): Promise<SettledPromise<T>> => {
  try {
    return {
      ok: true,
      value: await promise,
    };
  } catch (error: unknown) {
    return {
      ok: false,
      error,
    };
  }
};

const unwrapSettledPromise = <T>(result: SettledPromise<T>): T => {
  if (!result.ok) {
    throw result.error;
  }

  return result.value;
};

const extractAdamsJumaSection = (
  text: string,
  label: (typeof ADAMS_JUMUAH_LABELS)[number],
): string => {
  const start = text.indexOf(label);
  if (start === -1) {
    throw new Error(`missing ADAMS Jumu'ah section: ${label}`);
  }

  const labelIndex = ADAMS_JUMUAH_LABELS.indexOf(label);
  const tail = text.slice(start + label.length);
  let end = tail.length;
  for (const nextLabel of ADAMS_JUMUAH_LABELS.slice(labelIndex + 1)) {
    const index = tail.indexOf(nextLabel);
    if (index >= 0 && index < end) {
      end = index;
    }
  }

  return normalizeSpace(tail.slice(0, end));
};

const extractAdamsJumaTimes = (
  text: string,
  label: (typeof ADAMS_JUMUAH_LABELS)[number],
): string[] => {
  const section = extractAdamsJumaSection(text, label);
  const times = uniqueTimes(
    (util.matchTimeAmPmG(section) ?? util.matchTimeG(section) ?? [])
      .map((value) => util.extractTimeAmPm(value) || util.extractTime(value))
      .filter(Boolean),
  );
  if (times.length === 0) {
    throw new Error(`missing ADAMS Jumu'ah times for ${label}`);
  }
  return times;
};

const fallbackAdamsJumaTimes = (): AdamsJumaTimes => ({
  ashburn: adamsCheckWebsiteTimes(),
  fairfax: adamsCheckWebsiteTimes(),
  gainesville: adamsCheckWebsiteTimes(),
  leesburg: adamsCheckWebsiteTimes(),
  leesburgSatellite: adamsCheckWebsiteTimes(),
  reston: adamsCheckWebsiteTimes(),
  sterling: adamsCheckWebsiteTimes(),
  sully: adamsCheckWebsiteTimes(),
});

const extractAdamsJumaTimesFromSources = (
  texts: string[],
): AdamsJumaTimes | null => {
  const extractFromSources = (
    label: (typeof ADAMS_JUMUAH_LABELS)[number],
  ): string[] | null => {
    for (const text of texts) {
      if (text.includes(label)) {
        try {
          return extractAdamsJumaTimes(text, label);
        } catch {}
      }
    }

    return null;
  };

  const ashburn = extractFromSources("Ashburn Jumu'ah");
  const fairfax = extractFromSources("Fairfax Jumu'ah");
  const gainesville = extractFromSources("Gainesville Satellite Jumu'ah");
  const leesburg = extractFromSources("Leesburg Jumu'ah");
  const leesburgSatellite = extractFromSources("Leesburg Satellite Jumu'ah");
  const reston = extractFromSources("Reston Jumu'ah");
  const sterling = extractFromSources("Sterling Jumu'ah");
  const sully = extractFromSources("Sully Jumu'ah");
  if (
    !ashburn ||
    !fairfax ||
    !gainesville ||
    !leesburg ||
    !leesburgSatellite ||
    !reston ||
    !sterling ||
    !sully
  ) {
    return null;
  }

  return {
    ashburn,
    fairfax,
    gainesville,
    leesburg,
    leesburgSatellite,
    reston,
    sterling,
    sully,
  };
};

const loadAdamsJumaTimes = async (): Promise<AdamsJumaTimes> => {
  const [$, apiPages] = await Promise.all([
    util.load(ADAMS_JUMUAH_URL),
    util.loadJson<AdamsWordPressPage[]>(ADAMS_JUMUAH_API_URL),
  ]);
  const renderedContent = Array.isArray(apiPages)
    ? apiPages.find((entry) => typeof entry.content?.rendered === "string")
        ?.content?.rendered
    : "";
  const renderedContentText =
    typeof renderedContent === "string"
      ? normalizeSpace(cheerio.load(renderedContent).text())
      : "";
  const sourceTexts = [
    normalizeSpace($("body").text()),
    renderedContentText,
    normalizeSpace($('meta[name="description"]').attr("content") ?? ""),
    normalizeSpace($('meta[property="og:description"]').attr("content") ?? ""),
    normalizeSpace($('meta[name="twitter:description"]').attr("content") ?? ""),
  ].filter((text) => text.length > 0);

  const parsed = extractAdamsJumaTimesFromSources(sourceTexts);
  if (parsed) {
    return parsed;
  }

  if (
    typeof renderedContent === "string" &&
    /wp-content\/uploads\/\d{4}\/\d{2}\/[^"' >]*(jummah|jumuah|jum['’]?ah)[^"' >]*\.(png|jpe?g)/i.test(
      renderedContent,
    )
  ) {
    return fallbackAdamsJumaTimes();
  }

  throw new Error("missing ADAMS Jumu'ah schedule");
};

const loadTysonsJumaTimes = async (): Promise<string[]> => {
  const $ = await util.load(MCLEAN_PRAYER_URL);
  const nextDataText = $("#__NEXT_DATA__").text().trim();
  if (!nextDataText) {
    throw new Error("missing McLean Islamic Center prayer data");
  }

  const nextData = JSON.parse(nextDataText) as AdamsMasjidAppPayload;
  const events = Array.isArray(nextData.props?.pageProps?.masjid?.events)
    ? (nextData.props?.pageProps?.masjid?.events as AdamsMasjidAppEvent[])
    : [];

  const times = uniqueTimes(
    events
      .filter(
        (event) =>
          event.isJuma === true &&
          typeof event.locationDesc === "string" &&
          event.locationDesc.includes("Tysons Corner Marriot") &&
          typeof event.timeDesc === "string",
      )
      .sort((a, b) => {
        const left =
          typeof a.order === "number" ? a.order : Number.MAX_SAFE_INTEGER;
        const right =
          typeof b.order === "number" ? b.order : Number.MAX_SAFE_INTEGER;
        return left - right;
      })
      .map((event) => util.extractTimeAmPm(event.timeDesc as string))
      .filter(Boolean),
  );

  if (times.length === 0) {
    throw new Error("missing ADAMS Tysons Jumu'ah times");
  }

  return times;
};

const run = async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    // These requests can fail before page navigation completes, so settle them
    // immediately to avoid an unhandled rejection aborting the whole batch.
    const framePromise = settlePromise(
      util.waitForFrame(page, "masjidbox.com"),
    );
    const adamsJumaTimesPromise = settlePromise(loadAdamsJumaTimes());
    const tysonsJumaTimesPromise = settlePromise(loadTysonsJumaTimes());

    await page.goto(ADAMS_IQAMA_WIDGET_URL, { waitUntil: "networkidle0" });

    const [frameResult, adamsJumaTimesResult, tysonsJumaTimesResult] =
      await Promise.all([
        framePromise,
        adamsJumaTimesPromise,
        tysonsJumaTimesPromise,
      ]);
    const frame = unwrapSettledPromise(frameResult);
    const adamsJumaTimes = unwrapSettledPromise(adamsJumaTimesResult);
    const tysonsJumaTimes = unwrapSettledPromise(tysonsJumaTimesResult);

    const iqamaTimes = await frame.$$eval("div.iqamah div.time", (divs) =>
      divs.map((div) => {
        const text = div.textContent ?? "";
        const p = text.match(/(\d{1,2})(\d{2}\w+)/);
        // convert 630AM => 6:30AM
        if (p) {
          return `${p[1]}:${p[2]}`;
        }
        return "";
      }),
    );

    if (iqamaTimes.length < 5 || iqamaTimes.some((time) => time.length === 0)) {
      throw new Error("failed to parse ADAMS daily iqama times");
    }

    const jumaTimesByName = new Map<string, string[]>([
      ["ADAMS Ashburn", adamsJumaTimes.ashburn],
      ["ADAMS Fairfax", adamsJumaTimes.fairfax],
      [
        "Gainesville Juma - Wyndham Garden Manassas",
        adamsJumaTimes.gainesville,
      ],
      ["ADAMS Sterling", adamsJumaTimes.sterling],
      ["ADAMS Sully", adamsJumaTimes.sully],
      ["ADAMS Tysons Juma - Marriot", tysonsJumaTimes],
      ["ADAMS Reston Juma - NVHC", adamsJumaTimes.reston],
      ["Muslim Community Center of Leesburg", adamsJumaTimes.leesburg],
      [
        "Muslim Community Center of Leesburg Juma - Clarion Hotel & Conference Center Leesburg",
        adamsJumaTimes.leesburgSatellite,
      ],
    ]);

    ids.forEach((record) => {
      if (!/Juma/.test(record.name)) {
        util.setIqamaTimes(record, iqamaTimes);
      }

      const jumaTimes = jumaTimesByName.get(record.name);
      if (jumaTimes?.length) {
        util.setJumaTimes(record, jumaTimes.slice(0, 3));
      }
    });
  } finally {
    await browser.close();
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/VA/adams-center",
  ids,
  run,
  puppeteer: crawlerPuppeteer,
};
