import { expect, test } from "bun:test";
import { runMain } from "../src/runmain";

test("runMain executes main when caller is main", async () => {
  let calls = 0;

  runMain(async () => {
    calls += 1;
  }, true);

  await Promise.resolve();

  expect(calls).toBe(1);
});

test("runMain skips main when caller is not main", async () => {
  let calls = 0;

  runMain(async () => {
    calls += 1;
  }, false);

  await Promise.resolve();

  expect(calls).toBe(0);
});
