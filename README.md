# Praytime: Iqamah Time Aggregation Service

## about

Praytime aggregates masjid iqamah times primarily by scraping websites.

## motivation

> Abu Hurairah (رضي الله عنه) reported: The Messenger of Allah (ﷺ) said, “A man’s Salat in congregation is twenty-five times more rewarding than his Salat at home or in his shop, and that is because when he performs his Wudu’ properly and proceeds towards the mosque with the purpose of performing Salat in congregation, he does not take a step without being raised a degree (in rank) for it and having a sin remitted for it, till he enters the mosque. When he is performing Salat, the angels continue to invoke Blessings of Allah on him as long as he is in his place of worship in a state of Wudu’. They say: 'O Allah! Have mercy on him! O Allah! Forgive him.' He is deemed to be engaged in Salat as long as he waits for it.”

https://abdurrahman.org/2014/09/04/riyad-us-saliheen-imaam-nawawi-chapter-191/

## design

Prayer times are scraped on a nightly basis and saved in Firestore. In addition to prayer times, every masjid has lat/lng coordinates, timezone, and other metadata stored.

Web scraping is accomplished primarily with [Cheerio](https://cheerio.js.org/) if no client-side scripts are required to render the prayer times, otherwise [Puppeteer](https://pptr.dev/) is used.

The UI is a static webapp which uses the client-side Firestore JavaScript library to query nearby prayer times.

### project layout

Each masjid has its own directory under [lib](lib).

## how to contribute

Anybody can fork (make a copy of) this code repository, make changes, and submit those changes back to this repository.

### prerequisites

1. A unix environment (Linux, Mac osx, cygwin, etc)
2. [Node.js with npm](https://nodejs.org)
3. A [GitHub](https://github.com) account for contributing changes back to the project, not necessary to run and test locally

This is the minimum needed to fork this repository and test crawlers locally.

### how to run a crawler

1. Fork, clone, or [download](https://github.com/praytime/praytime/archive/master.zip) this repo.
2. Run `npm install` from the `praytime` directory.
3. Try running a crawler. Run the following command from the `praytime` dir:
    ```
    script/run.sh ./lib/US/IL/islamic-center-of-naperville
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
- https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/utils/geocoder/
  - address:
    ```
    copy(document.evaluate('//*[@id="result-0"]/table/tbody/tr/td[2]/p[2]/strong/following-sibling::text()[1]', document, null, XPathResult.STRING_TYPE, null).stringValue.trim())
    ```
  - lat/lng:
    ```
    copy(document.evaluate('//*[@id="result-0"]/table/tbody/tr/td[2]/p[3]/strong/following-sibling::text()[1]', document, null, XPathResult.STRING_TYPE, null).stringValue.match(/[\-\d.]+,[\-\d.]+/)[0])
    ```
  - placeid
    ```
    copy(document.evaluate('//*[@id="details-result-0"]/p[3]/a', document, null, XPathResult.STRING_TYPE, null).stringValue.trim())
    ```
  - all in one:
    ```
    copy({
      address: document.evaluate('//*[@id="result-0"]/table/tbody/tr/td[2]/p[2]/strong/following-sibling::text()[1]', document, null, XPathResult.STRING_TYPE, null).stringValue.trim(),
      geo: {
        latitude: Number(document.evaluate('//*[@id="result-0"]/table/tbody/tr/td[2]/p[3]/strong/following-sibling::text()[1]', document, null, XPathResult.STRING_TYPE, null).stringValue.match(/[-\d.]+,[-\d.]+/)[0].split(',')[0]),
        longitude: Number(document.evaluate('//*[@id="result-0"]/table/tbody/tr/td[2]/p[3]/strong/following-sibling::text()[1]', document, null, XPathResult.STRING_TYPE, null).stringValue.match(/[-\d.]+,[-\d.]+/)[0].split(',')[1])
      },
      placeId: document.evaluate('//*[@id="details-result-0"]/p[3]/a', document, null, XPathResult.STRING_TYPE, null).stringValue.trim()
    })
    ```
- timezone - https://time.is/
- date
- standardjs, editorconfig
- chrome dev tools
  - selector vs xpath
  - iframes
  - regexs
- document common masjid website mistakes
  - no address on website
- examples
  - [masjidal](lib/US/IL/aie-huntley/index.js)
  - [mohid](lib/US/TX/islamic-center-of-frisco/index.js)
  - [masjidapps](lib/US/TX/valley-ranch-islamic-center/index.js)
  - axios / cheerio
    - selector based: [mcc-silver-springs](lib/US/MD/mcc-silver-springs/index.js)
      - explanation of selector syntax: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors#Combinators
    - element text matching:
      - [maps redmond](lib/US/WA/maps-redmond/index.js)
      - [dar al hijrah](lib/US/VA/dar-al-hijrah-va/index.js)

### running praytime-load

1. install golang, make a symlink ~/go/src/github.com/praytime/praytime to root of this repo
2. `go get github.com/praytime/praytime/go/cmd/praytime-load`
3. Add following vars to .env:
```
GOOGLE_APPLICATION_CREDENTIALS=...
GCLOUD_PROJECT=...
```
4. Should be able to run now:
```
./script/run.sh | ./script/save.sh
```

## roadmap

- mobile app
- notify when watched masjid times change
- calculate drive times and alert when its time to leave

## see also

https://github.com/praytime/praytime.app - praytime.app frontend
