# ImageGen - AI Image Generation Platform

A modern AI image generation application built with Next.js 15, featuring user authentication, image storage, and powered by Replicate's FLUX model.

## 🚀 Complete Development Setup Guide

This guide will walk you through setting up the ImageGen project from scratch, including all API keys, Vercel environments, and custom domain configuration.

### Prerequisites

- Node.js 18+ installed
- Git installed
- A Vercel account
- A Namecheap account (for custom domain)

## 📋 Step-by-Step Setup

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd vercel-project

# Install dependencies
npm install

# Install Vercel CLI globally
npm install -g vercel
```

### 2. 🔑 Acquire All Required API Keys

#### A. Replicate API Token
1. Go to [replicate.com](https://replicate.com)
2. Sign up or log in to your account
3. Navigate to **Account Settings** → **API Tokens**
4. Click **"Create Token"**
5. Copy your token (starts with `r8_...`)

#### B. OpenAI API Key (Optional - for future features)
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Navigate to **API Keys** section
4. Click **"Create new secret key"**
5. Copy your key (starts with `sk-...`)

#### C. Generate NextAuth Secret
```bash
# Generate a secure random secret
openssl rand -base64 32
```
Copy the generated string for later use.

### 3. 🌐 Deploy to Vercel

```bash
# Login to Vercel
vercel login

# Deploy to production
npx vercel --prod
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No
- **Project name?** → `imagegen` (or your preferred name)
- **Directory?** → `./` (current directory)

### 4. 🗄️ Set Up Database & Storage in Vercel

#### A. Create PostgreSQL Database
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Navigate to **"Storage"** tab
4. Click **"Create Database"**
5. Select **"Postgres"**
6. Choose database name: `imagegen-db`
7. Select your preferred region
8. Click **"Create"**
9. After creation, click **"Connect"** and copy the `DATABASE_URL`

#### B. Create Blob Storage
1. Still in the **Storage** tab
2. Click **"Create Database"** again
3. Select **"Blob"**
4. Choose name: `imagegen-images`
5. Click **"Create"**
6. Go to blob store settings and copy the `BLOB_READ_WRITE_TOKEN`

### 5. ⚙️ Configure Environment Variables

Run our automated setup script to configure all environment variables across Production, Preview, and Development environments:

```bash
# Run the setup script
./scripts/setup.sh
```

The script will:
- ✅ Prompt you for all required API keys and tokens
- ✅ Automatically generate a secure `NEXTAUTH_SECRET`
- ✅ Handle URL formatting (adds https:// if needed)
- ✅ Set up all three Vercel environments (Production, Preview, Development)
- ✅ Generate Prisma client and initialize database schema
- ✅ Provide clear feedback on each step

**Required Information:**
- `DATABASE_URL` (from Vercel Postgres)
- `BLOB_READ_WRITE_TOKEN` (from Vercel Blob)
- `REPLICATE_API_TOKEN` (from replicate.com)
- `OPENAI_API_KEY` (from platform.openai.com)
- Your production domain (e.g., `yourdomain.com`)

### 6. 🌍 Custom Domain Setup with Namecheap

#### A. Purchase Domain on Namecheap
1. Go to [namecheap.com](https://namecheap.com)
2. Search for your desired domain
3. Complete the purchase process
4. Go to **Domain List** → **Manage** next to your domain

#### B. Configure DNS in Namecheap
1. In Namecheap dashboard, click **Advanced DNS**
2. Delete existing A records and CNAME records
3. Add these records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | @ | cname.vercel-dns.com | Automatic |
| CNAME | www | cname.vercel-dns.com | Automatic |

#### C. Add Domain to Vercel
1. In Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain: `yourdomain.com`
4. Click **"Add"**
5. Add www subdomain: `www.yourdomain.com`
6. Wait for DNS propagation (can take up to 48 hours)

#### D. Update Environment Variables
Update your `NEXTAUTH_URL` environment variable:
```bash
vercel env rm NEXTAUTH_URL production
vercel env add NEXTAUTH_URL production <<< "https://yourdomain.com"
```

### 7. 🚀 Final Deployment

```bash
# Deploy with all configurations
npx vercel --prod
```

## 🛠️ Local Development

### Setup Local Environment
```bash
# Create local environment file
cp .env.example .env.local

# Add your environment variables to .env.local
# DATABASE_URL=your_database_url
# BLOB_READ_WRITE_TOKEN=your_blob_token
# REPLICATE_API_TOKEN=your_replicate_token
# OPENAI_API_KEY=your_openai_key
# NEXTAUTH_SECRET=your_nextauth_secret
# NEXTAUTH_URL=http://localhost:3000

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start development server with custom script
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm test:e2e         # Run Playwright end-to-end tests
```

## 🏗️ Project Architecture

### Tech Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: NextAuth.js with Prisma adapter
- **Database**: PostgreSQL (Vercel Postgres)
- **File Storage**: Vercel Blob Storage
- **AI**: Replicate API (FLUX model)
- **Deployment**: Vercel
- **Testing**: Playwright

### Key Features
- 🔐 User authentication (register/login)
- 🎨 AI image generation using FLUX model
- 🖼️ Personal image gallery dashboard
- ☁️ Automatic cloud storage
- 📱 Responsive design
- 🔒 Secure API endpoints
- ⚡ Optimized performance

## 🔍 Vercel Environments Explained

### Production Environment
- **URL**: Your custom domain or `https://yourproject.vercel.app`
- **Purpose**: Live application for end users
- **Deployments**: Triggered by pushes to `main` branch
- **Environment Variables**: Production values

### Preview Environment
- **URL**: Unique URLs for each deployment (e.g., `https://yourproject-git-feature-branch.vercel.app`)
- **Purpose**: Testing branches and pull requests
- **Deployments**: Triggered by pushes to any branch except `main`
- **Environment Variables**: Preview values (usually same as production)

### Development Environment
- **URL**: `http://localhost:3000` (when using `vercel dev`)
- **Purpose**: Local development with Vercel's edge functions
- **Environment Variables**: Development values (localhost URLs)

## 🐛 Troubleshooting

### Common Issues

1. **Environment Variables Not Working**
   ```bash
   # Check if variables are set
   vercel env ls
   
   # Pull latest environment variables
   vercel env pull .env.local
   ```

2. **Database Connection Issues**
   ```bash
   # Reset database
   npx prisma db push --force-reset
   ```

3. **Domain Not Working**
   - Check DNS propagation: [whatsmydns.net](https://whatsmydns.net)
   - Verify CNAME records point to `cname.vercel-dns.com`
   - Wait up to 48 hours for full propagation

4. **Build Failures**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Replicate API Docs](https://replicate.com/docs)
- [Prisma Documentation](https://prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)

---

🎉 **Congratulations!** Your ImageGen application is now fully deployed and configured. Users can register, log in, and generate AI images with a professional setup including custom domain and proper environment management.
