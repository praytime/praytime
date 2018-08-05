package praytime

import (
	"google.golang.org/genproto/googleapis/type/latlng"
	"time"
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
