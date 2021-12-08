module github.com/praytime/praytime/go/cmd/praytime-load

go 1.16

replace github.com/praytime/praytime/go/pkg/praytime => ../../pkg/praytime

require (
	cloud.google.com/go v0.99.0 // indirect
	cloud.google.com/go/firestore v1.6.1 // indirect
	cloud.google.com/go/storage v1.18.2 // indirect
	firebase.google.com/go/v4 v4.6.1
	github.com/census-instrumentation/opencensus-proto v0.3.0 // indirect
	github.com/cespare/xxhash/v2 v2.1.2 // indirect
	github.com/cncf/xds/go v0.0.0-20211130200136-a8f946100490 // indirect
	github.com/envoyproxy/go-control-plane v0.10.1 // indirect
	github.com/envoyproxy/protoc-gen-validate v0.6.2 // indirect
	github.com/golang/groupcache v0.0.0-20210331224755-41bb18bfe9da // indirect
	github.com/praytime/praytime/go/pkg/praytime v0.0.0-20211208014156-c5b189914326
	golang.org/x/net v0.0.0-20211208012354-db4efeb81f4b
	golang.org/x/sys v0.0.0-20211205182925-97ca703d548d // indirect
	google.golang.org/grpc v1.42.0
)
