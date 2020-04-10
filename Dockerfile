FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install -g nodemon

USER node

RUN yarn install

COPY --chown=node:node . .

EXPOSE 4000

CMD [ "yarn", "start" ]