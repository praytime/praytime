module github.com/praytime/praytime/go/cmd/praytime-load

go 1.16

replace github.com/praytime/praytime/go/pkg/praytime => ../../pkg/praytime

require (
	cloud.google.com/go/firestore v1.6.1 // indirect
	cloud.google.com/go/storage v1.18.2 // indirect
	firebase.google.com/go/v4 v4.7.0
	github.com/census-instrumentation/opencensus-proto v0.3.0 // indirect
	github.com/cespare/xxhash/v2 v2.1.2 // indirect
	github.com/cncf/xds/go v0.0.0-20211216145620-d92e9ce0af51 // indirect
	github.com/envoyproxy/go-control-plane v0.10.1 // indirect
	github.com/envoyproxy/protoc-gen-validate v0.6.2 // indirect
	github.com/golang/groupcache v0.0.0-20210331224755-41bb18bfe9da // indirect
	github.com/praytime/praytime/go/pkg/praytime v0.0.0-20211217135105-609af567b96d
	golang.org/x/net v0.0.0-20211216030914-fe4d6282115f
	golang.org/x/sys v0.0.0-20211216021012-1d35b9e2eb4e // indirect
	google.golang.org/api v0.63.0 // indirect
	google.golang.org/grpc v1.43.0
)
