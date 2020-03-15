# --------------
# ---- BASE ----
# --------------

# This image sets up for production,
# it's used in all other stages as a base and contains a minimum for production.

# alpine is even smaller than distroless, also we can use `sh`
FROM node:12-alpine AS base

# add a user that has limited permissions
RUN addgroup -S breko \
  && adduser -S -g breko breko

# set the timezone for all images and restrict entrypoint through tini to stop PS1 issues.
RUN apk add --update --no-cache \
  tzdata tini

ENV TZ Europe/London
RUN cp /usr/share/zoneinfo/Europe/London /etc/localtime && \
  echo "Europe/London" > /etc/timezone

ENV APP_DIR /usr/project

# default NODE_ENV to production for all stages
ENV NODE_ENV production
ENV CONFIG_ENV production
ENV PORT 9001
ENV DEBUG *,-babel*,-koa*,-css-modules*,-engine*,-socket.io*,-mocha*,-eslint*,-cypress*

RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

# restrict the user permissions by default
RUN chown -R breko:breko $APP_DIR
USER breko

# copy production dependencies
COPY package.json .
COPY package-lock.json .
COPY babel.config.js .
COPY postcss.config.js .
COPY .browserslistrc .
COPY src src

# use tini as entrypoint for PS1 issue prevention
ENTRYPOINT [ "/sbin/tini", "--" ]

# ----------------------
# ---- DEPENDENCIES ----
# ----------------------

# This stage will run all of the linting and tests
# it acts as a CI, preventing the production image from being built with failing tests

FROM base AS dependencies

# need to change the NODE_ENV for installing the devDependencies and running tests appropriately.
ENV NODE_ENV test

COPY .eslintrc .
COPY .eslintignore .
COPY .istanbul.yml .
COPY .sass-lint.yml .
COPY .mocharc.js .
COPY test test

# use root when install dependencies and running tests
USER root

RUN npm set progress=false \
  && npm ci --quiet

RUN $(npm bin)/eslint src test --ext .js
RUN $(npm bin)/sass-lint --verbose -c .sass-lint.yml
RUN $(npm bin)/mocha 'src/**/*.spec.js'
RUN $(npm bin)/mocha 'test/integration/**/*.test.js'

# ---------------
# ---- build ----
# ---------------

FROM base AS build

# grab all the installed dependencies
COPY --from=dependencies $APP_DIR/node_modules ./node_modules

# need root user to create the build assets and change ownership
USER root

RUN $(npm bin)/webpack \
  --config "./src/config/webpack.production.config.babel.js"

# get rid of any devDependencies installed in `dependencies` stage
RUN npm prune --production \
  && npm dedupe

# breko user needs to own the ./node_modules and src for running the server
RUN chown -R breko:breko $APP_DIR

# --------------
# ---- prod ----
# --------------
# image for production, very small
FROM base AS prod

# copy everything: node modules, build assets, server source code
# the devDependencies have already been removed
COPY --from=build $APP_DIR/ ./

EXPOSE $PORT

CMD [ "node", "./src/server-entry.js" ]
