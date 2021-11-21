module github.com/praytime/praytime/go/cmd/praytime-load

go 1.16

replace github.com/praytime/praytime/go/pkg/praytime => ../../pkg/praytime

require (
	cloud.google.com/go/firestore v1.6.1 // indirect
	cloud.google.com/go/storage v1.18.2 // indirect
	firebase.google.com/go/v4 v4.6.1
	github.com/census-instrumentation/opencensus-proto v0.3.0 // indirect
	github.com/cespare/xxhash/v2 v2.1.2 // indirect
	github.com/envoyproxy/go-control-plane v0.10.1 // indirect
	github.com/envoyproxy/protoc-gen-validate v0.6.2 // indirect
	github.com/golang/groupcache v0.0.0-20210331224755-41bb18bfe9da // indirect
	github.com/praytime/praytime/go/pkg/praytime v0.0.0-20211120180751-543f567c4d49
	golang.org/x/net v0.0.0-20211118161319-6a13c67c3ce4
	golang.org/x/oauth2 v0.0.0-20211104180415-d3ed0bb246c8 // indirect
	golang.org/x/sys v0.0.0-20211117180635-dee7805ff2e1 // indirect
	google.golang.org/api v0.60.0 // indirect
	google.golang.org/grpc v1.42.0
)
