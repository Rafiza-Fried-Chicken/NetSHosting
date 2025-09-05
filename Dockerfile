# syntax=docker/dockerfile:1
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production \
 && npm i mime sqlite3
COPY . .
EXPOSE 3000
CMD ["node","server.js"]
