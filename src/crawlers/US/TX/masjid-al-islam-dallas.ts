import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "e15b52ff-5df0-48f0-938c-65066c8d9b00",
    name: "Masjid Al-Islam",
    url: "http://masjidalislam.org",
    timeZoneId: "America/Chicago",
    address: "2604 S Harwood St, Dallas, TX 75215, USA",
    geo: {
      latitude: 32.767267,
      longitude: -96.779057,
    },
    placeId: "ChIJy0rX1_CYToYRpBUJvsi-7fI",
  },
];

const run = async () => {
  const $ = await util.load("https://masjidalislam.org/prayer-times");
  const html = $.html();

  const iqamahBlock = html.match(
    /const iqamahTimes = \{([\s\S]*?)\n\s*\};/i,
  )?.[1];
  if (!iqamahBlock) {
    throw new Error("missing iqamahTimes block");
  }

  const iqamaByPrayer = new Map<util.StandardPrayerKey, string>();
  for (const match of iqamahBlock.matchAll(
    /(Fajr|Dhuhr|Asr|Maghrib|Isha)\s*:\s*"([^"]+)"/gi,
  )) {
    const key = util.getStandardPrayerKey(match[1] ?? "");
    const value = util.normalizeSpace(match[2] ?? "");
    if (!key || !value) {
      continue;
    }
    iqamaByPrayer.set(key, value);
  }

  util.setIqamaTimes(
    ids[0],
    util.requireStandardPrayerTimes(
      iqamaByPrayer,
      "missing Masjid Al-Islam iqama times",
    ),
  );

  const jumaTime =
    util.extractTimeAmPm(
      html.match(/<td>Jumu'?ah<\/td>\s*<td>\$\{\("([^"]+)"\)\}<\/td>/i)?.[1],
    ) ||
    util.extractTimeAmPm(
      html.match(/JUMU'?AH\s+SALAT\s*@\s*([0-9:\sAPMapm]+)/i)?.[1],
    );
  if (!jumaTime) {
    throw new Error("missing Masjid Al-Islam jumuah time");
  }

  util.setJumaTimes(ids[0], [jumaTime]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/masjid-al-islam-dallas",
  ids,
  run,
};
