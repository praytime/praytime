import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

interface PrayerTime {
  is_jummah?: unknown;
  jummah_order?: unknown;
  name?: unknown;
  start?: unknown;
  time?: unknown;
}

interface PrayerLocation {
  id?: unknown;
  name?: unknown;
}

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "fd500a58-d499-4200-ad44-f27e21efb9fa",
    name: "Mosque Aisha",
    url: "https://www.mosqueaisha.ca/",
    timeZoneId: "America/Toronto",
    address: "5550 Stanley Ave, Niagara Falls, ON L2G 3X2, Canada",
    placeId: "ChIJ71IJHRVD04kRkL0WwWudsdA",
    geo: {
      latitude: 43.094015,
      longitude: -79.0848536,
    },
  },
  {
    uuid4: "ee50dc4b-837d-4bfa-a69e-be4b1e28fef8",
    name: "Mosque Aisha - Thorold",
    url: "https://www.mosqueaisha.ca/",
    timeZoneId: "America/Toronto",
    address: "70 St David St E, Thorold, ON L2V 4V4, Canada",
    placeId: "ChIJARSZy9db04kRLJMzroAk1V0",
    geo: {
      latitude: 43.1306057,
      longitude: -79.19527900000001,
    },
  },
];

const normalizeClock = (value: unknown): string => {
  if (typeof value !== "string") {
    return "";
  }

  const trimmed = value.trim();
  const shortClock = trimmed.match(/^(\d{1,2}:\d{2})(?::\d{2})?$/);
  if (shortClock?.[1]) {
    return shortClock[1];
  }

  return util.extractTimeAmPm(trimmed) || util.extractTime(trimmed) || "";
};

const findPrayer = (
  times: PrayerTime[],
  matcher: RegExp,
): PrayerTime | undefined =>
  times.find(
    (entry) => typeof entry.name === "string" && matcher.test(entry.name),
  );

const toLocationId = (
  locations: PrayerLocation[],
  nameFragment: string,
): number => {
  const location = locations.find(
    (entry) =>
      typeof entry.name === "string" &&
      entry.name.toLowerCase().includes(nameFragment),
  );
  const locationId = Number(location?.id);
  if (!Number.isInteger(locationId) || locationId <= 0) {
    throw new Error(`missing Mosque Aisha location for ${nameFragment}`);
  }
  return locationId;
};

const setLocationTimes = (
  record: (typeof ids)[number] | undefined,
  times: PrayerTime[],
): void => {
  if (!record) {
    throw new Error("missing Mosque Aisha record");
  }

  const fajr = normalizeClock(findPrayer(times, /^fajr$/i)?.time);
  const zuhr = normalizeClock(
    findPrayer(times, /^dhuhr$|^duhur$|^zuhr$/i)?.time,
  );
  const asr = normalizeClock(findPrayer(times, /^asr$/i)?.time);
  const maghribPrayer = findPrayer(times, /^maghrib$/i);
  const maghrib =
    normalizeClock(maghribPrayer?.start) || normalizeClock(maghribPrayer?.time);
  const isha = normalizeClock(findPrayer(times, /^isha$/i)?.time);

  if (!fajr || !zuhr || !asr || !maghrib || !isha) {
    throw new Error(`missing iqama times for ${record.name}`);
  }

  const jumaTimes = times
    .filter(
      (entry) =>
        entry.is_jummah === true ||
        (typeof entry.name === "string" &&
          /jumah|jummah|jumuah|juma/i.test(entry.name)),
    )
    .sort((a, b) => Number(a.jummah_order ?? 99) - Number(b.jummah_order ?? 99))
    .map((entry) => normalizeClock(entry.time))
    .filter((time): time is string => Boolean(time))
    .slice(0, 3);

  util.setIqamaTimes(record, [fajr, zuhr, asr, maghrib, isha]);
  util.setJumaTimes(record, jumaTimes);
};

const run: CrawlerModule["run"] = async () => {
  const locations = await util.loadJson<PrayerLocation[]>(
    "https://api.mosqueaisha.ca/mosque-api/prayerTimes/locations",
  );
  if (!Array.isArray(locations)) {
    throw new Error("unexpected Mosque Aisha locations response");
  }

  const niagaraId = toLocationId(locations, "stanley");
  const thoroldId = toLocationId(locations, "thorold");

  const [niagaraTimes, thoroldTimes] = await Promise.all([
    util.loadJson<PrayerTime[]>(
      `https://api.mosqueaisha.ca/mosque-api/prayerTimes/regular/${niagaraId}`,
    ),
    util.loadJson<PrayerTime[]>(
      `https://api.mosqueaisha.ca/mosque-api/prayerTimes/regular/${thoroldId}`,
    ),
  ]);

  if (!Array.isArray(niagaraTimes) || !Array.isArray(thoroldTimes)) {
    throw new Error("unexpected Mosque Aisha prayer times response");
  }

  setLocationTimes(ids[0], niagaraTimes);
  setLocationTimes(ids[1], thoroldTimes);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/ON/mosque-aisha-naigara",
  ids,
  run,
};
