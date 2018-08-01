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

Anybody can fork (make a copy of) this code repository, make changes, and submit those changes back to this repository.

### prerequisites

1. A unix environment (Linux, Mac osx, cygwin, etc)
2. [Node.js with npm](https://nodejs.org)
3. A [GitHub](https://github.com) account for contributing changes back to the project, not necessary to run and test locally
4. An [Apify](https://www.apify.com) account (it's free, email required)

This is the minimum needed to fork this repository and test crawlers locally.

### how to run a crawler

1. Fork, clone, or [download](https://github.com/praytime/praytime/archive/master.zip) this repo.
2. Run `npm install` from the `praytime` directory.
3. Create an .env file with the following two lines:
    ```
    APIFY_USER_ID=XXX
    APIFY_TOKEN=XXX
    ```
   and replace XXX with the values from your [Apify profile](https://my.apify.com/account#/integrations) page. These values should be kept secret.
4. Try running a crawler. Run the following command from the `praytime` dir:
    ```
    script/run.sh ./lib/islamic-center-of-naperville
    ```
    If all goes well, you should see output similar to this:
    ```
    starting ./lib/islamic-center-of-naperville
    {"uuid4":"d7c67298-6f4b-4694-a157-1ece31bc3294","crawlTime":"2018-07-26T02:31:21.696Z","name":"Islamic Center of Naperville","url":"https://islamiccenterofnaperville.org","address":"2844 West Ogden Ave, Naperville IL, 60540, USA","timeZoneId":"America/Chicago","placeId":"ChIJnw5viS74DogRlFBTHUQ89Dk","geo":{"latitude":41.753933,"longitude":-88.201616},"fajrIqama":"5:00 AM","zuhrIqama":"1:30 PM","asrIqama":"6:15 PM","maghribIqama":"8:23 PM","ishaIqama":"10:15 PM","juma1":"1:10 PM","juma2":"2:10 PM"}
    {"uuid4":"fefae38d-2e93-48fc-8bc2-6cb6f93a964e","crawlTime":"2018-07-26T02:31:21.696Z","name":"ICN Al-Hidayah","url":"https://islamiccenterofnaperville.org","address":"450 Olesen Dr, Naperville, IL 60540, USA","placeId":"ChIJiYkXUXJXDogRpL27TOZv-ao","timeZoneId":"America/Chicago","geo":{"latitude":41.768289,"longitude":-88.120149},"fajrIqama":"4:34 AM","zuhrIqama":"1:30 PM","asrIqama":"6:15 PM","maghribIqama":"8:23 PM","ishaIqama":"10:15 PM","juma1":"1:10 PM","juma2":"2:10 PM"}
    ```

### adding a new crawler

TODO

- uuid
- https://google-developers.appspot.com/maps/documentation/utils/geocoder/
  - address, lat/lng, placeid
- timezone - https://time.is/
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

## see also

https://github.com/praytime/praytime.app - praytime.app frontend
