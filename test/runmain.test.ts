import { expect, test } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

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

test("runMain suppresses Bun early unhandled rejections so the process can continue", async () => {
  const tempDir = mkdtempSync(path.join(tmpdir(), "praytime-runmain-"));
  const scriptPath = path.join(tempDir, "unhandled-rejection.ts");
  const runMainUrl = pathToFileURL(
    path.join(process.cwd(), "src", "runmain.ts"),
  ).href;

  try {
    await Bun.write(
      scriptPath,
      `import { runMain } from ${JSON.stringify(runMainUrl)};

runMain(async () => {
  const pending = Promise.reject(new Error("boom"));
  await Bun.sleep(20);

  try {
    await Promise.all([pending]);
  } catch (error) {
    console.error(
      "caught later",
      error instanceof Error ? error.message : String(error),
    );
  }
}, true);
`,
    );

    const proc = Bun.spawnSync({
      cmd: [process.execPath, scriptPath],
      cwd: process.cwd(),
      stdout: "pipe",
      stderr: "pipe",
    });
    const stderr = new TextDecoder().decode(proc.stderr);

    expect(proc.exitCode).toBe(0);
    expect(stderr).toContain("suppressed unhandled rejection");
    expect(stderr).toContain("caught later boom");
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});
