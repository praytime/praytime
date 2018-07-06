FROM alpine

RUN apk add --no-cache \
        bash \
        curl \
        git \
        go \
        jq \
        musl-dev \
        python && \
    go get -v cloud.google.com/go/firestore && \
    go get -v golang.org/x/net/context && \ 
    go get -v google.golang.org/genproto/googleapis/type/latlng

COPY . /praytime

WORKDIR /praytime

