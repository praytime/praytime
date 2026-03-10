export const runMain = (main: () => Promise<void>): void => {
  if (!import.meta.main) {
    return;
  }

  main().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    process.exit(1);
  });
};
