FROM node:10
LABEL maintainer='manpradhan008@gmail.com'

WORKDIR /sms-api

COPY package.json /sms-api/package.json

RUN yarn install

COPY . /sms-api/


CMD yarn start

