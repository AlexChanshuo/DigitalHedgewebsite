#!/bin/sh
set -e

echo "🔄 Running prisma db push..."
npx prisma db push --skip-generate --accept-data-loss
echo "✅ Database schema synced"

echo "🚀 Starting server..."
exec node dist/app.js
