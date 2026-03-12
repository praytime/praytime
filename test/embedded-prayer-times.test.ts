import { expect, test } from "bun:test";
import * as cheerio from "cheerio";

import { extractEmbeddedPrayerTimesFromHtml } from "../src/util";

test("extractEmbeddedPrayerTimesFromHtml parses DPT-style meta descriptions", () => {
  const html = `
    <html>
      <head>
        <meta
          name="description"
          content="Salah Times Fajr: 6:34 am 6:50 am Zuhr: 1:43 pm 2:00 pm Asr: 5:01 pm 6:00 pm Magrib: 7:36 pm 7:46 pm Isha: 8:41 pm 9:15 pm 1st Jumu'ah: 02:00 PM 02:25 PM 2nd Jumu'ah: 03:15 PM 03:40 PM"
        />
      </head>
      <body></body>
    </html>
  `;
  const $ = cheerio.load(html);

  expect(extractEmbeddedPrayerTimesFromHtml($, html)).toEqual({
    iqamaTimes: ["6:50 am", "2:00 pm", "6:00 pm", "7:46 pm", "9:15 pm"],
    jumaTimes: ["02:00 PM", "03:15 PM"],
  });
});

test("extractEmbeddedPrayerTimesFromHtml parses embedded prayer JSON", () => {
  const html = `
    <html>
      <body>
        <script>
          let prayerTimes = JSON.parse('{"fajr_i":"07:00:00","dahur_i":"02:15:00","asar_i":"17:30:00","magrib_i":"19:44:00","isha_i":"21:00:00"}');
          let jummahTimes = JSON.parse('{"adhan_time1":"13:30:00","adhan_time2":"14:30:00"}');
        </script>
      </body>
    </html>
  `;
  const $ = cheerio.load(html);

  expect(extractEmbeddedPrayerTimesFromHtml($, html)).toEqual({
    iqamaTimes: ["07:00", "02:15", "17:30", "19:44", "21:00"],
    jumaTimes: ["13:30", "14:30"],
  });
});
