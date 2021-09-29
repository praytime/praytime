module github.com/praytime/praytime/go/cmd/topicMessage

go 1.16

replace github.com/praytime/praytime/go/pkg/praytime => ../../pkg/praytime

require (
	cloud.google.com/go/firestore v1.6.0 // indirect
	cloud.google.com/go/storage v1.16.1 // indirect
	firebase.google.com/go v3.13.0+incompatible
	golang.org/x/net v0.0.0-20210928044308-7d9f5e0b762b
	google.golang.org/api v0.58.0 // indirect
)
