# End-to-End Testing

This directory contains end-to-end tests for the ImageGen application using Playwright.

## Test Coverage

The main test file `user-flow.spec.ts` covers the following flow:

1. Clears the database and Vercel Blob storage
2. Registers a randomly generated user
3. Signs in with the newly created user
4. Generates an image using Replicate AI
5. Verifies the image is saved in the database and Vercel Blob storage

## Prerequisites

Before running the tests, make sure you have the following environment variables set:

- `DATABASE_URL`: Connection string for your PostgreSQL database
- `BLOB_READ_WRITE_TOKEN`: Token for Vercel Blob storage
- `REPLICATE_API_TOKEN`: API token for Replicate AI

## Running the Tests

You can run the tests using the following command:

```bash
npm run test:e2e
```

This will:

1. Load environment variables from `.env.local` if it exists
2. Verify that required environment variables are set
3. Run the Playwright tests

## Utilities

The `utils/cleanup.ts` file contains functions to clear the database and Vercel Blob storage before running the tests:

- `clearDatabase()`: Deletes all records from the database tables
- `clearBlobStorage()`: Deletes all blobs from Vercel Blob storage

## Configuration

The Playwright configuration is in `playwright.config.ts` at the root of the project. It sets up:

- Chrome browser for testing
- Base URL for the application
- Web server to run the Next.js application during tests