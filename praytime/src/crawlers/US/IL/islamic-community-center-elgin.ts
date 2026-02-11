import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

interface MasjidalResponse {
  status?: string;
  data?: {
    iqama?: {
      fajr?: string;
      zuhr?: string;
      asr?: string;
      maghrib?: string;
      isha?: string;
      jummah1?: string;
      jummah2?: string;
    };
  };
}

const ids = [
  {
    uuid4: "6de66ece-24de-45c7-861c-2b3227367e49",
    name: "Islamic Community Center",
    url: "http://www.iccelgin.com/",
    timeZoneId: "America/Chicago",
    address: "345 Heine Ave, Elgin, IL 60123, USA",
    placeId: "ChIJvXNTvzkFD4gR47PA2osOIPU",
    geo: {
      latitude: 42.0426692,
      longitude: -88.31287669999999,
    },
  },
];

const run: CrawlerModule["run"] = async () => {
  const primary = ids[0];
  if (!primary) {
    throw new Error("crawler ids is empty");
  }

  const data = await util.loadJson<MasjidalResponse>(
    "https://masjidal.com/api/v1/time?masjid_id=VGA6rAeq",
  );

  if (data.status === "success" && data.data?.iqama) {
    const iqama = data.data.iqama;
    util.setTimes(primary, [
      iqama.fajr,
      iqama.zuhr,
      iqama.asr,
      iqama.maghrib,
      iqama.isha,
      iqama.jummah1,
      iqama.jummah2,
    ]);
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/islamic-community-center-elgin",
  ids,
  run,
};
