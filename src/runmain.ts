export const runMain = (main: () => Promise<void>, isMain: boolean): void => {
  if (!isMain) {
    return;
  }

  main().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    process.exit(1);
  });
};
