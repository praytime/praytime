import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "add881e6-e2f9-45f6-949b-0284e35d58c5",
    name: "Darul Islah",
    url: "http://www.darulislah.org/",
    timeZoneId: "America/New_York",
    address: "320 Fabry Terrace, Teaneck, NJ 07666, USA",
    placeId: "ChIJwyoBEDT3wokReMGrShy9IsE",
    geo: {
      latitude: 40.87159,
      longitude: -74.001451,
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

  const slide = $(".mySlides_new").first();
  if (slide.length === 0) {
    throw new Error("missing prayer timings slide");
  }

  slide.find("li").each((_, item) => {
    const label = $(item).find(".namze_name").text().trim().toLowerCase();
    if (!label) {
      return;
    }

    const iqamaText = $(item).find(".time_namze span").eq(1).text().trim();
    const iqama = util.extractTimeAmPm(iqamaText);

    if (label.includes("fajr")) {
      prayers.fajr = iqama;
    } else if (label.includes("dhuhr") || label.includes("zuhr")) {
      prayers.zuhr = iqama;
    } else if (label.includes("asr")) {
      prayers.asr = iqama;
    } else if (label.includes("maghrib")) {
      prayers.maghrib = iqama;
    } else if (label.includes("isha")) {
      prayers.isha = iqama;
    }
  });

  if (
    !prayers.fajr ||
    !prayers.zuhr ||
    !prayers.asr ||
    !prayers.maghrib ||
    !prayers.isha
  ) {
    throw new Error("incomplete prayer timings slide");
  }

  const jumaTimes = slide
    .find(".jamu-sec h1")
    .map((_, value) => util.extractTimeAmPm($(value).text().trim()))
    .toArray()
    .filter((time) => time.length > 0);

  util.setIqamaTimes(ids[0], [
    prayers.fajr,
    prayers.zuhr,
    prayers.asr,
    prayers.maghrib,
    prayers.isha,
  ]);
  util.setJumaTimes(ids[0], jumaTimes.length ? jumaTimes : ["check website"]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NJ/darul-islah-teaneck",
  ids,
  run,
};
