import { expect, test } from "bun:test";

import {
  type PlaceIdRefreshTarget,
  pickBestPlaceCandidate,
  syncGoogleMapsQueryPlaceIdsInSource,
  updateSourceTextPlaceIds,
} from "../src/placeids";

const target: PlaceIdRefreshTarget = {
  address: "4380 N. Elston Ave. Chicago, IL 60641, USA",
  crawlerName: "US/IL/mcc-chicago",
  geo: {
    latitude: 41.960308,
    longitude: -87.72896,
  },
  name: "Muslim Community Center",
  placeId: "old-place-id",
  sourcePath: "src/crawlers/US/IL/mcc-chicago.ts",
  uuid4: "64682fcc-46b2-4438-8a7c-381a23e5c1ef",
};

test("pickBestPlaceCandidate prefers the exact name and address match", () => {
  const match = pickBestPlaceCandidate(target, [
    {
      address: "123 Somewhere Else, Chicago, IL 60641, USA",
      geo: {
        latitude: 41.95,
        longitude: -87.72,
      },
      name: "Muslim Community Annex",
      placeId: "wrong-place-id",
    },
    {
      address: "4380 North Elston Avenue, Chicago, IL 60641, USA",
      geo: {
        latitude: 41.96031,
        longitude: -87.72895,
      },
      name: "Muslim Community Center",
      placeId: "new-place-id",
    },
  ]);

  expect(match?.candidate.placeId).toBe("new-place-id");
});

test("pickBestPlaceCandidate rejects ambiguous high-confidence matches", () => {
  const ambiguousTarget: PlaceIdRefreshTarget = {
    ...target,
    address: "100 Main St, Springfield, IL 62701, USA",
    geo: {
      latitude: 39.8017,
      longitude: -89.6436,
    },
    name: "Springfield Masjid",
  };

  const match = pickBestPlaceCandidate(ambiguousTarget, [
    {
      address: "100 Main Street, Springfield, IL 62701, USA",
      geo: {
        latitude: 39.80172,
        longitude: -89.64362,
      },
      name: "Springfield Masjid",
      placeId: "candidate-a",
    },
    {
      address: "100 Main Street, Springfield, IL 62701, USA",
      geo: {
        latitude: 39.80171,
        longitude: -89.64361,
      },
      name: "Springfield Masjid",
      placeId: "candidate-b",
    },
  ]);

  expect(match).toBeNull();
});

test("updateSourceTextPlaceIds rewrites only the targeted record literals", () => {
  const source = `const ids = [
  {
    uuid4: "first-uuid",
    name: "First",
    placeId: "old-one", // keep comment
    geo: {
      latitude: 1,
      longitude: 2,
    },
  },
  {
    placeId: 'old-two',
    uuid4: "second-uuid",
    name: "Second",
    geo: {
      latitude: 3,
      longitude: 4,
    },
  },
];`;

  const updated = updateSourceTextPlaceIds(source, [
    { placeId: "new-one", uuid4: "first-uuid" },
    { placeId: "new-two", uuid4: "second-uuid" },
  ]);

  expect(updated).toContain('placeId: "new-one", // keep comment');
  expect(updated).toContain("placeId: 'new-two'");
  expect(updated).not.toContain("old-one");
  expect(updated).not.toContain("old-two");
});

test("syncGoogleMapsQueryPlaceIdsInSource updates stale query_place_id params", () => {
  const source = `const ids = [
  {
    uuid4: "first-uuid",
    name: "First",
    url: "https://www.google.com/maps/search/?api=1&query=First&query_place_id=old-place-id",
    placeId: "new-place-id",
    geo: {
      latitude: 1,
      longitude: 2,
    },
  },
];`;

  const updated = syncGoogleMapsQueryPlaceIdsInSource(source);

  expect(updated).toContain("query_place_id=new-place-id");
  expect(updated).not.toContain("query_place_id=old-place-id");
});
