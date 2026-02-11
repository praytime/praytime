export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface MasjidRecordBase {
  uuid4: string;
  name: string;
  timeZoneId: string;
  geo: GeoPoint;
  url?: string;
  address?: string;
  placeId?: string;
}

export interface MasjidRecordTimes {
  fajrIqama?: string;
  zuhrIqama?: string;
  asrIqama?: string;
  maghribIqama?: string;
  ishaIqama?: string;
  juma1?: string;
  juma2?: string;
  juma3?: string;
}

export type MasjidRecord = MasjidRecordBase &
  MasjidRecordTimes & {
    crawlTime?: Date;
    geohash?: string;
    [key: string]: unknown;
  };

export type CrawlerRun = () =>
  | Promise<MasjidRecord[] | undefined>
  | MasjidRecord[]
  | undefined;

export interface CrawlerModule {
  name: string;
  ids: MasjidRecord[];
  run?: CrawlerRun;
  puppeteer?: boolean;
}

export interface CrawlerRegistryEntry {
  name: string;
  sourcePath: string;
  crawler: CrawlerModule;
}

export interface CrawlOutputLine {
  result: MasjidRecord;
  error: string;
  source: string;
}

export interface RunnerOptions {
  skipStatic?: boolean;
  skipPuppeteer?: boolean;
  crawlerTimeoutMs?: number;
}

export interface DumpRecord {
  name: string;
  url?: string;
  geo: [number, number];
  geohash: string;
}

export interface CliOptions extends RunnerOptions {
  dump: boolean;
  list: boolean;
  help: boolean;
  patterns: string[];
}
