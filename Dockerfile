FROM node:10.15-stretch

RUN apt update && apt upgrade -y && apt install -y nginx && mkdir /logs
COPY nginx.conf /etc/nginx/
COPY site.conf /etc/nginx/sites-enabled
EXPOSE 80


COPY . /oj-frontend
WORKDIR /oj-frontend
RUN npm install && npm run build

CMD nginx -g "daemon off;"
