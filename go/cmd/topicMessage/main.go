package main

import (
	firebase "firebase.google.com/go"
	"firebase.google.com/go/messaging"
	"golang.org/x/net/context"
	"log"
	"os"
)

func main() {
	if len(os.Args) != 2 {
		log.Fatalln("usage: " + os.Args[0] + " TOPIC")
	}
	topic := os.Args[1]

	// Obtain a messaging.Client from the App.
	projectID := os.Getenv("GCLOUD_PROJECT")
	config := &firebase.Config{ProjectID: projectID}
	ctx := context.Background()

	app, err := firebase.NewApp(ctx, config)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}

	messagingClient, err := app.Messaging(ctx)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}

	// See documentation on defining a message payload.
	message := &messaging.Message{
		Data: map[string]string{
			"score": "850",
			"time":  "2:45",
		},
		Topic: topic,
	}

	if response, err := messagingClient.Send(ctx, message); err != nil {
		log.Fatalln(err)
	} else {
		// Response is a message ID string.
		log.Println("Successfully sent message: " + response)
	}

}
