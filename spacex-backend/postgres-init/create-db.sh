#!/bin/bash

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  -- Kullanıcı oluşturulması
  DO
  \$do\$
  BEGIN
     IF NOT EXISTS (
        SELECT
        FROM pg_catalog.pg_user
        WHERE  usename = '${DB_USERNAME}') THEN

        CREATE USER ${DB_USERNAME} WITH PASSWORD '${DB_PASSWORD}';
     END IF;
  END
  \$do\$;

  -- Veritabanı oluşturulması
  DO
  \$do\$
  BEGIN
     IF NOT EXISTS (
        SELECT
        FROM pg_database
        WHERE datname = '${DB_NAME}') THEN

        CREATE DATABASE ${DB_NAME};
     END IF;
  END
  \$do\$;

  -- Kullanıcıya veritabanı üzerinde tam yetki verilmesi
  GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USERNAME};

  -- "user" tablosu oluşturulması
  CREATE TABLE IF NOT EXISTS public."user" (
      id SERIAL PRIMARY KEY,
      "firstName" VARCHAR(255) NOT NULL,
      "lastName" VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
  );

  -- "feed" tablosu oluşturulması
  CREATE TABLE IF NOT EXISTS public."feed" (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      date TIMESTAMP NOT NULL,
      "imageUrl" TEXT,
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- "event" tablosu oluşturulması
  CREATE TABLE IF NOT EXISTS public."event" (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      date TIMESTAMP NOT NULL,
      "imageUrl" TEXT,
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
EOSQL