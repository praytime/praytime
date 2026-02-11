declare module "timezone" {
  type TimezoneFn = (timestamp: number, tzName: string, fmt: string) => string;
  type TimezoneFactory = (zoneData: unknown) => TimezoneFn;
  const tz: TimezoneFactory;
  export default tz;
}

declare module "timezone/America" {
  const zoneData: unknown;
  export default zoneData;
}
