import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "2e57224c-16ae-4b4d-90db-475e20a2e687",
    name: "Masjid At-Taqwa",
    url: "https://taqwabrooklyn.org/",
    timeZoneId: "America/New_York",
    address: "1188 Fulton St, Brooklyn, NY 11216, USA",
    placeId: "ChIJywK230BbwokRol74mugarhc",
    geo: {
      latitude: 40.6805556,
      longitude: -73.9536111,
    },
  },
];
type MasjidKitPageData = {
  jummahSchedules?: MasjidKitJummahSchedule[];
  jummahTimes?: MasjidKitJummahSchedule[];
  prayerTimes?: MasjidKitPrayerSchedule[];
  props?: {
    pageProps?: {
      siteBuilderDataJSON?: {
        json?: {
          data?: {
            jummahSchedules?: MasjidKitJummahSchedule[];
            prayerTimesSchedules?: MasjidKitPrayerSchedule[];
          };
        };
      };
    };
  };
};

type MasjidKitJummahSchedule = {
  date?: string;
  khutbahs?: Array<{
    prayerTime?: string;
  }>;
};

type MasjidKitPrayerSchedule = {
  date?: string;
  fajr?: { commences?: string };
  dhuhr?: { commences?: string };
  asr?: { commences?: string };
  maghrib?: { commences?: string };
  isha?: { commences?: string };
};

const pageDataSchedules = (
  pageData: MasjidKitPageData,
): {
  jummahSchedules: NonNullable<MasjidKitPageData["jummahSchedules"]>;
  prayerTimes: NonNullable<MasjidKitPageData["prayerTimes"]>;
} => {
  const directPrayerTimes = pageData.prayerTimes;
  const directJummahSchedules =
    pageData.jummahTimes ?? pageData.jummahSchedules;
  if (
    Array.isArray(directPrayerTimes) &&
    Array.isArray(directJummahSchedules)
  ) {
    return {
      jummahSchedules: directJummahSchedules,
      prayerTimes: directPrayerTimes,
    };
  }

  const nestedData = pageData.props?.pageProps?.siteBuilderDataJSON?.json?.data;
  const prayerTimes = nestedData?.prayerTimesSchedules;
  const jummahSchedules = nestedData?.jummahSchedules;
  if (!Array.isArray(prayerTimes) || !Array.isArray(jummahSchedules)) {
    throw new Error("missing MasjidKit schedules");
  }

  return {
    jummahSchedules,
    prayerTimes,
  };
};

const formatMasjidKitTime = (
  value: string | undefined,
  timeZoneId: string,
): string => {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: timeZoneId,
  }).format(new Date(value));
};

const run = async () => {
  const $ = await util.load(ids[0].url ?? "");
  const dataJson = $("#__DATA__").html() ?? $("#__NEXT_DATA__").html();
  if (!dataJson) {
    throw new Error("missing MasjidKit page data");
  }

  const pageData = JSON.parse(dataJson) as MasjidKitPageData;
  const { prayerTimes, jummahSchedules } = pageDataSchedules(pageData);

  const today = util.strftime("%Y-%m-%d", ids[0]);
  const todaySchedule = prayerTimes.find((schedule) => schedule.date === today);
  if (!todaySchedule) {
    throw new Error(`missing MasjidKit prayer schedule for ${today}`);
  }

  util.setIqamaTimes(ids[0], [
    formatMasjidKitTime(todaySchedule.fajr?.commences, ids[0].timeZoneId),
    formatMasjidKitTime(todaySchedule.dhuhr?.commences, ids[0].timeZoneId),
    formatMasjidKitTime(todaySchedule.asr?.commences, ids[0].timeZoneId),
    formatMasjidKitTime(todaySchedule.maghrib?.commences, ids[0].timeZoneId),
    formatMasjidKitTime(todaySchedule.isha?.commences, ids[0].timeZoneId),
  ]);

  const nextJummah = jummahSchedules.find(
    (schedule) => typeof schedule.date === "string" && schedule.date >= today,
  );
  if (!nextJummah) {
    throw new Error("missing upcoming MasjidKit jummah schedule");
  }

  util.setJumaTimes(
    ids[0],
    (nextJummah.khutbahs ?? [])
      .map((khutbah) =>
        formatMasjidKitTime(khutbah.prayerTime, ids[0].timeZoneId),
      )
      .filter(Boolean),
  );

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/masjid-at-taqwa",
  ids,
  run,
};
