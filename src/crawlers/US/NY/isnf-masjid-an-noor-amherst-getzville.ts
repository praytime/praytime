import type { CrawlerModule } from "../../../types";
import { createWnyMuslimsRun } from "../../../wnymuslims";

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

  await createWnyMuslimsRun([amherst], {
    cardTitle: "Masjid An-Nur",
    addressText: "745 Heim Road",
    jumaTimes: ["check website"],
  })();
  await createWnyMuslimsRun([buffalo], {
    cardTitle: "Masjid At-Taqwa",
    addressText: "40 Parker Avenue",
    jumaTimes: ["check website"],
  })();

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/isnf-masjid-an-noor-amherst-getzville",
  ids,
  run,
};
