# FROM node:13.12.0-alpine
FROM node:12.18.3-alpine

RUN mkdir /chat-app
ENV FRONT_ROOT /chat-app
WORKDIR $FRONT_ROOT

COPY ./package.json $FRONT_ROOT/package.json
COPY ./node_modules $FRONT_ROOT/node_modules
# COPY ./package-lock.json $FRONT_ROOT/package-lock.json
COPY ./yarn.lock $FRONT_ROOT/yarn.lock

RUN npm install -g n && yarn install
RUN npm install -g create-react-app
RUN npm install -g firebase-tools

COPY . $FRONT_ROOT

EXPOSE 3000
CMD ["yarn", "start"]