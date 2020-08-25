FROM node:12.18.3

WORKDIR /app/client

ENV PATH /app/client/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 3000

CMD ["npm", "start"]