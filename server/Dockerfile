FROM node:12.2.0-alpine

WORKDIR /app/server

RUN npm install --silent

COPY . .

EXPOSE 5000

CMD ["npm","run", "backend"]