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
    go get firebase.google.com/go && \
    go get golang.org/x/net/context && \ 
    go get google.golang.org/genproto/googleapis/type/latlng

WORKDIR /root/go/src/github.com/praytime/praytime

COPY package.json package-lock.json /root/go/src/github.com/praytime/praytime/

RUN npm install --production

COPY . /root/go/src/github.com/praytime/praytime/

RUN git rev-parse HEAD > SOURCE_COMMIT

ENTRYPOINT [ "./entrypoint.sh" ]
