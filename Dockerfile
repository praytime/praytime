FROM alpine

RUN apk add --no-cache \
        bash \
        curl \
        git \
        go \
        jq \
        musl-dev \
        nodejs-npm \
        python 

WORKDIR /root/go/src/github.com/praytime/praytime

COPY package.json package-lock.json /root/go/src/github.com/praytime/praytime/

RUN npm install --production

COPY go /root/go/src/github.com/praytime/praytime/go/

RUN go get -d go/...

COPY . /root/go/src/github.com/praytime/praytime/

RUN git rev-parse HEAD > SOURCE_COMMIT

ENTRYPOINT [ "./entrypoint.sh" ]
