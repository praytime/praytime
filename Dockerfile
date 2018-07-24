FROM apify/actor-node-basic

COPY package.json package-lock.json /usr/src/app/

WORKDIR /usr/src/app

RUN npm install --production

COPY . /usr/src/app

RUN npm install --production

ENTRYPOINT [ "./entrypoint.sh" ]
