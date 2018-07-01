// Copyright 2017 Google Inc. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

// Sample firestore_quickstart demonstrates how to connect to Firestore, and add and list documents.
package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
	"time"

	"google.golang.org/genproto/googleapis/type/latlng"
)

// PrayerEventSet - a daily set of prayer times in a single location
type PrayerEventSet struct {
	Name         string         `json:"name" firestore:"name"`
	URL          string         `json:"url,omitempty" firestore:"url,omitempty"`
	Address      string         `json:"address,omitempty" firestore:"address,omitempty"`
	Geo          *latlng.LatLng `json:"geo" firestore:"geo"`
	CrawlTime    time.Time      `json:"crawlTime" firestore:"crawlTime"`
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

	var v PrayerEventSet

	dec := json.NewDecoder(os.Stdin)

	for {
		err := dec.Decode(&v)
		if err == io.EOF {
			return
		}
		if err != nil {
			log.Println(err)
			return
		}
		fmt.Printf("%+v\n", v)
	}
}
