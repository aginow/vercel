ver# ImageGen - AI Image Generation App

Generate AI images using Replicate's FLUX model with user authentication and storage.

## Quick Start (Clone to Production)

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd vercel-project
npm install
```

### 2. Set Up Services

**Get Replicate API Token:**
- Sign up at [replicate.com](https://replicate.com)
- Get API token from account settings

### 3. Deploy to Vercel
```bash
npm install -g vercel
vercel login
npx vercel --prod
```

### 4. Set Up Database & Storage in Vercel

**In your Vercel project dashboard:**

1. **Go to Storage Tab**
   - Click on your project in Vercel dashboard
   - Navigate to the **"Storage"** tab in the top menu

2. **Create PostgreSQL Database**
   - Click **"Create Database"**
   - Select **"Postgres"** 
   - Choose a database name (e.g., `imagegen-db`)
   - Select your region
   - Click **"Create"**
   - After creation, click **"Connect"** → Copy the `DATABASE_URL` connection string

3. **Create Blob Storage**
   - Still in the Storage tab, click **"Create Database"** again
   - Select **"Blob"**
   - Choose a name (e.g., `imagegen-images`)
   - Click **"Create"**
   - After creation, go to the blob store settings and copy the `BLOB_READ_WRITE_TOKEN`

### 5. Configure Environment Variables

**In your Vercel project dashboard:**

1. **Go to Settings**
   - Click **"Settings"** tab in the top menu
   - Click **"Environment Variables"** in the left sidebar

2. **Add Each Variable**
   Click **"Add New"** for each of these:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `DATABASE_URL` | Paste your Postgres connection string | Production |
   | `NEXTAUTH_URL` | `https://your-app.vercel.app` | Production |
   | `NEXTAUTH_SECRET` | Generate with `openssl rand -base64 32` | Production |
   | `BLOB_READ_WRITE_TOKEN` | Paste your blob token | Production |
   | `REPLICATE_API_TOKEN` | Your Replicate API token | Production |

   **For each variable:**
   - Enter the **Name** (e.g., `DATABASE_URL`)
   - Enter the **Value** (the actual connection string/token)
   - Select **"Production"** environment
   - Click **"Save"**

### 6. Initialize Database
```bash
npx prisma db push
```

### 7. Redeploy
```bash
npx vercel --prod
```

## Local Development
```bash
# Copy environment variables to .env.local
npm run dev
```

## Features
- User registration/login
- AI image generation (FLUX model)
- Image gallery dashboard
- Automatic image storage

## Tech Stack
Next.js 15, TypeScript, Prisma, PostgreSQL, NextAuth.js, Vercel Blob, Replicate API

---

That's it! Your app should be live and fully functional. 🚀
