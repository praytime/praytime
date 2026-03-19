import { createMasjidalRun } from "../../../masjidal";
import { findPdfDateLine, loadPdfText } from "../../../pdftext";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const AMHERST_RAMADAN_PDF_URL =
  "https://isnfwny.org/s/ISNF-Masjid-An-Noor-2026-Ramadan-Schedule-4lrx.pdf";
const BUFFALO_RAMADAN_PDF_URL =
  "https://isnfwny.org/s/ISNF-Masjid-At-Taqwa-2026-Ramadan-Schedule.pdf";

const ramadanIqamaTimes = (line: string): string[] => {
  const times =
    [...(line.match(/\d{1,2}:\d{2}\s*[AP]M/gi) ?? [])]
      .map(util.extractTimeAmPm)
      .filter((value): value is string => Boolean(value)) ?? [];

  if (times.length < 8) {
    throw new Error("unexpected ISNF Ramadan row format");
  }

  const fajr = times[1];
  const zuhr = times[2];
  const asr = times[4];
  const maghrib = times[5];
  const isha = times[7];
  if (!fajr || !zuhr || !asr || !maghrib || !isha) {
    throw new Error("missing ISNF Ramadan iqama values");
  }

  return [
    fajr,
    zuhr,
    // The flyer lists both Shafi'i and Hanafi Asr entries instead of one
    // iqama, so keep the later published Asr slot for the single record.
    asr,
    maghrib,
    isha,
  ];
};

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "d0389f5e-56b7-4f45-9774-52417c8bfe82",
    name: "ISNF Masjid An-Noor, Amherst",
    url: "https://isnfwny.org/",
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
    url: "https://isnfwny.org/",
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
  const [amherst, buffalo] = ids;
  if (!amherst || !buffalo) {
    throw new Error("missing ISNF masjid records");
  }

  await createMasjidalRun([amherst] as CrawlerModule["ids"], "1XAlZzKb", {
    jumaMode: "setJumaTimes",
  })();
  await createMasjidalRun([buffalo] as CrawlerModule["ids"], "p8KXgNdM", {
    jumaMode: "setJumaTimes",
  })();

  const amherstPdfText = await loadPdfText(AMHERST_RAMADAN_PDF_URL);
  const amherstRow = findPdfDateLine(amherstPdfText, amherst);
  if (amherstRow) {
    util.setIqamaTimes(amherst, ramadanIqamaTimes(amherstRow));
  }

  const buffaloPdfText = await loadPdfText(BUFFALO_RAMADAN_PDF_URL);
  const buffaloRow = findPdfDateLine(buffaloPdfText, buffalo);
  if (buffaloRow) {
    util.setIqamaTimes(buffalo, ramadanIqamaTimes(buffaloRow));
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/isnf-masjid-an-noor-amherst-getzville",
  ids,
  run,
};
