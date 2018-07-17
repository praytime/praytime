FROM apify/actor-node-basic

WORKDIR /usr/src/app

COPY package.json package-lock.json .

RUN npm install --production

COPY . .

CMD [ "./entrypoint.sh" ]
