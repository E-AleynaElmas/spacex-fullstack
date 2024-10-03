#!/bin/sh

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."

# PostgreSQL'in hazır olup olmadığını kontrol et
while ! nc -z db 5432; do
  sleep 0.1
done

echo "PostgreSQL is ready."

# Uygulamayı başlat
echo "Starting the application..."
exec "$@"