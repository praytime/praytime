// does a google maps places text search with type=mosque and prints results
// that aren't found in src/crawlers

package main

import (
	"context"
	"errors"
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

var crawlersDir string

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

func isInCrawlers(placeID string) bool {
	err := exec.Command("rg", "-l", "--fixed-strings", placeID, crawlersDir).Run()
	if err == nil {
		return true
	}

	var exitErr *exec.ExitError
	if errors.As(err, &exitErr) && exitErr.ExitCode() == 1 {
		return false
	}

	log.Fatal("Error searching crawler files:", err)
	return false
}

func main() {
	allFlag := flag.Bool("all", false, "Include places that already exist in src/crawlers")

	flag.Parse()

	loadDefaultEnvVars()

	gmapsClient := newGmapsClient()

	gitRoot := getGitRoot()
	crawlersDir = filepath.Join(gitRoot, "src", "crawlers")

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
				if !*allFlag && isInCrawlers(result.PlaceID) {
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
