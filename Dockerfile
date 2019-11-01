FROM node:12.2.0-alpine AS builder
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=builder ./app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
