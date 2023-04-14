#!/bin/bash

# Start Elasticsearch in the background
/usr/local/bin/docker-entrypoint.sh elasticsearch &

# Wait for Elasticsearch to start
while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' http://localhost:9200)" != "200" ]]; do
  sleep 5
done

# Load HR data if the flag is set
if [[ "$ELASTICSEARCH_IMPORT_HR_SAMPLE_DATA" == "true" ]]; then
  echo "Loading HR data..."
  curl -X POST "localhost:9200/_bulk?pretty" -H "Content-Type: application/json" --data-binary "@/usr/share/elasticsearch/hr_data.json"
fi

# Keep the container running
wait