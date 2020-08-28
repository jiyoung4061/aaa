FROM node:12.18.3

WORKDIR /app/client/build

ENV PATH /app/client/build/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install --silent
RUN npm install reactjs-popup

COPY . .

EXPOSE 3000

CMD ["npm","run", "start"]