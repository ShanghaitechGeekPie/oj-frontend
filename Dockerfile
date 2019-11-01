FROM node:10.15-stretch as build

WORKDIR /oj-frontend

COPY app/package*.json ./
RUN npm install

COPY app .

RUN npm run build

CMD nginx -g "daemon off;"

FROM nginx:stable-alpine

COPY --from=build /oj-frontend/dist /dist
COPY nginx.conf /etc/nginx/

