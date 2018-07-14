FROM alpine

RUN apk add --no-cache \
        bash \
        curl \
        git \
        go \
        jq \
        musl-dev \
        nodejs \
        python && \
    go get -v cloud.google.com/go/firestore && \
    go get -v golang.org/x/net/context && \ 
    go get -v google.golang.org/genproto/googleapis/type/latlng

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install --production

ENTRYPOINT [ "./entrypoint.sh" ]
