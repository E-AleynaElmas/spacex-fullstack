-- Kullanıcı oluşturulması
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT
      FROM pg_catalog.pg_user
      WHERE  usename = 'produser') THEN

      CREATE USER produser WITH PASSWORD 'produser123';
   END IF;
END
$do$;

-- Veritabanı oluşturulması
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT
      FROM pg_database
      WHERE datname = 'prod_database') THEN

      CREATE DATABASE prod_database;
   END IF;
END
$do$;

-- Kullanıcıya veritabanı üzerinde tam yetki verilmesi
GRANT ALL PRIVILEGES ON DATABASE prod_database TO produser;

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