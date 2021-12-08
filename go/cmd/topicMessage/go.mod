module github.com/praytime/praytime/go/cmd/topicMessage

go 1.16

replace github.com/praytime/praytime/go/pkg/praytime => ../../pkg/praytime

require (
	cloud.google.com/go v0.99.0 // indirect
	cloud.google.com/go/firestore v1.6.1 // indirect
	cloud.google.com/go/storage v1.18.2 // indirect
	firebase.google.com/go v3.13.0+incompatible
	github.com/census-instrumentation/opencensus-proto v0.3.0 // indirect
	github.com/cespare/xxhash/v2 v2.1.2 // indirect
	github.com/cncf/xds/go v0.0.0-20211130200136-a8f946100490 // indirect
	github.com/envoyproxy/go-control-plane v0.10.1 // indirect
	github.com/envoyproxy/protoc-gen-validate v0.6.2 // indirect
	github.com/golang/groupcache v0.0.0-20210331224755-41bb18bfe9da // indirect
	golang.org/x/net v0.0.0-20211208012354-db4efeb81f4b
	golang.org/x/sys v0.0.0-20211205182925-97ca703d548d // indirect
	google.golang.org/genproto v0.0.0-20211207154714-918901c715cf // indirect
	google.golang.org/grpc v1.42.0 // indirect
)
