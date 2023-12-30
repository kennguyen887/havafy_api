FROM node:18.14.2-alpine3.16 as builder

WORKDIR /app

RUN apk update && apk --update-cache add --no-progress --virtual .gyp \
    g++ \
    gcc \
    make \
    python3 \
    git

COPY package.json yarn.lock ./

ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN yarn cache clean && yarn install

RUN apk del .gyp
RUN rm -rf /var/cache/apk/*

COPY . ./

RUN yarn run build

FROM node:18.14.2-alpine3.16 as runner

WORKDIR /app

RUN addgroup -g 1001 -S nodejs \
    && adduser -S nestjs -u 1001

COPY package.json yarn.lock ./
COPY --from=builder /app/dist ./
COPY --from=builder /app/db ./db
COPY --from=builder /app/type-orm.config.ts ./type-orm.config.ts

RUN yarn cache clean && yarn install --production

USER nestjs

EXPOSE 3000
CMD ["node", "/app/src/main.js"]