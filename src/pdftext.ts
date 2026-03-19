import { randomUUID } from "node:crypto";
import { rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { OfficeParser } from "officeparser";
import type { MasjidRecord } from "./types";
import * as util from "./util";

type PdfDateLineOptions = {
  monthFormat?: "%b" | "%B";
  anchored?: boolean;
  trailingPattern?: string;
};

export const loadPdfText = async (url: string): Promise<string> => {
  const response = await Bun.fetch(url);
  if (!response.ok) {
    throw new Error(`failed to load pdf: ${response.status} ${url}`);
  }

  const path = join(tmpdir(), `praytime-${randomUUID()}.pdf`);
  try {
    await Bun.write(path, await response.arrayBuffer());
    const ast = await OfficeParser.parseOffice(path, {
      extractAttachments: true,
      ocr: true,
    });
    return ast.toText();
  } finally {
    await rm(path, { force: true }).catch(() => undefined);
  }
};

export const findPdfDateLine = (
  text: string,
  record: MasjidRecord,
  options: PdfDateLineOptions = {},
): string | undefined => {
  const month = util.strftime(options.monthFormat ?? "%b", record);
  const day = String(Number.parseInt(util.strftime("%d", record), 10));
  const prefix = options.anchored ? "^" : "\\b";
  const suffix = options.trailingPattern
    ? `\\s+${options.trailingPattern}`
    : "\\b";
  const dayPattern = new RegExp(`${prefix}${month}\\s+${day}${suffix}`, "i");

  return text
    .split(/\r?\n/)
    .map(util.normalizeSpace)
    .find((line) => dayPattern.test(line));
};
