// Takes placeIDs, make gmaps API calls to resolve details and generate a crawler module based on a template.

package main

import (
	"context"
	"encoding/base64"
	"flag"
	"fmt"
	"log"
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
	UUID      string
	TZ        *maps.TimezoneResult
	Details   *maps.PlaceDetailsResult
	IsCrawler bool
}

const jsTemplate = `{{ if .IsCrawler }}
const util = require('../../../util')
{{ end }}
const ids = [
  {
    uuid4: '{{ .UUID }}',
    name: '{{ .Details.Name }}',
    url: '{{ .Details.Website }}',
    timeZoneId: '{{ .TZ.TimeZoneID }}',
    address: '{{ .Details.FormattedAddress }}',
    placeId: '{{ .Details.PlaceID }}',
    geo: {
      latitude: {{ .Details.Geometry.Location.Lat }},
      longitude: {{ .Details.Geometry.Location.Lng }}
    }
  }
]
{{ if .IsCrawler }}
exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'div#prayer-times div.prayer-row > div:last-child')
  const j = a[a.length - 1].match(/\d+\s*:\s*\d+\s*\w+/g)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}
{{ end }}
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

	stdoutFlag := flag.Bool("stdout", false, "output to stdout instead of writing to file")
	crawlerFlag := flag.Bool("crawler", true, "use crawler template")

	flag.Parse()

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

		err = t.Execute(f, Masjid{
			uuid.New().String(),
			tzDetails,
			&details,
			*crawlerFlag,
		})
		if err != nil {
			log.Fatal("Error executing template:", err)
		}

		if !*stdoutFlag {
			// osc copy path to clipboard
			// https://www.reddit.com/r/vim/comments/k1ydpn/a_guide_on_how_to_copy_text_from_anywhere/
			fmt.Println("\033]52;c;", base64.StdEncoding.EncodeToString([]byte(destPath)), "\a")
			log.Println(destPath, " written and copied to clipboard")
		}
	}
}
