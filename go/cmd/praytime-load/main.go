package main

import (
	"encoding/json"
	firebase "firebase.google.com/go"
	"firebase.google.com/go/messaging"
	"github.com/praytime/praytime/go/pkg/praytime"
	"golang.org/x/net/context"
	//	"google.golang.org/api/iterator"
	// "fmt"
	"flag"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"io"
	"log"
	"os"
	"strings"
)

func main() {

	force := flag.Bool("force", false, "ignore deletions and force save")
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
		var v praytime.PrayerEventSet

		if err := dec.Decode(&v); err != nil {
			if err != io.EOF {
				log.Printf("[ERROR] error parsing json: %v", err)
			}
			break
		}

		v.NormalizeTimes()

		docName := v.UUID4

		evt := dbClient.Collection("Events").Doc(docName)

		currEvtSnapshot, err := evt.Get(ctx)
		if err != nil && grpc.Code(err) != codes.NotFound {
			log.Printf("[ERROR] error getting prev value of %s[%s]: %v", v.Name, docName, err)
			continue
		}

		if currEvtSnapshot.Exists() {
			// check for changes
			var c praytime.PrayerEventSet
			currEvtSnapshot.DataTo(&c)
			if _, diff, err := v.CompareToPrevious(&c, *force); err != nil {
				log.Printf("[ERROR] error processing %s: %v", v.Name, err)
				continue
			} else if len(diff) > 0 {
				// there were changes

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
					log.Printf("[ERROR] error sending message for %s: %v", v.Name, err)
				} else {
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
					log.Printf("[ERROR] error sending message for %s: %v", v.Name, err)
				} else {
					log.Printf("Successfully sent message for %s[%s], response %s", v.Name, v.UUID4, response)
				}
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
