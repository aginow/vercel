# ImageGen - AI Image Generation Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC)](https://tailwindcss.com/)

A modern AI image generation application built with Next.js 15, featuring user authentication, image storage, and powered by Replicate's FLUX model.

## 🚀 Quick Start (5 Minutes Setup!)

### Step 1: Fork This Repository

1. **Go to the original repository**: [https://github.com/YOUR_USERNAME/vercel](https://github.com/YOUR_USERNAME/vercel)
2. **Click the "Fork" button** in the top-right corner
3. **Choose your GitHub account** as the destination
4. **Wait for the fork to complete** - you'll be redirected to your fork

### Step 2: Get Your Project Locally
1. On your forked repository page, click the green **"Code"** button
2. Click **"Download ZIP"**
3. Extract the ZIP file to your desired location
4. Open terminal/command prompt and navigate to the extracted folder

### Step 3: Install Dependencies

```bash
# Install Node.js dependencies
npm install

# Install Vercel CLI globally
npm install -g vercel
```

### Step 4: Get Your API Keys

You'll need these free API keys:

#### A. Replicate API Token (Required for AI image generation)
1. Go to [replicate.com](https://replicate.com) and sign up
2. Go to **Account Settings** → **API Tokens**
3. Click **"Create Token"** and copy it

#### B. OpenAI API Key (Optional)
1. Go to [platform.openai.com](https://platform.openai.com) and sign up
2. Go to **API Keys** section
3. Click **"Create new secret key"** and copy it

### Step 5: Deploy to Vercel

```bash
# Login to Vercel (free account)
vercel login

# Deploy your project
vercel --prod
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account  
- **Link to existing project?** → No
- **Project name?** → `my-imagegen` (or whatever you want)
- **Directory?** → `./` (current directory)

### Step 6: Set Up Database & Storage

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **"Storage"** tab

**Create PostgreSQL Database:**
- Click **"Create Database"** → **"Postgres"**
- Name: `imagegen-db`
- Click **"Create"**
- Copy the `DATABASE_URL` when it appears

**Create Blob Storage:**
- Click **"Create Database"** again → **"Blob"**  
- Name: `imagegen-images`
- Click **"Create"**
- Copy the `BLOB_READ_WRITE_TOKEN` from settings

### Step 7: Run the Magic Setup Script

```bash
# This does everything automatically!
./scripts/setup.sh
```

The script will ask you for:
- Your `DATABASE_URL` (from Step 6)
- Your `BLOB_READ_WRITE_TOKEN` (from Step 6)  
- Your `REPLICATE_API_TOKEN` (from Step 4)
- Your `OPENAI_API_KEY` (from Step 4, or just press Enter to skip)
- Your domain name (or just use the Vercel URL for now)

**That's it!** 🎉 The script automatically:
- ✅ Sets up all environment variables
- ✅ Generates secure authentication secrets
- ✅ Initializes your database
- ✅ Configures everything for production

### Step 8: Visit Your App!

Your app is now live! Check your Vercel dashboard for the URL, or the script will show you the link.

## 🛠️ Local Development

Want to develop locally? Easy:

```bash
# Start development server
npm run dev
```

Visit `http://localhost:3000` - your local version will automatically use the same database and storage as production!

## 🌍 Add a Custom Domain (Optional)

### Quick Namecheap Setup:
1. Buy a domain on [namecheap.com](https://namecheap.com)
2. In Namecheap: **Domain List** → **Manage** → **Advanced DNS**
3. Add these records:

| Type | Host | Value |
|------|------|-------|
| CNAME | @ | cname.vercel-dns.com |
| CNAME | www | cname.vercel-dns.com |

4. In Vercel Dashboard: **Settings** → **Domains** → **Add Domain**
5. Enter your domain and wait (up to 48 hours for DNS)

## 🎯 What You Get

- 🔐 **User Authentication** - Register/login system
- 🎨 **AI Image Generation** - Powered by FLUX model
- 🖼️ **Personal Gallery** - Save and view your creations
- ☁️ **Cloud Storage** - Images stored securely
- 📱 **Mobile Friendly** - Works on all devices
- ⚡ **Fast & Secure** - Built with modern tech

## 🏗️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4  
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL (Vercel)
- **Storage**: Vercel Blob Storage
- **AI**: Replicate FLUX model
- **Deployment**: Vercel

## 🆘 Need Help?

### Common Issues:

**"Command not found: vercel"**
```bash
npm install -g vercel
```

**"Permission denied: ./scripts/setup.sh"**
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

**Environment variables not working?**
```bash
vercel env ls  # Check what's set
vercel env pull .env.local  # Pull to local
```

**Database connection issues?**
```bash
npx prisma db push --force-reset
```

### Still Stuck?
- Check the [Vercel Documentation](https://vercel.com/docs)
- Make sure all API keys are correct
- Try redeploying: `vercel --prod`

---

🎉 **You're all set!** Start generating amazing AI images with your new platform!

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
   - Wait up to a few hours for full propagation

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

## 🤖 AI-Powered Development with Claude Code & Cursor

Take your development experience to the next level with AI-powered IDEs that understand your codebase and can help you build faster.

### Claude Code (by Anthropic)

**What is Claude Code?**
Claude Code is an AI-powered development environment that provides intelligent code assistance, debugging, and project understanding.

**Installation & Setup:**
1. **Install Node.js (Required for npm)**:
   ```bash
   # Install Homebrew (if not already installed)
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install Node.js and npm
   brew install node
   ```

2. **Install Claude Code**:
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

3. **Navigate to your project directory and type **
   ```bash
   claude
   ```

** then press enter to begin **.

**Key Features for This Project:**
- 🧠 **Intelligent Code Completion** - Understands Next.js, TypeScript, and Prisma
- 🔍 **Smart Debugging** - Helps identify and fix issues in your AI image generation logic
- 📝 **Documentation Generation** - Auto-generates comments and docs
- 🔄 **Refactoring Assistance** - Suggests improvements to your React components

### Cursor (AI-First Code Editor)

**What is Cursor?**
Cursor is a fork of VS Code with built-in AI capabilities, perfect for modern web development.

**Installation & Setup:**
1. **Download**: Go to [cursor.sh](https://cursor.sh)
2. **Install**: Download for your operating system:
   - **macOS**: Download `.dmg` file and drag to Applications
   - **Windows**: Download `.exe` installer and run
   - **Linux**: Download `.AppImage` or use package manager

3. **Open Your Project**:
   ```bash
   # Navigate to your project directory
   cd /path/to/your/imagegen-project
   
   # Open with Cursor
   cursor .
   
   # Or if cursor command isn't available:
   # Just open Cursor app and use File > Open Folder
   ```

**Essential Cursor Features for This Project:**

#### 🎯 **Cmd+K (Ctrl+K)** - AI Code Generation
```bash
# Examples you can try:
Cmd+K "Add error handling to the image generation API"
Cmd+K "Create a loading spinner component for image generation"
Cmd+K "Add image download functionality to the gallery"
```

#### 💬 **Cmd+L (Ctrl+L)** - Chat with Your Codebase
Ask questions about your project:
- "How does the authentication flow work?"
- "Where are images stored and how can I add image metadata?"
- "How can I add image editing features?"

#### 🔧 **Cmd+I (Ctrl+I)** - Inline AI Editing
Select code and use Cmd+I to:
- Optimize performance
- Add TypeScript types
- Refactor components
- Add error handling

### Recommended Cursor Extensions for This Project

Install these extensions for the best experience:

```bash
# Essential extensions for Next.js development
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prisma
- TypeScript Importer
- Auto Rename Tag
- Bracket Pair Colorizer
- GitLens
```

### AI Development Workflow Tips

#### 1. **Project Understanding**
When you first open the project, ask your AI assistant:
```
"Can you explain the overall architecture of this ImageGen application?"
"What are the main components and how do they interact?"
```

#### 2. **Feature Development**
Use AI to help build new features:
```
"Help me add a feature to let users edit generated images"
"Create a component for image sharing on social media"
"Add image categorization and tagging"
```

#### 3. **Debugging & Optimization**
Get help with issues:
```
"The image generation is slow, how can I optimize it?"
"Users are reporting login issues, help me debug the auth flow"
"How can I add better error handling for API failures?"
```

#### 4. **Code Review & Refactoring**
Improve your code quality:
```
"Review this component for best practices"
"Help me refactor this API route for better performance"
"Suggest improvements for this database query"
```

### Getting Started with AI Development

1. **Open your project** in Cursor or Claude Code
2. **Start with exploration**: Ask "What does this codebase do?"
3. **Try small changes**: Use Cmd+K to add a simple feature
4. **Build incrementally**: Use AI to help implement larger features step by step
5. **Learn as you go**: Ask questions about patterns and best practices

### Pro Tips for AI-Assisted Development

- 📝 **Be specific**: Instead of "fix this", say "add error handling for network failures"
- 🎯 **Context matters**: Select relevant code before asking questions
- 🔄 **Iterate**: Use AI suggestions as starting points, then refine
- 📚 **Learn**: Ask "why" to understand the reasoning behind suggestions
- 🧪 **Test**: Always test AI-generated code thoroughly

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### What this means:
- ✅ **Commercial use** - Use this project for commercial purposes
- ✅ **Modification** - Modify and adapt the code
- ✅ **Distribution** - Distribute copies of the software
- ✅ **Private use** - Use the software privately
- ✅ **Patent use** - Use any patents contributed by the authors

**Attribution required** - Include the original copyright notice and license in any copy of the software.

🎉 **Congratulations!** Your ImageGen application is now fully deployed and configured. Users can register, log in, and generate AI images with a professional setup including custom domain and proper environment management.

🚀 **Ready to build more?** Fire up Cursor or Claude Code and start enhancing your AI image generation platform with the power of AI-assisted development!
