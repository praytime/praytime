FROM alpine

RUN apk add --no-cache \
        bash \
        curl \
        git \
        go \
        jq \
        musl-dev \
        nodejs-npm \
        python && \
    go get cloud.google.com/go/firestore && \
    go get golang.org/x/net/context && \ 
    go get google.golang.org/genproto/googleapis/type/latlng

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install --production

ENTRYPOINT [ "./entrypoint.sh" ]
