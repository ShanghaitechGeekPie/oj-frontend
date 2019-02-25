FROM node:10.15-stretch

RUN apt update && apt upgrade -y && apt install -y nginx && mkdir /logs
COPY nginx.conf /etc/nginx/
EXPOSE 80

WORKDIR /oj-frontend

COPY package*.json ./
RUN npm install

COPY . .
WORKDIR /oj-frontend
RUN npm run build

CMD nginx -g "daemon off;"
