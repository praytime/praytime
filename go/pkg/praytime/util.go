package praytime

import (
	"errors"
	"fmt"
	"regexp"
)

// Prayer is enum of 5 prayers
type Prayer int

// Prayer types
const ( // iota is reset to 0
	Fajr Prayer = iota
	Zuhr
	Asr
	Maghrib
	Isha
)

var extractHourMinute = regexp.MustCompile(`(\d{1,2})\s*:\s*(\d{1,2})`)

// NormalizeTime returns hh:mma or hh:mmp. Prayer is the context in which to
// interpret the times.
func NormalizeTime(t string, p Prayer) []string {
	rv := []string{}
	// extract hour, minute strings
	// if no numbers, or more than one set of numbers
	// convert to numbers
	// put back together in 12 h format, with a or p suffix
	matches := extractHourMinute.FindAllStringSubmatch(t, -1)
	for _, match := range matches {
		var hour, minute int
		fmt.Sscanf(match[0], "%d:%d", &hour, &minute)
		if hour > 12 {
			hour -= 12
		}
		var meridiem string
		switch {
		case p == Fajr:
			meridiem = "a"
		case p == Zuhr && (hour == 10 || hour == 11):
			meridiem = "a"
		case p == Zuhr:
			meridiem = "p"
		case p == Asr || p == Maghrib:
			meridiem = "p"
		case p == Isha && (hour == 12 || hour == 1):
			meridiem = "a"
		case p == Isha:
			meridiem = "p"
		}
		rv = append(rv, fmt.Sprintf("%d:%02d%s", hour, minute, meridiem))
	}
	return rv
}

// HourMinutesToMinutes converts a normalized time string hh:mmp to minutes
// since midnight
func HourMinutesToMinutes(t string) (int, error) {
	var hour, minute int
	var meridiem string
	matches, err := fmt.Sscanf(t, "%d:%d%s", &hour, &minute, &meridiem)
	if err != nil {
		return 0, err
	}
	if matches != 3 || hour < 0 || hour > 12 || minute < 0 || minute > 59 || (meridiem != "a" && meridiem != "p") {
		return 0, errors.New("invalid time")
	}

	if hour == 12 {
		hour = 0
	}
	if meridiem == "p" {
		hour += 12
	}

	return 60*hour + minute, nil
}

// Abs returns absolute value of x
func Abs(x int) uint {
	if x < 0 {
		return uint(-x)
	}
	return uint(x)
}
