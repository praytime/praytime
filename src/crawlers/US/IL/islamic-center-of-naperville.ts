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
      jummah3?: string;
    };
  };
}

const ids = [
  {
    uuid4: "d7c67298-6f4b-4694-a157-1ece31bc3294",
    name: "Islamic Center of Naperville (Ogden)",
    url: "http://islamiccenterofnaperville.org",
    address: "2844 West Ogden Ave, Naperville IL, 60540, USA",
    timeZoneId: "America/Chicago",
    placeId: "ChIJnw5viS74DogRlFBTHUQ89Dk",
    geo: {
      latitude: 41.753933,
      longitude: -88.201616,
    },
  },
  {
    uuid4: "fefae38d-2e93-48fc-8bc2-6cb6f93a964e",
    name: "Islamic Center of Naperville (Olesen)",
    url: "http://islamiccenterofnaperville.org",
    address: "450 Olesen Dr, Naperville, IL 60540, USA",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.768289,
      longitude: -88.120149,
    },
    placeId: "ChIJiYkXUXJXDogRpL27TOZv-ao",
  },
  {
    uuid4: "68651d83-7b84-4440-902f-e43bc95c46c8",
    name: "Islamic Center of Naperville (75th St)",
    url: "http://islamiccenterofnaperville.org",
    timeZoneId: "America/Chicago",
    address: "25W530 75th St, Naperville, IL 60565, USA",
    geo: {
      latitude: 41.749155,
      longitude: -88.121487,
    },
    placeId: "ChIJV0Yh3QpXDogRFGdLiBCkVfo",
  },
  {
    uuid4: "c6121c98-d917-455d-8f25-50b2fa5ee136",
    name: "Islamic Center of Naperville (248th St)",
    url: "http://islamiccenterofnaperville.org",
    timeZoneId: "America/Chicago",
    address: "3540 248th Ave, Naperville, IL 60564, USA",
    geo: {
      latitude: 41.70128,
      longitude: -88.223042,
    },
    placeId: "ChIJXzlvkA1XDogRU_798w06fu4",
  },
];

const run: CrawlerModule["run"] = async () => {
  const responses = await Promise.all([
    util.loadJson<MasjidalResponse>(
      "https://masjidal.com/api/v1/time?masjid_id=pQKMn3LB",
    ),
    util.loadJson<MasjidalResponse>(
      "https://masjidal.com/api/v1/time?masjid_id=y0LboaAo",
    ),
    util.loadJson<MasjidalResponse>(
      "https://masjidal.com/api/v1/time?masjid_id=BYADpxAN",
    ),
    util.loadJson<MasjidalResponse>(
      "https://masjidal.com/api/v1/time?masjid_id=JAmlb9LR",
    ),
  ]);

  responses.forEach((response, index) => {
    if (response.status !== "success") {
      return;
    }

    const target = ids[index];
    const iqama = response.data?.iqama;
    if (!target || !iqama) {
      return;
    }

    util.setIqamaTimes(target, [
      iqama.fajr,
      iqama.zuhr,
      iqama.asr,
      iqama.maghrib,
      iqama.isha,
    ]);
    util.setJumaTimes(target, [iqama.jummah1, iqama.jummah2, iqama.jummah3]);
  });

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/islamic-center-of-naperville",
  ids,
  run,
};
