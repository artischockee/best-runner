FROM node:latest

EXPOSE 5000

WORKDIR /
COPY . .

RUN yarn install
RUN yarn build