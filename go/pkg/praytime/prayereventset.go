package praytime

import (
	"google.golang.org/genproto/googleapis/type/latlng"
	"html"
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

// NormalizeTimes normalizes prayer times into HH:MMm
func (p *PrayerEventSet) NormalizeTimes() *PrayerEventSet {
	var r []string

	r = NormalizeTime(p.FajrIqama, Fajr)
	if len(r) == 1 {
		p.FajrIqama = r[0]
	} else {
		p.FajrIqama = html.EscapeString(p.FajrIqama)
	}

	r = NormalizeTime(p.ZuhrIqama, Zuhr)
	if len(r) == 1 {
		p.ZuhrIqama = r[0]
	} else {
		p.ZuhrIqama = html.EscapeString(p.ZuhrIqama)
	}

	r = NormalizeTime(p.AsrIqama, Asr)
	if len(r) == 1 {
		p.AsrIqama = r[0]
	} else {
		p.AsrIqama = html.EscapeString(p.AsrIqama)
	}

	r = NormalizeTime(p.MaghribIqama, Maghrib)
	if len(r) == 1 {
		p.MaghribIqama = r[0]
	} else {
		p.MaghribIqama = html.EscapeString(p.MaghribIqama)
	}

	r = NormalizeTime(p.IshaIqama, Isha)
	if len(r) == 1 {
		p.IshaIqama = r[0]
	} else {
		p.IshaIqama = html.EscapeString(p.IshaIqama)
	}

	r = NormalizeTime(p.Juma1, Zuhr)
	if len(r) == 1 {
		p.Juma1 = r[0]
	} else {
		p.Juma1 = html.EscapeString(p.Juma1)
	}

	r = NormalizeTime(p.Juma2, Zuhr)
	if len(r) == 1 {
		p.Juma2 = r[0]
	} else {
		p.Juma2 = html.EscapeString(p.Juma2)
	}

	r = NormalizeTime(p.Juma3, Zuhr)
	if len(r) == 1 {
		p.Juma3 = r[0]
	} else {
		p.Juma3 = html.EscapeString(p.Juma3)
	}

	return p
}
