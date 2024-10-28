FROM node:16

ARG REACT_APP_API_URL=https://www.resume-rocket.net/api

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g serve

COPY . .

ENV NODE_ENV=production
ENV VITE_API_URL=$REACT_APP_API_URL

RUN echo "REACT_APP_API_URL: $VITE_API_URL"
RUN echo "NODE_ENV: $NODE_ENV"

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
