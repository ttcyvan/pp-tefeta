FROM node:12-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
COPY data ./data
COPY src ./src
RUN npm install && yarn install
CMD [ "ts-node", "src/main.js" ]
