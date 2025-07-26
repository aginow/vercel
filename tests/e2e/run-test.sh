#!/bin/bash

# Exit on error
set -e

# Load environment variables from .env.local if it exists
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
fi

# Ensure REPLICATE_API_TOKEN is available
if [ -z "$REPLICATE_API_TOKEN" ]; then
  echo "Error: REPLICATE_API_TOKEN environment variable is not set."
  exit 1
fi

# Ensure BLOB_READ_WRITE_TOKEN is available
if [ -z "$BLOB_READ_WRITE_TOKEN" ]; then
  echo "Error: BLOB_READ_WRITE_TOKEN environment variable is not set."
  exit 1
fi

# Run the Playwright test
npx playwright test