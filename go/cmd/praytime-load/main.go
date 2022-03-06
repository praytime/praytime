package main

import (
	"encoding/json"
	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/messaging"
	"github.com/praytime/praytime/go/pkg/praytime"
	"golang.org/x/net/context"
	//	"google.golang.org/api/iterator"
	// "fmt"
	"flag"
	"fmt"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"io"
	"log"
	"os"
	"strings"
)

func main() {

	force := flag.Bool("force", false, "ignore deletions and force save")
	verbose := flag.Bool("verbose", false, "enable verbose logging")
	flag.Parse()

	ctx := context.Background()

	// Sets your Google Cloud Platform project ID.
	projectID := os.Getenv("GCLOUD_PROJECT")

	log.Printf("projectID: %s\n", projectID)

	config := &firebase.Config{ProjectID: projectID}

	app, err := firebase.NewApp(ctx, config)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}

	messagingClient, err := app.Messaging(ctx)
	if err != nil {
		log.Fatalf("failed to create messaging client: %v\n", err)
	}

	// Get a Firestore client.
	dbClient, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalf("failed to create firestore client: %v\n", err)
	}

	// Close client when done.
	defer dbClient.Close()

	dec := json.NewDecoder(os.Stdin)

	for {
		var crawlResult praytime.CrawlResult
		updated := false

		if err := dec.Decode(&crawlResult); err != nil {
			if err != io.EOF {
				log.Printf("[ERROR] error parsing json: %v", err)
			}
			break
		}

		errPrefix := fmt.Sprintf("ERROR[%s]%s[%s] ", crawlResult.Source, crawlResult.Result.Name, crawlResult.Result.UUID4)

		if len(crawlResult.Error) > 0 {
			log.Print(errPrefix, "crawl error: ", crawlResult.Error)
			continue
		}

		v := crawlResult.Result
		v.NormalizeTimes()

		docName := v.UUID4

		evt := dbClient.Collection("Events").Doc(docName)

		currEvtSnapshot, err := evt.Get(ctx)
		if err != nil && status.Code(err) != codes.NotFound {
			log.Print(errPrefix, "getting prev value: ", err)
			continue
		}

		if currEvtSnapshot.Exists() {
			// check for changes
			var c praytime.PrayerEventSet
			currEvtSnapshot.DataTo(&c)
			if _, diff, err := v.CompareToPrevious(&c, *force); err != nil {
				log.Print(errPrefix, "diff: ", err)
				continue
			} else if len(diff) > 0 {
				// there were changes
				updated = true

				topic := "/topics/" + v.UUID4
				// TODO figure out why condition does not work
				message := &messaging.Message{
					Notification: &messaging.Notification{
						Title: v.Name,
						Body:  strings.Join(diff, ", "),
					},
					Topic: topic,
					// Condition: fmt.Sprintf("'%s' in topics || 'all' in topics", v.UUID4),
				}

				if response, err := messagingClient.Send(ctx, message); err != nil {
					log.Print(errPrefix, "sending message: ", err)
				} else if *verbose {
					// Response is a message ID string.
					log.Printf("Successfully sent message for %s[%s], response %s", v.Name, v.UUID4, response)
				}

				topic = "/topics/all"
				message = &messaging.Message{
					Notification: &messaging.Notification{
						Title: v.Name,
						Body:  strings.Join(diff, ", "),
					},
					Topic: topic,
				}

				if response, err := messagingClient.Send(ctx, message); err != nil {
					log.Print(errPrefix, "sending message (all): ", err)
				} else if *verbose {
					log.Printf("Successfully sent message for %s[%s], response %s", v.Name, v.UUID4, response)
				}
			}
		}

		if *verbose {
			log.Printf("Uploading: %+v", v)
		}

		if _, err = evt.Set(ctx, v); err != nil {
			log.Print(errPrefix, "setting new value: ", err)
		} else {
			log.Printf("set (updated: %v) %s[%s]\n", updated, v.Name, docName)
		}
	}
}
