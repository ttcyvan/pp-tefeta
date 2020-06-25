FROM node:12-alpine
COPY package*.json ./
RUN npm install
CMD [ "ts-node", "src/main.js" ]