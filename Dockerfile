FROM node:8.11-alpine

RUN addgroup -S breko \
   && adduser -S -g breko breko

# install dumb-init
ADD https://github.com/Yelp/dumb-init/releases/download/v1.0.0/dumb-init_1.0.0_amd64 \
  /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

RUN apk add --update --no-cach \
  tzdata

ENV APP_DIR /usr/application
ENV NODE_ENV production
ENV PORT 9001
ENV DEBUG *,-babel,-koa*,-css-modules*,-engine*,-socket.io*,-follow-redirects

ENV TZ Europe/London
RUN cp /usr/share/zoneinfo/Europe/London /etc/localtime && \
  echo "Europe/London" > /etc/timezone

RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

COPY .babelrc .
COPY package.json .
COPY package-lock.json .
COPY postcss.config.js .
COPY src src

RUN chown -R breko:breko $APP_DIR

# restrict permissions
USER breko

RUN npm install

# build assets
RUN ./node_modules/.bin/webpack \
  --config "./src/config/webpack.production.config.babel.js"

EXPOSE $PORT

# use dumb-init to take burden of PID 1
ENTRYPOINT [ "dumb-init" ]

CMD [ "node", "./src/server-entry.js" ]
