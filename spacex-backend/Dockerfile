# Build aşaması
FROM node:20.9.0 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production phase
FROM node:20.9.0-alpine
WORKDIR /app

# install netcat (nc) tool
RUN apk add --no-cache netcat-openbsd

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/firebase-service-account.json ./firebase-service-account.json

# Copy entrypoint.sh and make it executable
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV NODE_ENV=production
EXPOSE 3000

RUN npm install tsconfig-paths

# Entrypoint and CMD definitions
ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "dist/main.js"]