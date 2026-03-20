const formatRuntimeError = (error: unknown): string =>
  error instanceof Error ? (error.stack ?? error.message) : String(error);

let runtimeGuardsInstalled = false;

const installRuntimeGuards = (): void => {
  if (runtimeGuardsInstalled) {
    return;
  }

  process.on("unhandledRejection", (reason: unknown) => {
    console.error(
      "suppressed unhandled rejection so crawler run can continue:\n%s",
      formatRuntimeError(reason),
    );
  });

  runtimeGuardsInstalled = true;
};

export const runMain = (main: () => Promise<void>, isMain: boolean): void => {
  if (!isMain) {
    return;
  }

  installRuntimeGuards();

  main().catch((error: unknown) => {
    console.error(formatRuntimeError(error));
    process.exit(1);
  });
};
