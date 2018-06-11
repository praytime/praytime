package main

import (
	"fmt"
	"golang.org/x/net/html"
	"net/http"
	"os"
	//	"strings"
)

// Helper function to pull the href attribute from a Token
func getHref(t html.Token) (ok bool, href string) {
	// Iterate over all of the Token's attributes until we find an "href"
	for _, a := range t.Attr {
		if a.Key == "href" {
			href = a.Val
			ok = true
		}
	}

	// "bare" return will return the variables (ok, href) as defined in
	// the function definition
	return
}

// Extract all http** links from a given webpage
func dump(url string) {
	resp, err := http.Get(url)
	if err != nil {
		fmt.Println("ERROR: Failed to dump \"" + url + "\"")
		return
	}

	b := resp.Body
	defer b.Close() // close Body when the function returns

	n, err := html.Parse(b)
	if err != nil {
		fmt.Println("ERROR: Failed to parse \"" + url + "\"")
		return
	}

	err = html.Render(os.Stdout, n)
	if err != nil {
		fmt.Println("ERROR: Failed to render \"" + url + "\"")
		return
	}

	// z := html.NewTokenizer(b)

	// for {
	// 	tt := z.Next()

	// 	switch {
	// 	case tt == html.ErrorToken:
	// 		// End of the document, we're done
	// 		return
	// 	case tt == html.StartTagToken:
	// 		t := z.Token()

	// 		// Check if the token is an <a> tag
	// 		isAnchor := t.Data == "a"
	// 		if !isAnchor {
	// 			continue
	// 		}

	// 		// Extract the href value, if there is one
	// 		ok, url := getHref(t)
	// 		if !ok {
	// 			continue
	// 		}

	// 		// Make sure the url begines in http**
	// 		hasProto := strings.Index(url, "http") == 0
	// 		if hasProto {
	// 			ch <- url
	// 		}
	// 	}
	// }
}

func main() {
	// foundUrls := make(map[string]bool)
	seedUrls := os.Args[1:]

	for _, url := range seedUrls {
		dump(url)
	}
}
