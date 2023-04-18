FROM node:18-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
    python3 \
    make \
    g++ \
    build-base \
    gcc \
    openssh-client \
    openssl \
    git \
    && npm install \
    && npm install -g node-addon-api \
    && mkdir -p src/data/jwt \
    && echo "y" | ssh-keygen -t rsa -b 4096 -m PEM -f src/data/jwt/jwt.key \
    && openssl rsa -in src/data/jwt/jwt.key -pubout -outform PEM -out src/data/jwt/jwt.key.pub \
    && npm run build \
    && apk del build-dependencies

EXPOSE 80

CMD [ "node", "dist/main" ]

