package praytime

import (
	"testing"
)

func TestNormalizeTime(t *testing.T) {
	var r []string
	r = NormalizeTime("01:00", Zuhr)
	if r[0] != "1:00p" {
		t.Errorf("expecting 1:00p, got %s", r[0])
	}
	r = NormalizeTime("23:00", Isha)
	if r[0] != "11:00p" {
		t.Errorf("expecting 11:00p, got %s", r[0])
	}
	r = NormalizeTime("11:00", Zuhr)
	if r[0] != "11:00a" {
		t.Errorf("expecting 11:00a, got %s", r[0])
	}
	r = NormalizeTime("sunset", Maghrib)
	if len(r) != 0 {
		t.Errorf("expecting zero results")
	}
	r = NormalizeTime("11:00 am 12:00 pm", Zuhr)
	if len(r) != 2 {
		t.Errorf("expecting 2 results")
	}
	if r[0] != "11:00a" {
		t.Errorf("expecting 11:00a, got %s", r[0])
	}
	if r[1] != "12:00p" {
		t.Errorf("expecting 12:00p, got %s", r[1])
	}
}
