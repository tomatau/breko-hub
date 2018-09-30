FROM node:10-alpine AS base

RUN addgroup -S breko \
  && adduser -S -g breko breko

RUN apk add --update --no-cache \
  tzdata tini

ENV TZ Europe/London
RUN cp /usr/share/zoneinfo/Europe/London /etc/localtime && \
  echo "Europe/London" > /etc/timezone

ENV APP_DIR /usr/project

RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

COPY package.json .
COPY package-lock.json .
COPY babel.config.js .
COPY postcss.config.js .

COPY src src

ENTRYPOINT [ "/sbin/tini", "--" ]

# ----------------------
# ---- DEPENDENCIES ----
# ----------------------
FROM base AS dependencies

ENV NODE_ENV test

COPY .eslintrc .
COPY .eslintignore .
COPY .istanbul.yml .
COPY .sass-lint.yml .

COPY test test

RUN npm set progress=false \
  && npm ci

RUN ./node_modules/.bin/eslint src test --ext .js
RUN ./node_modules/.bin/sass-lint --verbose -c .sass-lint.yml
RUN ./node_modules/.bin/mocha 'src/**/*.spec.js'
RUN ./node_modules/.bin/mocha 'test/integration/**/*.test.js'

# --------------
# ---- PROD ----
# --------------
FROM base AS prod

ENV PORT 9001
ENV DEBUG *,-babel*,-koa*,-css-modules*,-engine*,-socket.io*
ENV NODE_ENV production

COPY --from=dependencies $APP_DIR/node_modules ./node_modules

RUN ./node_modules/.bin/webpack \
  --config "./src/config/webpack.production.config.babel.js"

RUN npm prune --production \
  && npm dedupe

RUN chown -R breko:breko $APP_DIR
USER breko

EXPOSE $PORT

CMD [ "node", "./src/server-entry.js" ]


# FROM cypress/browsers:chrome67-ff57 as testrunner

# OS: Debien Jessie
# https://github.com/nodejs/docker-node/blob/72dd945d29dee5afa73956ebc971bf3a472442f7/8/jessie/Dockerfile
# NODE: 8
# libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 xvfb
# https://github.com/cypress-io/cypress-docker-images/blob/master/browsers/chrome67-ff57/Dockerfile
# apt-get install -y dbus-x11 google-chrome-stable zip
# wget firefox
# ENV TERM xterm
# # avoid million NPM install messages
# ENV npm_config_loglevel warn
# # allow installing when the main user is root
# ENV npm_config_unsafe_perm true

# FROM debian:jessie
# WORKDIR /project/

# ONBUILD COPY --from=testrunner /usr/local/bin/node /usr/local/bin/
# ONBUILD COPY --from=testrunner /usr/lib/ /usr/lib/
# ONBUILD COPY --from=testrunner /project/ /project/
