FROM node:10.15.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

ENV NODE_ENV="production"
ARG PORT=3000
ENV PORT=$PORT

COPY . .

EXPOSE ${PORT}

CMD ["npm", "start"]
