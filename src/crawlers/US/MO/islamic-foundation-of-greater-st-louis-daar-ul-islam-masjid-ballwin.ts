import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "24e23e22-5290-48df-adf6-3aa3adc165d3",
    name: "Islamic Foundation of Greater St. Louis (Daar Ul-Islam Masjid)",
    url: "http://islamstl.org/",
    timeZoneId: "America/Chicago",
    address: "517 Weidman Rd, Ballwin, MO 63011, USA",
    placeId: "ChIJtyXiEK_T2IcRwJ_B3WzW0xY",
    geo: {
      latitude: 38.6031468,
      longitude: -90.4962504,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);
  const prayers = {
    asr: "",
    fajr: "",
    isha: "",
    maghrib: "",
    zuhr: "",
  };

  $(".et_pb_text_2 .cl-prayer-flex").each((_, row) => {
    const label = $(row).find("h4").first().text().trim().toLowerCase();
    const times = util.matchTimeAmPmG($(row).find("h6").first().text().trim());
    const iqamah = times?.at(-1) ?? "";

    if (!iqamah) {
      return;
    }
    if (label.includes("fajr")) {
      prayers.fajr = iqamah;
    } else if (label.includes("dhuhr") || label.includes("zuhr")) {
      prayers.zuhr = iqamah;
    } else if (label.includes("asr")) {
      prayers.asr = iqamah;
    } else if (label.includes("maghrib")) {
      prayers.maghrib = iqamah;
    } else if (label.includes("isha")) {
      prayers.isha = iqamah;
    }
  });

  const juma: string[] = [];
  $(".et_pb_text_5 .cl-prayer-flex h6").each((_, cell) => {
    const time = util.extractTimeAmPm($(cell).text().trim());
    if (time) {
      juma.push(time);
    }
  });

  if (
    !prayers.fajr ||
    !prayers.zuhr ||
    !prayers.asr ||
    !prayers.maghrib ||
    !prayers.isha
  ) {
    throw new Error("incomplete prayer iqamah table");
  }

  util.setIqamaTimes(ids[0], [
    prayers.fajr,
    prayers.zuhr,
    prayers.asr,
    prayers.maghrib,
    prayers.isha,
  ]);
  util.setJumaTimes(ids[0], juma);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MO/islamic-foundation-of-greater-st-louis-daar-ul-islam-masjid-ballwin",
  ids,
  run,
};
