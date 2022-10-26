FROM node:16-alpine

WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build
RUN npm install serve -g
RUN addgroup -S app && adduser -S app -G app
USER app
CMD serve -s dist -l 8080