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
)

// PrayerEventSet - a daily set of prayer times in a single location
type PrayerEventSet struct {
	Name         string         `json:"name" firestore:"name"`
	URL          string         `json:"url,omitempty" firestore:"url,omitempty"`
	Address      string         `json:"address,omitempty" firestore:"address,omitempty"`
	Geo          *latlng.LatLng `json:"geo" firestore:"geo"`
	UUID4        string         `json:"uuid4" firestore:"uuid4"`
	CrawlTime    time.Time      `json:"crawlTime" firestore:"crawlTime"`
	TimeZoneID   string         `json:"timeZoneId" firestore:"timeZoneId"`
	PlaceID      string         `json:"placeId" firestore:"placeId"`
	FajrIqama    string         `json:"fajrIqama,omitempty" firestore:"fajrIqama,omitempty"`
	ZuhrIqama    string         `json:"zuhrIqama,omitempty" firestore:"zuhrIqama,omitempty"`
	AsrIqama     string         `json:"asrIqama,omitempty" firestore:"asrIqama,omitempty"`
	MaghribIqama string         `json:"maghribIqama,omitempty" firestore:"maghribIqama,omitempty"`
	IshaIqama    string         `json:"ishaIqama,omitempty" firestore:"ishaIqama,omitempty"`
	Juma1        string         `json:"juma1,omitempty" firestore:"juma1,omitempty"`
	Juma2        string         `json:"juma2,omitempty" firestore:"juma2,omitempty"`
	Juma3        string         `json:"juma3,omitempty" firestore:"juma3,omitempty"`
}

func main() {

	ctx := context.Background()

	// Sets your Google Cloud Platform project ID.
	projectID := os.Getenv("GCLOUD_PROJECT")

	log.Printf("projectID: %s\n", projectID)

	// Get a Firestore client.
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

		if _, err = evt.Set(ctx, v); err != nil {
			log.Printf("[ERROR] Failed setting %s[%s]: %v", v.Name, docName, err)
		} else {
			log.Printf("set %s[%s]\n", v.Name, docName)
		}
	}
}
