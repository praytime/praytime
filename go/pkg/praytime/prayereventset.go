package praytime

import (
	"errors"
	"google.golang.org/genproto/googleapis/type/latlng"
	"html"
	"time"
)

// PrayerEventSet - a daily set of prayer times in a single location
type PrayerEventSet struct {
	Name                 string         `json:"name" firestore:"name"`
	URL                  string         `json:"url,omitempty" firestore:"url,omitempty"`
	Address              string         `json:"address,omitempty" firestore:"address,omitempty"`
	Geo                  *latlng.LatLng `json:"geo" firestore:"geo"`
	Geohash              string         `json:"geohash" firestore:"geohash"`
	UUID4                string         `json:"uuid4" firestore:"uuid4"`
	CrawlTime            time.Time      `json:"crawlTime" firestore:"crawlTime"`
	TimeZoneID           string         `json:"timeZoneId" firestore:"timeZoneId"`
	PlaceID              string         `json:"placeId" firestore:"placeId"`
	FajrIqama            string         `json:"fajrIqama,omitempty" firestore:"fajrIqama,omitempty"`
	FajrIqamaModified    time.Time      `json:"fajrIqamaModified,omitempty" firestore:"fajrIqamaModified,omitempty"`
	ZuhrIqama            string         `json:"zuhrIqama,omitempty" firestore:"zuhrIqama,omitempty"`
	ZuhrIqamaModified    time.Time      `json:"zuhrIqamaModified,omitempty" firestore:"zuhrIqamaModified,omitempty"`
	AsrIqama             string         `json:"asrIqama,omitempty" firestore:"asrIqama,omitempty"`
	AsrIqamaModified     time.Time      `json:"asrIqamaModified,omitempty" firestore:"asrIqamaModified,omitempty"`
	MaghribIqama         string         `json:"maghribIqama,omitempty" firestore:"maghribIqama,omitempty"`
	MaghribIqamaModified time.Time      `json:"maghribIqamaModified,omitempty" firestore:"maghribIqamaModified,omitempty"`
	IshaIqama            string         `json:"ishaIqama,omitempty" firestore:"ishaIqama,omitempty"`
	IshaIqamaModified    time.Time      `json:"ishaIqamaModified,omitempty" firestore:"ishaIqamaModified,omitempty"`
	Juma1                string         `json:"juma1,omitempty" firestore:"juma1,omitempty"`
	Juma1Modified        time.Time      `json:"juma1Modified,omitempty" firestore:"juma1Modified,omitempty"`
	Juma2                string         `json:"juma2,omitempty" firestore:"juma2,omitempty"`
	Juma2Modified        time.Time      `json:"juma2Modified,omitempty" firestore:"juma2Modified,omitempty"`
	Juma3                string         `json:"juma3,omitempty" firestore:"juma3,omitempty"`
	Juma3Modified        time.Time      `json:"juma3Modified,omitempty" firestore:"juma3Modified,omitempty"`
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

// ignore changes in time less than minutes
func ignoreModification(curr, prev string, minutes uint) bool {
	prevMin, err := HourMinutesToMinutes(curr)
	if err != nil {
		return false
	}
	currMin, err := HourMinutesToMinutes(prev)
	if err != nil {
		return false
	}

	return Abs(prevMin-currMin) < minutes
}

// CompareToPrevious flags changed times and updates Modified timestamps
func (p *PrayerEventSet) CompareToPrevious(prev *PrayerEventSet) (*PrayerEventSet, []string, error) {
	diff := make([]string, 0, 10)

	if p.FajrIqama != prev.FajrIqama && !ignoreModification(p.FajrIqama, prev.FajrIqama, 4) {
		if p.FajrIqama == "" {
			return nil, nil, errors.New("Fajr is deleted")
		}
		p.FajrIqamaModified = time.Now()
		diff = append(diff, "Fajr: "+p.FajrIqama)
	} else {
		p.FajrIqamaModified = prev.FajrIqamaModified
	}

	if p.ZuhrIqama != prev.ZuhrIqama && !ignoreModification(p.ZuhrIqama, prev.ZuhrIqama, 4) {
		if p.ZuhrIqama == "" {
			return nil, nil, errors.New("Zuhr is deleted")
		}
		p.ZuhrIqamaModified = time.Now()
		diff = append(diff, "Zuhr: "+p.ZuhrIqama)
	} else {
		p.ZuhrIqamaModified = prev.ZuhrIqamaModified
	}

	if p.AsrIqama != prev.AsrIqama && !ignoreModification(p.AsrIqama, prev.AsrIqama, 4) {
		if p.AsrIqama == "" {
			return nil, nil, errors.New("Asr is deleted")
		}
		p.AsrIqamaModified = time.Now()
		diff = append(diff, "Asr: "+p.AsrIqama)
	} else {
		p.AsrIqamaModified = prev.AsrIqamaModified
	}

	if p.MaghribIqama != prev.MaghribIqama && !ignoreModification(p.MaghribIqama, prev.MaghribIqama, 4) {
		if p.MaghribIqama == "" {
			return nil, nil, errors.New("Maghrib is deleted")
		}
		p.MaghribIqamaModified = time.Now()
		diff = append(diff, "Maghrib: "+p.MaghribIqama)
	} else {
		p.MaghribIqamaModified = prev.MaghribIqamaModified
	}

	if p.IshaIqama != prev.IshaIqama && !ignoreModification(p.IshaIqama, prev.IshaIqama, 4) {
		if p.IshaIqama == "" {
			return nil, nil, errors.New("Isha is deleted")
		}
		p.IshaIqamaModified = time.Now()
		diff = append(diff, "Isha: "+p.IshaIqama)
	} else {
		p.IshaIqamaModified = prev.IshaIqamaModified
	}

	if p.Juma1 != prev.Juma1 && !ignoreModification(p.Juma1, prev.Juma1, 4) {
		if p.Juma1 == "" {
			return nil, nil, errors.New("Juma1 is deleted")
		}
		p.Juma1Modified = time.Now()
		diff = append(diff, "Juma: "+p.Juma1)
	} else {
		p.Juma1Modified = prev.Juma1Modified
	}

	if p.Juma2 != prev.Juma2 && !ignoreModification(p.Juma2, prev.Juma2, 4) {
		if p.Juma2 == "" {
			return nil, nil, errors.New("Juma2 is deleted")
		}
		p.Juma2Modified = time.Now()
		diff = append(diff, "Juma: "+p.Juma2)
	} else {
		p.Juma2Modified = prev.Juma2Modified
	}

	if p.Juma3 != prev.Juma3 && !ignoreModification(p.Juma3, prev.Juma3, 4) {
		if p.Juma3 == "" {
			return nil, nil, errors.New("Juma3 is deleted")
		}
		p.Juma3Modified = time.Now()
		diff = append(diff, "Juma: "+p.Juma3)
	} else {
		p.Juma3Modified = prev.Juma3Modified
	}
	return p, diff, nil
}
