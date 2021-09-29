module github.com/praytime/praytime/go/cmd/message

go 1.16

replace github.com/praytime/praytime/go/pkg/praytime => ../../pkg/praytime

require (
	cloud.google.com/go/firestore v1.6.0 // indirect
	firebase.google.com/go v3.13.0+incompatible
	github.com/praytime/praytime/go/pkg/praytime v0.0.0-00010101000000-000000000000
	golang.org/x/net v0.0.0-20210928044308-7d9f5e0b762b
	google.golang.org/api v0.58.0 // indirect
	google.golang.org/grpc v1.41.0
)
