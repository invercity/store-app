FROM node:24-slim AS base
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /server
COPY package*.json ./
COPY prisma ./prisma

FROM base AS development
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base AS build
RUN npm ci
RUN npx prisma generate
COPY . .
RUN npm run build

FROM node:24-slim AS production
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /server
COPY --from=build /server/package*.json ./
COPY --from=build /server/node_modules ./node_modules
COPY --from=build /server/dist ./dist
COPY --from=build /server/prisma ./prisma
EXPOSE 3000
CMD ["npm", "run", "start"]
