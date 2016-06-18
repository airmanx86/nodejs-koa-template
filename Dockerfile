FROM node:4.4.5-slim

WORKDIR /src

ADD ./package.json /src/package.json
RUN npm install --production

ADD ./app /src/app

CMD ["node", "app/server"]
