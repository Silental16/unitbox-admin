#!/bin/bash
# Backfill analytics data for the last N days
# Usage: ./scripts/backfill-analytics.sh [days] [url]
DAYS=${1:-180}
URL=${2:-"https://unitbox-admin.vercel.app"}
SECRET=${CRON_SECRET:-""}

echo "Backfilling $DAYS days from $URL..."
curl -s -X GET "$URL/api/analytics/sync?days=$DAYS" \
  -H "Authorization: Bearer $SECRET" | python3 -m json.tool
echo "Done!"
