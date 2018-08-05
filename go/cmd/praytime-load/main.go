package main

import (
	"cloud.google.com/go/firestore"
	"encoding/json"
	"golang.org/x/net/context"
	//	"google.golang.org/api/iterator"
	"github.com/praytime/praytime/go/pkg/praytime"
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
