#!/bin/bash

# ImageGen - Vercel Environment Variables Setup Script
# This script helps you set up all required environment variables across all Vercel environments

echo "🚀 ImageGen - Vercel Environment Setup"
echo "======================================"
echo ""
echo "This script will help you configure all environment variables for:"
echo "✅ Production environment"
echo "✅ Preview environment" 
echo "✅ Development environment"
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed. Please install it first:"
    echo "   npm install -g vercel"
    exit 1
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "❌ You are not logged in to Vercel. Please login first:"
    echo "   vercel login"
    exit 1
fi

echo "🔧 Please provide the following environment variables:"
echo ""

# Prompt for all required values
read -p "📊 Enter your DATABASE_URL (from Vercel Postgres): " DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL is required"
    exit 1
fi

read -p "💾 Enter your BLOB_READ_WRITE_TOKEN (from Vercel Blob): " BLOB_READ_WRITE_TOKEN
if [ -z "$BLOB_READ_WRITE_TOKEN" ]; then
    echo "❌ BLOB_READ_WRITE_TOKEN is required"
    exit 1
fi

read -p "🤖 Enter your REPLICATE_API_TOKEN (from replicate.com): " REPLICATE_API_TOKEN
if [ -z "$REPLICATE_API_TOKEN" ]; then
    echo "❌ REPLICATE_API_TOKEN is required"
    exit 1
fi

read -p "🧠 Enter your OPENAI_API_KEY (from platform.openai.com): " OPENAI_API_KEY
if [ -z "$OPENAI_API_KEY" ]; then
    echo "❌ OPENAI_API_KEY is required"
    exit 1
fi

# Generate NEXTAUTH_SECRET automatically
echo "🔐 Generating NEXTAUTH_SECRET..."
NEXTAUTH_SECRET=$(openssl rand -base64 32)
if [ -z "$NEXTAUTH_SECRET" ]; then
    echo "❌ Failed to generate NEXTAUTH_SECRET. Please ensure openssl is installed."
    exit 1
fi
echo "✅ Generated NEXTAUTH_SECRET: $NEXTAUTH_SECRET"

read -p "🌐 Enter your production URL (e.g., yourdomain.com or https://yourdomain.com): " NEXTAUTH_URL
if [ -z "$NEXTAUTH_URL" ]; then
    echo "❌ NEXTAUTH_URL is required"
    exit 1
fi

# Add https:// if not present
if [[ ! "$NEXTAUTH_URL" =~ ^https?:// ]]; then
    NEXTAUTH_URL="https://$NEXTAUTH_URL"
    echo "✅ Added https:// protocol: $NEXTAUTH_URL"
fi

echo ""
echo "🔄 Setting up environment variables..."
echo ""

# Function to add environment variable
add_env_var() {
    local name=$1
    local value=$2
    local env=$3
    
    echo "Adding $name to $env environment..."
    if echo "$value" | vercel env add "$name" "$env" > /dev/null 2>&1; then
        echo "✅ $name added to $env"
    else
        echo "⚠️  $name might already exist in $env (this is okay)"
    fi
}

# Add to Production environment
echo "📦 Setting up Production environment..."
add_env_var "DATABASE_URL" "$DATABASE_URL" "production"
add_env_var "BLOB_READ_WRITE_TOKEN" "$BLOB_READ_WRITE_TOKEN" "production"
add_env_var "REPLICATE_API_TOKEN" "$REPLICATE_API_TOKEN" "production"
add_env_var "OPENAI_API_KEY" "$OPENAI_API_KEY" "production"
add_env_var "NEXTAUTH_SECRET" "$NEXTAUTH_SECRET" "production"
add_env_var "NEXTAUTH_URL" "$NEXTAUTH_URL" "production"

echo ""

# Add to Preview environment
echo "🔍 Setting up Preview environment..."
add_env_var "DATABASE_URL" "$DATABASE_URL" "preview"
add_env_var "BLOB_READ_WRITE_TOKEN" "$BLOB_READ_WRITE_TOKEN" "preview"
add_env_var "REPLICATE_API_TOKEN" "$REPLICATE_API_TOKEN" "preview"
add_env_var "OPENAI_API_KEY" "$OPENAI_API_KEY" "preview"
add_env_var "NEXTAUTH_SECRET" "$NEXTAUTH_SECRET" "preview"
add_env_var "NEXTAUTH_URL" "$NEXTAUTH_URL" "preview"

echo ""

# Add to Development environment (with localhost URL)
echo "🛠️  Setting up Development environment..."
add_env_var "DATABASE_URL" "$DATABASE_URL" "development"
add_env_var "BLOB_READ_WRITE_TOKEN" "$BLOB_READ_WRITE_TOKEN" "development"
add_env_var "REPLICATE_API_TOKEN" "$REPLICATE_API_TOKEN" "development"
add_env_var "OPENAI_API_KEY" "$OPENAI_API_KEY" "development"
add_env_var "NEXTAUTH_SECRET" "$NEXTAUTH_SECRET" "development"
add_env_var "NEXTAUTH_URL" "http://localhost:3000" "development"

echo ""
echo "🎉 Environment variables setup complete!"
echo ""
echo "🔧 Setting up database..."

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Push database schema
echo "Pushing database schema..."
npx prisma db push

echo ""
echo "✅ Database setup complete!"
echo ""
echo "Next steps:"
echo "1. Deploy your application: vercel --prod"
echo "2. Visit your deployed application"
echo "3. Start developing locally: npm run dev"
echo ""
echo "📋 You can verify your environment variables with:"
echo "   vercel env ls"