FROM node:10-alpine

RUN addgroup -S breko \
   && adduser -S -g breko breko

RUN apk add --update --no-cache \
  tzdata tini

ENV TZ Europe/London
RUN cp /usr/share/zoneinfo/Europe/London /etc/localtime && \
  echo "Europe/London" > /etc/timezone

ENV APP_DIR /usr/project
ENV NODE_ENV setup

RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

COPY package.json .
COPY package-lock.json .
COPY babel.config.js .
COPY postcss.config.js .

COPY src src

RUN npm set progress=false \
  && npm ci

ENV PORT 9001
ENV DEBUG *,-babel*,-koa*,-css-modules*,-engine*,-socket.io*
ENV NODE_ENV production

RUN ./node_modules/.bin/webpack \
  --config "./src/config/webpack.production.config.babel.js"

RUN npm prune --production \
  && npm dedupe

RUN chown -R breko:breko $APP_DIR
USER breko

EXPOSE $PORT

ENTRYPOINT [ "/sbin/tini", "--" ]

CMD [ "node", "./src/server-entry.js" ]
