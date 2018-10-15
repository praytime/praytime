package main

import (
	firebase "firebase.google.com/go"
	"firebase.google.com/go/messaging"
	"github.com/praytime/praytime/go/pkg/praytime"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"log"
	"os"
)

func main() {
	if len(os.Args) != 2 {
		log.Fatalln("usage: " + os.Args[0] + " USERID")
	}
	userID := os.Args[1]

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

	dbClient, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalf("Failed to create client: %v\n", err)
	}

	// Close client when done.
	defer dbClient.Close()

	// Get the user data
	var user praytime.User
	if userDoc, err := dbClient.Collection("Users").Doc(userID).Get(ctx); err != nil && grpc.Code(err) != codes.NotFound {
		log.Fatalf("error getting user %s: %v", userID, err)
	} else if !userDoc.Exists() {
		log.Fatalf("user %s does not exist", userID)
	} else if err = userDoc.DataTo(&user); err != nil {
		log.Fatalf("Error deserializing user %s: %v", userID, err)
	}

	// This registration token comes from the client FCM SDKs.

	for fcmToken := range user.FCMTokens {
		log.Println("Got token " + fcmToken)

		// See documentation on defining a message payload.
		message := &messaging.Message{
			Data: map[string]string{
				"score": "850",
				"time":  "2:45",
			},
			Token: fcmToken,
		}

		// Send a message to the device corresponding to the provided
		// registration token.

		if response, err := messagingClient.Send(ctx, message); err != nil {
			log.Fatalln(err)
		} else {
			// Response is a message ID string.
			log.Println("Successfully sent message: " + response)
		}
	}

}
