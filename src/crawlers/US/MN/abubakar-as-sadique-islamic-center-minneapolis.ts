import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const FRIDAY_PRAYERS_URL = "https://abuubakar.org/friday-prayers/";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1563a69b-ca08-4ee8-90b8-75320349643d",
    name: "Abubakar As-Sadique Islamic Center",
    url: "http://abuubakar.org/",
    timeZoneId: "America/Chicago",
    address: "2824 13th Ave S, Minneapolis, MN 55407, USA",
    placeId: "ChIJ71OaigAo9ocR2JSrTMnjjFg",
    geo: {
      latitude: 44.9511111,
      longitude: -93.2566667,
    },
  },
];
const run = async () => {
  const $ = await util.load(FRIDAY_PRAYERS_URL);
  const jumaText =
    $(".et_pb_text_inner")
      .toArray()
      .map((element) => $(element).text().replace(/\s+/g, " ").trim())
      .find((text) => /sermon begins promptly/i.test(text)) ?? "";
  const jumaMatch = /\b(\d{1,2})(?::(\d{2}))?\s*([ap])\.?m\.?/i.exec(jumaText);
  if (!jumaMatch?.[1] || !jumaMatch[3]) {
    throw new Error("failed to parse friday prayer time");
  }
  const hour = jumaMatch[1];
  const minute = jumaMatch[2] ?? "00";
  const meridiem = `${jumaMatch[3].toUpperCase()}M`;

  // TODO: check for re-opening of daily salat
  // util.setIqamaTimes(ids[0], a)

  util.setJumaTimes(ids[0], [`${hour}:${minute} ${meridiem}`]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MN/abubakar-as-sadique-islamic-center-minneapolis",
  ids,
  run,
};
