// Takes placeIDs, make gmaps API calls to resolve details and generate a crawler module based on a template.

package main

import (
	"context"
	"encoding/base64"
	"flag"
	"fmt"
	"log"
	"net/url"
	"os"
	"path/filepath"
	"text/template"

	"github.com/google/uuid"
	"github.com/gosimple/slug"
	"github.com/integralist/go-findroot/find"
	"github.com/joho/godotenv"
	"googlemaps.github.io/maps"
)

type Masjid struct {
	UUID        string
	TZ          *maps.TimezoneResult
	Details     *maps.PlaceDetailsResult
	IsStatic    bool
	IsPuppeteer bool
	IsMasjidal  bool
	IsAwqat     bool
}

const jsTemplate = `
{{- if not .IsStatic -}}
const util = require('../../../util')
{{- if .IsPuppeteer }}
const puppeteer = require('puppeteer')
exports.puppeteer = true
{{- end }}
{{- end }}

const ids = [
  {
    uuid4: '{{ js .UUID }}',
    name: '{{ js .Details.Name }}',
    url: '{{ js .Details.Website }}',
    timeZoneId: '{{ js .TZ.TimeZoneID }}',
    address: '{{ js .Details.FormattedAddress }}',
    placeId: '{{ js .Details.PlaceID }}',
    geo: {
      latitude: {{ .Details.Geometry.Location.Lat }},
      longitude: {{ .Details.Geometry.Location.Lng }}
    }
  }
]
{{- if not .IsStatic }}

exports.run = async () => {
{{- if .IsPuppeteer }}
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    await page.goto(ids[0].url, { waitUntil: 'networkidle0' })

    const a = await util.pptMapToText(page, '.item-qty')
    util.setIqamaTimes(ids[0], a)

    let j = await util.pptMapToText(page, 'h4 > strong')
    j = j.map(util.matchTimeAmPmG).shift()
    util.setJumaTimes(ids[0], j)
  } finally {
    await browser.close()
  }
{{- else if .IsMasjidal }}
  const data = await util.loadJson('https://masjidal.com/api/v1/time?masjid_id=')

  if (data.status === 'success') {
    const iqama = data.data.iqama
    util.setTimes(ids[0], [
      iqama.fajr,
      iqama.zuhr,
      iqama.asr,
      iqama.maghrib,
      iqama.isha,
      iqama.jummah1,
      iqama.jummah2
    ])
  }
{{- else if .IsAwqat }}
  const $ = await util.load('')

  $('tr:contains("Zawal")').remove()
  $('tr:contains("Sunrise")').remove()

  const a = util.mapToText($, '.prayer_entry:last-child')
  const j = util.mapToText($, '.prayer_entry:nth-child(2)').slice(5)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)
{{- else }}
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.jamah')
  const j = a.slice(-1).map(util.matchTimeG).shift()

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)
{{- end }}
  return ids
}
{{- end }}

exports.ids = ids`

func loadDefaultEnvVars() {
	if home, err := os.UserHomeDir(); err == nil {
		envFile := filepath.Join(home, ".godotenv")
		if stat, err := os.Stat(envFile); err == nil && !stat.IsDir() {
			if err = godotenv.Load(envFile); err != nil {
				log.Fatal("Error loading ", envFile, ":", err)
			}
		}
	}
}

func newGmapsClient() *maps.Client {
	c, err := maps.NewClient(maps.WithAPIKey(os.Getenv("GMAPS_API_KEY")))
	if err != nil {
		log.Fatal("Error creating gmaps client:", err)
	}
	return c
}

func getGitRoot() string {
	root, err := find.Repo()
	if err != nil {
		log.Fatal("Error looking for git root:", err)
	}
	return root.Path
}

