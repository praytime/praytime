// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "e5c52521-8b04-4337-a46f-a6e2eb7861cf",
    name: "Albanian Islamic Center of Michigan",
    url: "https://www.aicod.org/",
    timeZoneId: "America/Detroit",
    address: "19775 Harper Ave, Harper Woods, MI 48225, USA",
    placeId: "ChIJ0-VWIDzWJIgR6unAGQLlA8M",
    geo: {
      latitude: 42.4341753,
      longitude: -82.923125,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/albanian-islamic-center-of-michigan-harper-woods",
  ids,
};
