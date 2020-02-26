FROM golang:buster AS praytime-load

WORKDIR /go/src/github.com/praytime/praytime/go
COPY go .

RUN go get -d -v ./...
RUN go install -v ./...


FROM node:lts-buster AS node-modules

WORKDIR /praytime

COPY package.json package-lock.json ./

# Running puppeteer in docker not supported at the moment
RUN PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 npm install --production


FROM node:lts-buster

RUN apt-get update && \
    apt-get -y install jq && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /praytime

COPY --from=node-modules /praytime/node_modules node_modules

COPY --from=praytime-load /go/bin/praytime-load /bin/praytime-load

COPY . .

RUN git rev-parse HEAD > SOURCE_COMMIT

ENTRYPOINT [ "./entrypoint.sh" ]
