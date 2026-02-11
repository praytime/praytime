// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "d0389f5e-56b7-4f45-9774-52417c8bfe82",
    name: "ISNF Masjid An-Noor, Amherst",
    url: "http://www.isnf.org/",
    timeZoneId: "America/New_York",
    address: "745 Heim Rd, Getzville, NY 14068, USA",
    placeId: "ChIJVeMpXLR204kRiP0fTErThCM",
    geo: {
      latitude: 43.020452,
      longitude: -78.743926,
    },
  },
  {
    uuid4: "722ba2d3-cb85-4245-8fa2-7a72382103e5",
    name: "Masjid Taqwa",
    url: "http://isnf.org/",
    timeZoneId: "America/New_York",
    address: "40 Parker Ave, Buffalo, NY 14214, USA",
    placeId: "ChIJBdgDn1Vt04kRPRzAwcFRdBw",
    geo: {
      latitude: 42.940434,
      longitude: -78.8394265,
    },
  },
];
const run = async () => {
  const $ = await util.load("https://www.isnf.org/prayer-and-iqama-times");

  // 'p.font_5': 'Jumuah Time', 'Dhuhr Time', 'Maghreb Time', 'Fajr Time', 'Asr Time', 'Isha Time'
  const aa = [
    util.mapToText(
      $,
      "p",
      $('p.font_5:contains("Fajr")').closest("div").next(),
    ),
    util.mapToText(
      $,
      "p",
      $('p.font_5:contains("Dhuhr")').closest("div").next(),
    ),
    util.mapToText($, "p", $('p.font_5:contains("Asr")').closest("div").next()),
    util.mapToText(
      $,
      "p",
      $('p.font_5:contains("Maghreb")').closest("div").next(),
    ),
    util.mapToText(
      $,
      "p",
      $('p.font_5:contains("Isha")').closest("div").next(),
    ),
    util.mapToText(
      $,
      "p",
      $('p.font_5:contains("Jumuah")').closest("div").next(),
    ),
  ].flat();
  // [
  //   [
  //     "Masjid Al Noor: 6:15 AM",
  //     "Masjid Al Taqwa: 6:30 AM"
  //   ],
  //   [
  //     "Masjid Al Noor: 1:35 PM",
  //     "Masjid Al Taqwa: 1:15 PM"
  //   ],
  //   [
  //     "Masjid Al Noor: 3:15 PM",
  //     "Masjid Al Taqwa: 3:15 PM"
  //   ],
  //   [
  //     "Masjid Al Noor: Sunset",
  //     "Masjid Al Taqwa: Sunset"
  //   ],
  //   [
  //     "Masjid Al Noor: 8:00 PM",
  //     "Masjid Al Taqwa: 7:00 PM"
  //   ],
  //   [
  //     "Both Masajid hold jumuah at 1:30 pm"
  //   ]
  // ]

  util.setIqamaTimes(
    ids[0],
    aa.filter((a) => a.match(/Noor/)).map(util.extractTimeAmPm),
  );
  util.setIqamaTimes(
    ids[1],
    aa.filter((a) => a.match(/Taqwa/)).map(util.extractTimeAmPm),
  );

  util.setJumaTimes(
    ids[0],
    aa.filter((a) => a.match(/jumuah/)).map(util.extractTimeAmPm),
  );

  util.setJumaTimes(
    ids[1],
    aa.filter((a) => a.match(/both.*jumuah/i)).map(util.extractTimeAmPm),
  );

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/isnf-masjid-an-noor-amherst-getzville",
  ids,
  run,
};
