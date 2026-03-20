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
  props?: {
    pageProps?: {
      siteBuilderDataJSON?: {
        json?: {
          data?: {
            jummahSchedules?: Array<{
              date?: string;
              khutbahs?: Array<{
                prayerTime?: string;
              }>;
            }>;
            prayerTimesSchedules?: Array<{
              date?: string;
              fajr?: { commences?: string };
              dhuhr?: { commences?: string };
              asr?: { commences?: string };
              maghrib?: { commences?: string };
              isha?: { commences?: string };
            }>;
          };
        };
      };
    };
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
  const nextDataJson = $("#__NEXT_DATA__").html();
  if (!nextDataJson) {
    throw new Error("missing MasjidKit next data");
  }

  const pageData = JSON.parse(nextDataJson) as MasjidKitPageData;
  const schedules =
    pageData.props?.pageProps?.siteBuilderDataJSON?.json?.data
      ?.prayerTimesSchedules;
  if (!Array.isArray(schedules)) {
    throw new Error("missing MasjidKit prayer schedules");
  }

  const today = util.strftime("%Y-%m-%d", ids[0]);
  const todaySchedule = schedules.find((schedule) => schedule.date === today);
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

  const jummahSchedules =
    pageData.props?.pageProps?.siteBuilderDataJSON?.json?.data?.jummahSchedules;
  if (!Array.isArray(jummahSchedules)) {
    throw new Error("missing MasjidKit jummah schedules");
  }

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
