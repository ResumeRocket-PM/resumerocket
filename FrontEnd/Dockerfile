FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g serve

COPY . .

ENV API_URL=https://www.resume-rocket.net/api

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
