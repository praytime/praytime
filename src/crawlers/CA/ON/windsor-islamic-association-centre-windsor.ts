import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "8397d58c-9346-4872-b34c-f6e2c414fb04",
    name: "Windsor Islamic Association Centre",
    url: "https://windsorislamicassociation.com/",
    timeZoneId: "America/Toronto",
    address: "2555 McKay Ave, Windsor, ON N9E 2P4, Canada",
    placeId: "ChIJWxU-5TMsO4gRkrJOjkCryIU",
    geo: {
      latitude: 42.274404,
      longitude: -83.03125200000001,
    },
  },
];
const run = async () => {
  const id = ids[0];
  if (!id) {
    throw new Error("missing masjid record");
  }
  const $ = await util.load(id.url);

  const a = util
    .mapToText($, ".jamah")
    .map((value) => util.extractTimeAmPm(value))
    .filter((time): time is string => Boolean(time));
  const j = util
    .mapToText($, ".textwidget p > strong")
    .map((value) => util.extractTimeAmPm(value))
    .filter((time): time is string => Boolean(time))
    .slice(0, 1);

  util.setIqamaTimes(id, a);
  util.setJumaTimes(id, j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/ON/windsor-islamic-association-centre-windsor",
  ids,
  run,
};
