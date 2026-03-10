import { createPuppeteerRun } from "../../../ppt";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f2987bfe-fdce-4623-aa86-a18e675e723a",
    name: "Muslim Community Center of Apopka",
    url: "https://mccapopka.com/",
    timeZoneId: "America/New_York",
    address: "458 Oakland Ave, Apopka, FL 32703, USA",
    placeId: "ChIJGZQBXhB254gRSStaHIU24Qc",
    geo: {
      latitude: 28.6716829,
      longitude: -81.5033984,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/FL/tsentralna-dzhamiia-na-apopka-apopka",
  ids,
  run: createPuppeteerRun(ids, async (page) => {
    await page.goto(ids[0].url ?? "", { waitUntil: "networkidle0" });

    const iqamaTimes = await page.$$eval(".iqamah", (elements) =>
      elements.map((element) => element.textContent?.trim() ?? ""),
    );
    util.setIqamaTimes(ids[0], iqamaTimes);

    const jumaRows = await page.$$eval(".sunan", (elements) =>
      elements.map((element) => element.textContent?.trim() ?? ""),
    );
    util.setJumaTimes(
      ids[0],
      jumaRows
        .filter((text) => text.includes("Khuṭbah"))
        .map(util.extractTimeAmPm),
    );
  }),
  puppeteer: crawlerPuppeteer,
};
