# build environment
FROM node:16 as build
WORKDIR /app
ENV PATH ./node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

# production environment
FROM nginx:1.21.6-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]