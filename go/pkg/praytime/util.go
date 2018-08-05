package praytime

import (
	"fmt"
	"regexp"
)

// Prayer is enum of 5 prayers
type Prayer int

const ( // iota is reset to 0
	fajr Prayer = iota
	zuhr
	asr
	maghrib
	isha
)

// NormalizeTime returns hh:mma or hh:mmp
func NormalizeTime(t string, p Prayer) string {
	// extract hour, minute strings
	// if no numbers, or more than one set of numbers
	// convert to numbers
	// put back together in 12 h format, with a or p suffix
	extractHourMinute := regexp.MustCompile(`(\d{1,2}):(\d{1,2})`)
	result := extractHourMinute.FindStringSubmatch(t)
	if len(result) > 0 {
		var hour, minute int
		fmt.Sscanf(result[0], "%d:%d", &hour, &minute)
		if hour > 12 {
			hour -= 12
		}
		var meridiem string
		switch p {
		case fajr:
			meridiem = "a"
		case zuhr:
			if hour == 10 || hour == 11 {
				meridiem = "a"
			} else {
				meridiem = "p"
			}
		case asr:
			fallthrough
		case maghrib:
			meridiem = "p"
		case isha:
			if hour == 12 || hour == 1 {
				meridiem = "a"
			} else {
				meridiem = "p"
			}
		}
		return fmt.Sprintf("%d:%02d%s", hour, minute, meridiem)
	}
	return t
}