func main() {

	t := template.Must(template.New("js").Parse(jsTemplate))

	stdoutFlag := flag.Bool("stdout", false, "Output to stdout instead of writing to file")
	staticFlag := flag.Bool("static", false, "Static, no crawler")
	puppeteerFlag := flag.Bool("ppt", false, "Use puppeteer")
	masjidalFlag := flag.Bool("masjidal", false, "Site uses masjidal")
	awqatFlag := flag.Bool("awqat", false, "Site uses awqat")
	gmapsUrlFlag := flag.Bool("gmapsUrl", false, "Use link to google maps instead of place details url")
	urlFlag := flag.String("url", "", "Override url to use for place details")

	flag.Parse()

	if *staticFlag && (*puppeteerFlag || *masjidalFlag || *awqatFlag) {
		log.Fatal("Cannot use both static and dynamic crawler")
	}

	loadDefaultEnvVars()

	gitRoot := getGitRoot()

	gmapsClient := newGmapsClient()

	detailsRequest := &maps.PlaceDetailsRequest{
		Fields: []maps.PlaceDetailsFieldMask{"name", "address_component", "formatted_address", "geometry/location", "website", "place_id"},
	}
	for _, arg := range flag.Args() {
		detailsRequest.PlaceID = arg
		details, err := gmapsClient.PlaceDetails(context.Background(), detailsRequest)
		if err != nil {
			log.Fatal("Error creating details request", err)
		}
		tzDetails, err := gmapsClient.Timezone(context.Background(), &maps.TimezoneRequest{
			Location: &details.Geometry.Location,
		})
		if err != nil {
			log.Fatal("Error creating timezone request", err)
		}

		var state, country, city, locality, sublocality, neighborhood, aal2, aal3 string
		for _, addrComp := range details.AddressComponents {
			for _, addrCompType := range addrComp.Types {
				switch addrCompType {
				case "administrative_area_level_1":
					state = addrComp.ShortName
				case "administrative_area_level_2":
					aal2 = addrComp.ShortName
				case "administrative_area_level_3":
					aal3 = addrComp.ShortName
				case "country":
					country = addrComp.ShortName
				case "locality":
					locality = addrComp.ShortName
				case "sublocality":
					sublocality = addrComp.ShortName
				case "neighborhood":
					neighborhood = addrComp.ShortName
				}
			}
		}

		if locality != "" {
			city = locality
		} else if sublocality != "" {
			city = sublocality
		} else if neighborhood != "" {
			city = neighborhood
		} else if aal3 != "" {
			city = aal3
		} else if aal2 != "" {
			city = aal2
		} else {
			log.Println("city not found, address components:", details.AddressComponents)
		}

		var f *os.File
		var destPath string
		if !*stdoutFlag {
			nameSlug := slug.Make(details.Name + " " + city)
			destDir := filepath.Join(gitRoot, "lib", country, state, nameSlug)
			destPath = filepath.Join(destDir, "index.js")

			if err = os.MkdirAll(destDir, os.ModePerm); err != nil {
				log.Fatal("Error creating destDir ", destDir, ": ", err)
			}

			f, err = os.Create(destPath)
			if err != nil {
				log.Fatal("Error creating destPath ", destPath, ": ", err)
			}
			defer f.Close()
		} else {
			f = os.Stdout
		}

		if *gmapsUrlFlag {
			v := url.Values{}
			v.Set("api", "1")
			v.Set("query", details.Name)
			v.Set("query_place_id", details.PlaceID)
			details.Website = "https://www.google.com/maps/search/?" + v.Encode()
		}

		if *urlFlag != "" {
			details.Website = *urlFlag
		}

		err = t.Execute(f, Masjid{
			uuid.New().String(),
			tzDetails,
			&details,
			*staticFlag,
			*puppeteerFlag,
			*masjidalFlag,
			*awqatFlag,
		})
		if err != nil {
			log.Fatal("Error executing template:", err)
		}

		if !*stdoutFlag {
			// osc copy path to clipboard
			// https://www.reddit.com/r/vim/comments/k1ydpn/a_guide_on_how_to_copy_text_from_anywhere/
			fmt.Print("\033]52;c;", base64.StdEncoding.EncodeToString([]byte(destPath)), "\a")
			log.Println(destPath, " written and copied to clipboard")
		}
	}
}
