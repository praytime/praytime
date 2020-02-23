# can be run as: 
# sudo docker run -it --rm --cap-add=SYS_ADMIN -e "GCLOUD_PROJECT=praytime-b76cb" -e "GOOGLE_APPLICATION_CREDENTIALS=/editor-praytime.json" -v "${HOME}/editor-praytime.json:/editor-praytime.json" pt-ms /bin/bash -c "node index.js ./lib/US/IL/mosque-foundation-bridgeview | praytime-load"

FROM golang:buster AS praytime-load

WORKDIR /go/src/github.com/praytime/praytime/go
COPY go .

RUN go get -d -v ./...
RUN go install -v ./...

# based on puppeteer example docker file
FROM node:lts-buster

RUN apt-get update && \
    apt-get -y install xvfb gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 \
      libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 \
      libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 \
      libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 \
      libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget jq && \
    rm -rf /var/lib/apt/lists/*

# Add user so we don't need --no-sandbox.
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser

# Run everything after as non-privileged user.
USER pptruser

RUN mkdir /home/pptruser/praytime

WORKDIR /home/pptruser/praytime

COPY --chown=pptruser:pptruser package.json package-lock.json ./

RUN npm install --production

COPY --from=praytime-load /go/bin/praytime-load /bin/praytime-load

COPY --chown=pptruser:pptruser . .

RUN git rev-parse HEAD > SOURCE_COMMIT

ENTRYPOINT [ "./entrypoint.sh" ]
