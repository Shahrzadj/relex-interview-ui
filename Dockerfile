# stage 1
FROM node:latest AS relex-interview-ui
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# stage 2
FROM nginx:alpine
COPY --from=relex-interview-ui /app/dist/relex-interview-ui /usr/share/nginx/html
EXPOSE 80