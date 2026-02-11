import { expect, test } from "bun:test";

import * as util from "../src/util";

test("hourMinuteAmPmToMinutes handles noon and midnight correctly", () => {
  expect(util.hourMinuteAmPmToMinutes("12:00 AM")).toBe(0);
  expect(util.hourMinuteAmPmToMinutes("12:00 PM")).toBe(720);
  expect(util.hourMinuteAmPmToMinutes("1:00 PM")).toBe(780);
  expect(util.hourMinuteAmPmToMinutes("11:59 PM")).toBe(1439);
});

test("hourMinuteAmPmToMinutes supports compact and lowercase inputs", () => {
  expect(util.hourMinuteAmPmToMinutes("6:03AM")).toBe(363);
  expect(util.hourMinuteAmPmToMinutes("6:03am")).toBe(363);
  expect(util.hourMinuteAmPmToMinutes(" 6 : 03 p.m. ")).toBe(1083);
});

test("hourMinuteAmPmToMinutes rejects invalid inputs", () => {
  expect(() => util.hourMinuteAmPmToMinutes("sunset")).toThrow(
    /invalid time format/,
  );
  expect(() => util.hourMinuteAmPmToMinutes("13:00 PM")).toThrow(
    /invalid time value/,
  );
  expect(() => util.hourMinuteAmPmToMinutes("0:00 AM")).toThrow(
    /invalid time value/,
  );
});

test("minutesTohourMinute normalizes day boundaries", () => {
  expect(util.minutesTohourMinute(0)).toBe("0:00");
  expect(util.minutesTohourMinute(1439)).toBe("23:59");
  expect(util.minutesTohourMinute(1440)).toBe("0:00");
  expect(util.minutesTohourMinute(-1)).toBe("23:59");
});

test("minuteOffsetFromText handles optional spaces and signs", () => {
  expect(util.minuteOffsetFromText("+10")).toBe(10);
  expect(util.minuteOffsetFromText("+ 10")).toBe(10);
  expect(util.minuteOffsetFromText("  - 7  ")).toBe(-7);
  expect(() => util.minuteOffsetFromText("sunset")).toThrow(
    /invalid minute offset/,
  );
});
