import path from "node:path";

const scriptDir = path.dirname(import.meta.path);
const praytimeDir = path.resolve(scriptDir, "..");
const repoDir = path.resolve(praytimeDir, "..");
const libDir = path.join(repoDir, "lib");
const targetRoot = path.join(praytimeDir, "src", "crawlers");

interface TransformResult {
  body: string;
  importLines: string[];
  hasRun: boolean;
  hasCrawlerPuppeteer: boolean;
}

const toPosixPath = (value: string): string => value.replaceAll(path.sep, "/");

const addImport = (imports: Set<string>, line: string): void => {
  imports.add(line);
};

const transformSource = (source: string): TransformResult => {
  const imports = new Set<string>();
  const outLines: string[] = [];

  for (const line of source.split("\n")) {
    const requireMatch = line.match(
      /^\s*const\s+(.+?)\s*=\s*require\((['"])(.+?)\2\)(\.default)?\s*;?\s*$/,
    );

    if (requireMatch) {
      const lhs = requireMatch[1]?.trim() ?? "";
      const moduleId = requireMatch[3] ?? "";
      const defaultSuffix = requireMatch[4] === ".default";

      if (moduleId === "../../../util") {
        addImport(imports, `import * as ${lhs} from "../../../util";`);
        continue;
      }

      if (moduleId === "axios") {
        if (lhs.startsWith("{")) {
          addImport(imports, `import ${lhs} from "axios";`);
        } else {
          addImport(imports, `import ${lhs} from "axios";`);
        }
        continue;
      }

      if (moduleId === "cheerio") {
        addImport(imports, `import * as ${lhs} from "cheerio";`);
        continue;
      }

      if (moduleId === "puppeteer") {
        addImport(imports, `import ${lhs} from "puppeteer";`);
        continue;
      }

      if (moduleId === "timezone") {
        addImport(imports, `import ${lhs} from "timezone";`);
        continue;
      }

      if (moduleId === "https") {
        addImport(imports, `import * as ${lhs} from "node:https";`);
        continue;
      }

      if (moduleId === "csv-parse/sync") {
        addImport(imports, `import ${lhs} from "csv-parse/sync";`);
        continue;
      }

      if (defaultSuffix) {
        // Already handled for known modules. Keep the line for unknown modules.
        outLines.push(line.replace(/\.default\s*;?\s*$/, ";"));
        continue;
      }
    }

    outLines.push(line);
  }

  let body = outLines.join("\n");

  if (/require\((['"])timezone\/America\1\)/.test(body)) {
    addImport(imports, 'import timezoneAmerica from "timezone/America";');
    body = body.replaceAll(
      /require\((['"])timezone\/America\1\)/g,
      "timezoneAmerica",
    );
  }

  body = body
    .replaceAll(/^\s*exports\.ids\s*=\s*ids\s*;?\s*$/gm, "")
    .replaceAll(/^\s*exports\.run\s*=\s*/gm, "const run = ")
    .replaceAll(
      /^\s*exports\.puppeteer\s*=\s*true\s*;?\s*$/gm,
      "const crawlerPuppeteer = true;",
    )
    .replaceAll(/\n{3,}/g, "\n\n")
    .trimEnd();

  const hasRun = /(^|\n)const\s+run\s*=\s*/.test(body);
  const hasCrawlerPuppeteer =
    /(^|\n)const\s+crawlerPuppeteer\s*=\s*true\s*;?\s*$/m.test(body);

  const importLines = [...imports].sort((a, b) => a.localeCompare(b));

  return {
    body,
    importLines,
    hasRun,
    hasCrawlerPuppeteer,
  };
};

const main = async (): Promise<void> => {
  const glob = new Bun.Glob("*/*/*/index.js");
  let total = 0;
  let created = 0;
  let skipped = 0;

  for await (const relativePath of glob.scan({ cwd: libDir })) {
    total += 1;

    const canonical = toPosixPath(relativePath).replace(/\/index\.js$/, "");
    const targetPath = path.join(targetRoot, `${canonical}.ts`);

    if (await Bun.file(targetPath).exists()) {
      skipped += 1;
      continue;
    }

    const sourcePath = path.join(libDir, relativePath);
    const source = await Bun.file(sourcePath).text();
    const transformed = transformSource(source);

    const lines: string[] = [];
    lines.push("// @ts-nocheck");
    lines.push('import type { CrawlerModule } from "../../../types";');

    if (transformed.importLines.length > 0) {
      lines.push(...transformed.importLines);
    }

    lines.push("");
    lines.push(transformed.body);
    lines.push("");

    const exportFields: string[] = [`  name: "${canonical}",`, "  ids,"];

    if (transformed.hasRun) {
      exportFields.push("  run,");
    }

    if (transformed.hasCrawlerPuppeteer) {
      exportFields.push("  puppeteer: crawlerPuppeteer,");
    }

    lines.push("export const crawler: CrawlerModule = {");
    lines.push(...exportFields);
    lines.push("};");
    lines.push("");

    await Bun.write(targetPath, `${lines.join("\n")}`);
    created += 1;
  }

  console.log(`total:${total} created:${created} skipped:${skipped}`);
};

await main();
