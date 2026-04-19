FROM node:24-slim AS base
WORKDIR /client
COPY package*.json ./

FROM base AS development
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine AS production
COPY --from=build /client/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]