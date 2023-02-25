module github.com/praytime/praytime/go/cmd/message

go 1.16

replace github.com/praytime/praytime/go/pkg/praytime => ../../pkg/praytime

require (
	cloud.google.com/go/compute v1.1.0 // indirect
	cloud.google.com/go/firestore v1.6.1 // indirect
	cloud.google.com/go/iam v0.1.1 // indirect
	cloud.google.com/go/storage v1.18.2 // indirect
	firebase.google.com/go v3.13.0+incompatible
	github.com/golang/groupcache v0.0.0-20210331224755-41bb18bfe9da // indirect
	github.com/google/go-cmp v0.5.7 // indirect
	github.com/praytime/praytime/go/pkg/praytime v0.0.0-20220121004907-7dc6552fe7e9
	golang.org/x/net v0.0.0-20220114011407-0dd24b26b47d
	golang.org/x/sys v0.1.0 // indirect
	golang.org/x/text v0.3.7 // indirect
	google.golang.org/grpc v1.43.0
)
