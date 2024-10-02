#!/bin/sh

# Wait for PostgreSQL to be ready
echo "PostgreSQL is expected..."

while ! nc -z db 5432; do
  sleep 0.1
done

echo "PostgreSQL started"

# Run migrations
npm run migration:run

# Run main process
exec "$@"