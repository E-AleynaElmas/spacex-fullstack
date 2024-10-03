# Build aşaması
FROM node:20.9.0 AS builder
WORKDIR /app

# Paket bağımlılıklarını yükle
COPY package*.json ./
RUN npm install

# Kaynak kodu kopyala ve projeyi derle
COPY . .
RUN npm run build

# Production phase
FROM node:20.9.0-alpine
WORKDIR /app

# Netcat (nc) aracını kur (PostgreSQL'i beklemek için kullanılır)
RUN apk add --no-cache netcat-openbsd

# Yalnızca production bağımlılıklarını yükle
COPY package*.json ./
RUN npm install --only=production

# Build edilen dosyaları ve diğer gerekli dosyaları kopyala
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/firebase-service-account.json ./firebase-service-account.json

# TypeORM CLI ve tsconfig-paths kur
RUN npm install typeorm tsconfig-paths --only=production

# entrypoint.sh dosyasını kopyala ve çalıştırılabilir hale getir
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Ortam değişkenlerini ayarla
ENV NODE_ENV=production

# Uygulama için gerekli portu expose et
EXPOSE 3000

# Entrypoint ve CMD tanımları
ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "dist/main.js"]