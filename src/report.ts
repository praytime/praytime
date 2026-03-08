import type { RunReport } from "./localdb";

type Align = "left" | "right";

interface TableColumn<Row> {
  align?: Align;
  header: string;
  value: (row: Row) => string;
}

const padCell = (value: string, width: number, align: Align): string => {
  if (value.length >= width) {
    return value;
  }

  const padding = " ".repeat(width - value.length);
  return align === "right" ? `${padding}${value}` : `${value}${padding}`;
};

const formatTable = <Row>(
  rows: Row[],
  columns: TableColumn<Row>[],
): string[] => {
  const widths = columns.map((column) => column.header.length);
  const renderedRows = rows.map((row) =>
    columns.map((column) => column.value(row)),
  );

  for (const cells of renderedRows) {
    for (let index = 0; index < cells.length; index += 1) {
      const cell = cells[index];
      if (!cell) {
        continue;
      }
      widths[index] = Math.max(widths[index] ?? 0, cell.length);
    }
  }

  const separator = `+${widths.map((width) => "-".repeat(width + 2)).join("+")}+`;
  const header = `|${columns
    .map(
      (column, index) =>
        ` ${padCell(column.header, widths[index] ?? 0, "left")} `,
    )
    .join("|")}|`;
  const body = renderedRows.map(
    (cells) =>
      `|${cells
        .map((cell, index) => {
          const align = columns[index]?.align ?? "left";
          return ` ${padCell(cell, widths[index] ?? 0, align)} `;
        })
        .join("|")}|`,
  );

  return [separator, header, separator, ...body, separator];
};

const yesNo = (value: boolean): string => (value ? "yes" : "no");

const truncate = (value: string, max: number): string => {
  if (value.length <= max) {
    return value;
  }

  return `${value.slice(0, max - 3)}...`;
};

export const formatRunReport = (report: RunReport): string => {
  const lines: string[] = [];

  lines.push(`Database: ${report.databasePath}`);
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push("");
  lines.push("Latest Session");

  if (report.latestSession) {
    lines.push(
      ...formatTable(
        [report.latestSession],
        [
          { align: "right", header: "ID", value: (row) => String(row.id) },
          { header: "Started", value: (row) => row.startedAt },
          {
            header: "Finished",
            value: (row) => row.finishedAt ?? "-",
          },
          { header: "Status", value: (row) => row.status },
          {
            align: "right",
            header: "Crawlers",
            value: (row) => String(row.crawlerCount),
          },
          {
            align: "right",
            header: "Errors",
            value: (row) => String(row.errorCount),
          },
          {
            align: "right",
            header: "Static",
            value: (row) => String(row.staticCount),
          },
          {
            align: "right",
            header: "NoChange",
            value: (row) => String(row.noChangeCount),
          },
          {
            align: "right",
            header: "Updated",
            value: (row) => String(row.timingsUpdatedCount),
          },
          { header: "Git", value: (row) => row.gitCommitHash },
          { header: "Dirty", value: (row) => yesNo(row.gitDirty) },
        ],
      ),
    );
  } else {
    lines.push("No sessions recorded.");
  }

  lines.push("");
  lines.push("Recent Sessions");

  if (report.recentSessions.length === 0) {
    lines.push("No recent sessions recorded.");
  } else {
    lines.push(
      ...formatTable(report.recentSessions, [
        { align: "right", header: "ID", value: (row) => String(row.id) },
        { header: "Started", value: (row) => row.startedAt },
        { header: "Status", value: (row) => row.status },
        {
          align: "right",
          header: "Errors",
          value: (row) => String(row.errorCount),
        },
        {
          align: "right",
          header: "Updated",
          value: (row) => String(row.timingsUpdatedCount),
        },
        { header: "Git", value: (row) => row.gitCommitHash },
      ]),
    );
  }

  lines.push("");
  lines.push("Crawler State");

  if (report.crawlers.length === 0) {
    lines.push("No crawler state recorded.");
  } else {
    lines.push(
      ...formatTable(report.crawlers, [
        { header: "Crawler", value: (row) => row.crawlerName },
        { header: "Status", value: (row) => row.lastStatus },
        { header: "LastRun", value: (row) => row.lastRunAt },
        {
          align: "right",
          header: "Records",
          value: (row) => String(row.lastRecordCount),
        },
        {
          align: "right",
          header: "Updated",
          value: (row) => String(row.lastUpdatedCount),
        },
        {
          align: "right",
          header: "NoChange",
          value: (row) => String(row.lastNoChangeCount),
        },
        {
          align: "right",
          header: "ConsecErr",
          value: (row) => String(row.consecutiveErrors),
        },
        { header: "Static", value: (row) => yesNo(row.isStatic) },
        { header: "Pptr", value: (row) => yesNo(row.isPuppeteer) },
        { header: "Skip", value: (row) => row.lastSkippedReason ?? "-" },
        {
          header: "Error",
          value: (row) => truncate(row.lastError || "-", 48),
        },
        { header: "Git", value: (row) => row.lastGitCommitHash },
      ]),
    );
  }

  return lines.join("\n");
};
