FROM node:alpine

WORKDIR /usr/bot

COPY package.json yarn.lock ./
RUN yarn

COPY . .

CMD yarn start
