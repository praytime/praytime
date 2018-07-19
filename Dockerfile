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

WORKDIR /usr/src/app

COPY package.json package-lock.json /usr/src/app/

RUN npm install --production

COPY . /usr/src/app/

ENTRYPOINT [ "./entrypoint.sh" ]
