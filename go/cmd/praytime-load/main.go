package main

import (
	"cloud.google.com/go/firestore"
	"encoding/json"
	"golang.org/x/net/context"
	//	"google.golang.org/api/iterator"
	"github.com/praytime/praytime/go/pkg/praytime"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"io"
	"log"
	"os"
)

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
		var v praytime.PrayerEventSet

		if err := dec.Decode(&v); err != nil {
			if err != io.EOF {
				log.Printf("[ERROR] error parsing json: %v", err)
			}
			break
		}

		v.NormalizeTimes()

		docName := v.UUID4

		evt := client.Collection("Events").Doc(docName)

		currEvtSnapshot, err := evt.Get(ctx)
		if err != nil && grpc.Code(err) != codes.NotFound {
			log.Printf("[ERROR] error getting prev value of %s[%s]: %v", v.Name, docName, err)
			continue
		}

		if currEvtSnapshot.Exists() {
			// check for changes
			var c praytime.PrayerEventSet
			currEvtSnapshot.DataTo(&c)
			if _, err = v.CompareToPrevious(&c); err != nil {
				log.Printf("[ERROR] error processing %s: %v", v.Name, err)
				continue
			}
		}

		log.Printf("Uploading: %+v", v)

		if _, err = evt.Set(ctx, v); err != nil {
			log.Printf("[ERROR] Failed setting %s[%s]: %v", v.Name, docName, err)
		} else {
			log.Printf("set %s[%s]\n", v.Name, docName)
		}
	}
}
