package main

import (
	"cloud.google.com/go/firestore"
	"encoding/json"
	// "fmt"
	"golang.org/x/net/context"
	"google.golang.org/genproto/googleapis/type/latlng"
	"io"
	"log"
	"os"
	"time"
	//	"google.golang.org/api/iterator"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
)

// PrayerEventSet - a daily set of prayer times in a single location
type PrayerEventSet struct {
	Name             string         `json:"name" firestore:"name"`
	URL              string         `json:"url,omitempty" firestore:"url,omitempty"`
	Address          string         `json:"address,omitempty" firestore:"address,omitempty"`
	Geo              *latlng.LatLng `json:"geo" firestore:"geo"`
	UUID4            string         `json:"uuid4" firestore:"uuid4"`
	CrawlTime        time.Time      `json:"crawlTime" firestore:"crawlTime"`
	TimeZoneID       string         `json:"timeZoneId" firestore:"timeZoneId"`
	PlaceID          string         `json:"placeId" firestore:"placeId"`
	FajrIqama        string         `json:"fajrIqama,omitempty" firestore:"fajrIqama,omitempty"`
	ZuhrIqama        string         `json:"zuhrIqama,omitempty" firestore:"zuhrIqama,omitempty"`
	AsrIqama         string         `json:"asrIqama,omitempty" firestore:"asrIqama,omitempty"`
	MaghribIqama     string         `json:"maghribIqama,omitempty" firestore:"maghribIqama,omitempty"`
	IshaIqama        string         `json:"ishaIqama,omitempty" firestore:"ishaIqama,omitempty"`
	Juma1            string         `json:"juma1,omitempty" firestore:"juma1,omitempty"`
	Juma2            string         `json:"juma2,omitempty" firestore:"juma2,omitempty"`
	Juma3            string         `json:"juma3,omitempty" firestore:"juma3,omitempty"`
	PrevFajrIqama    string         `json:"prevFajrIqama,omitempty" firestore:"prevFajrIqama,omitempty"`
	PrevZuhrIqama    string         `json:"prevZuhrIqama,omitempty" firestore:"prevZuhrIqama,omitempty"`
	PrevAsrIqama     string         `json:"prevAsrIqama,omitempty" firestore:"prevAsrIqama,omitempty"`
	PrevMaghribIqama string         `json:"prevMaghribIqama,omitempty" firestore:"prevMaghribIqama,omitempty"`
	PrevIshaIqama    string         `json:"prevIshaIqama,omitempty" firestore:"prevIshaIqama,omitempty"`
	PrevJuma1        string         `json:"prevJuma1,omitempty" firestore:"prevJuma1,omitempty"`
	PrevJuma2        string         `json:"prevJuma2,omitempty" firestore:"prevJuma2,omitempty"`
	PrevJuma3        string         `json:"prevJuma3,omitempty" firestore:"prevJuma3,omitempty"`
}

func main() {

	// Sets your Google Cloud Platform project ID.
	projectID := os.Getenv("GCLOUD_PROJECT")

	// Get a Firestore client.
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, projectID)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	// Close client when done.
	defer client.Close()

	dec := json.NewDecoder(os.Stdin)

	for {
		var v PrayerEventSet

		if err := dec.Decode(&v); err != nil {
			if err != io.EOF {
				log.Printf("[ERROR] error parsing json: %v", err)
			}
			break
		}
		log.Printf("Uploading: %+v", v)

		docName := v.UUID4

		evt := client.Collection("Events").Doc(docName)

		currEvtSnapshot, err := evt.Get(ctx)
		if err != nil && grpc.Code(err) != codes.NotFound {
			log.Printf("[ERROR] error getting prev value of %s[%s]: %v", v.Name, docName, err)
			continue
		}

		if currEvtSnapshot.Exists() {
			// check for changes
			var c PrayerEventSet
			currEvtSnapshot.DataTo(&c)
			if v.FajrIqama != c.FajrIqama {
				v.PrevFajrIqama = c.FajrIqama
			}
			if v.ZuhrIqama != c.ZuhrIqama {
				v.PrevZuhrIqama = c.ZuhrIqama
			}
			if v.AsrIqama != c.AsrIqama {
				v.PrevAsrIqama = c.AsrIqama
			}
			if v.MaghribIqama != c.MaghribIqama {
				v.PrevMaghribIqama = c.MaghribIqama
			}
			if v.IshaIqama != c.IshaIqama {
				v.PrevIshaIqama = c.IshaIqama
			}
			if v.Juma1 != c.Juma1 {
				v.PrevJuma1 = c.Juma1
			}
			if v.Juma2 != c.Juma2 {
				v.PrevJuma2 = c.Juma2
			}
			if v.Juma3 != c.Juma3 {
				v.PrevJuma3 = c.Juma3
			}
		}

		if _, err = evt.Set(ctx, v); err != nil {
			log.Printf("[ERROR] Failed setting %s[%s]: %v", v.Name, docName, err)
			continue
		} else {
			log.Printf("set %s[%s]\n", v.Name, docName)
		}
	}
}
