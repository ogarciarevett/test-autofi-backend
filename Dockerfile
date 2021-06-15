FROM node:15.10.0-alpine as build

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app/

RUN npm run build

CMD [ "node", "dist/src/index.js" ]
