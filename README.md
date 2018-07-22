# Praytime: Iqamah Time Aggregation Service

## about

Praytime aggregates masjid iqamah times primarily by scraping websites.

## motivation

> Abu Hurairah (رضي الله عنه) reported: The Messenger of Allah (ﷺ) said, “A man’s Salat in congregation is twenty-five times more rewarding than his Salat at home or in his shop, and that is because when he performs his Wudu’ properly and proceeds towards the mosque with the purpose of performing Salat in congregation, he does not take a step without being raised a degree (in rank) for it and having a sin remitted for it, till he enters the mosque. When he is performing Salat, the angels continue to invoke Blessings of Allah on him as long as he is in his place of worship in a state of Wudu’. They say: `O Allah! Have mercy on him! O Allah! Forgive him.’ He is deemed to be engaged in Salat as long as he waits for it.”

https://abdurrahman.org/2014/09/04/riyad-us-saliheen-imaam-nawawi-chapter-191/

## design

Prayer times are scraped on a nightly basis and saved in Firestore. In addition to prayer times, every masjid has lat/lng coordinates, timezone, and other metadata stored.

Web scraping is accomplished with [Apify crawlers](https://www.apify.com). A nightly cron job on an Apify actor clones this repo and executes a node.js script which runs each crawler and saves the results.

The UI is a static webapp which uses the client-side Firestore JavaScript library to query nearby prayer times.

### project layout

Each masjid has its own directory under [lib](lib).

## how to contribute

TODO

- npm install
- .env file
- uuid
- https://google-developers.appspot.com/maps/documentation/utils/geocoder/
  - address, lat/lng, placeid
- timezone
- date
- standardjs, editorconfig
- chrome dev tools
  - selector vs xpath
  - iframes
  - regexs

## roadmap

- mobile app
- notify when watched masjid times change
- calculate drive times and alert when its time to leave

