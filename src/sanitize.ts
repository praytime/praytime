import type { MasjidRecord, MasjidRecordTimes } from "./types";
import { validateCrawlRecord } from "./validation";

const validationFields = [
  "fajrIqama",
  "zuhrIqama",
  "asrIqama",
  "maghribIqama",
  "ishaIqama",
  "juma1",
  "juma2",
  "juma3",
] as const satisfies ReadonlyArray<keyof MasjidRecordTimes>;

const validationFieldSet = new Set<string>(validationFields);

const extractValidationField = (
  error: string,
): (typeof validationFields)[number] | null => {
  const field = error.split(" ", 1)[0] ?? "";
  return validationFieldSet.has(field)
    ? (field as (typeof validationFields)[number])
    : null;
};

export const replaceInvalidFieldsWithCheckWebsite = (
  record: MasjidRecord,
): (typeof validationFields)[number][] => {
  const updated = new Set<(typeof validationFields)[number]>();

  while (true) {
    const nextFields = Array.from(
      new Set(
        validateCrawlRecord(record)
          .errors.map(extractValidationField)
          .filter(
            (field): field is (typeof validationFields)[number] =>
              field !== null && !updated.has(field),
          ),
      ),
    );

    if (nextFields.length === 0) {
      break;
    }

    for (const field of nextFields) {
      record[field] = "check website";
      updated.add(field);
    }
  }

  return validationFields.filter((field) => updated.has(field));
};
