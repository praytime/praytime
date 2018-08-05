package praytime

import (
	"testing"
)

func TestNormalizeTime(t *testing.T) {
	var result string
	result = NormalizeTime("01:00", zuhr)
	if result != "1:00p" {
		t.Errorf("expecting 1:00p, got %s", result)
	}
	result = NormalizeTime("23:00", isha)
	if result != "11:00p" {
		t.Errorf("expecting 11:00p, got %s", result)
	}
	result = NormalizeTime("11:00", zuhr)
	if result != "11:00a" {
		t.Errorf("expecting 11:00a, got %s", result)
	}
}
