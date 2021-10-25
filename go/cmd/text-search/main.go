// does a google maps places text search with type=mosque and prints results that aren't found in lib

package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"time"

	"github.com/integralist/go-findroot/find"
	"github.com/joho/godotenv"
	"googlemaps.github.io/maps"
)

var libdir string

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

func isInLib(placeID string) bool {
	_, err := exec.Command("rg", "-l", placeID, libdir).Output()
	return err == nil
}

func main() {

	flag.Parse()

	loadDefaultEnvVars()

	gmapsClient := newGmapsClient()

	gitRoot := getGitRoot()
	libdir = filepath.Join(gitRoot, "lib")

	for _, arg := range flag.Args() {
		pageToken := ""
		moreResults := func() bool {
			return pageToken != ""
		}
		for ok := true; ok; ok = moreResults() { // do - while
			req := &maps.TextSearchRequest{
				Query:     arg,
				Radius:    50000,
				Type:      "mosque",
				PageToken: pageToken,
			}
			resp, err := gmapsClient.TextSearch(context.Background(), req)
			if err != nil {
				log.Fatal("Error creating text search request", err)
			}
			pageToken = resp.NextPageToken
			for _, result := range resp.Results {
				if isInLib(result.PlaceID) {
					continue
				}
				fmt.Printf("https://www.google.com/maps/search/?api=1&query=none&query_place_id=%s\t%s\t%s\n", result.PlaceID, result.PlaceID, result.Name)
			}
			if moreResults() {
				time.Sleep(2 * time.Second)
			}
		}
	}
}
