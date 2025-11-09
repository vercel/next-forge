#!/bin/bash

# QR Platform - Vercel CLI Deployment Script
# Run this on your local machine

set -e  # Exit on error

echo "🚀 QR Platform - Vercel Deployment"
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Vercel CLI not found. Installing...${NC}"
    npm i -g vercel
fi

# Check if we're in the right directory
if [ ! -d "apps/app" ]; then
    echo -e "${YELLOW}Error: Please run this script from the next-forge root directory${NC}"
    exit 1
fi

echo -e "${BLUE}Step 1: Login to Vercel${NC}"
vercel login

echo ""
echo -e "${BLUE}Step 2: Navigate to app directory${NC}"
cd apps/app

echo ""
echo -e "${BLUE}Step 3: Link or create Vercel project${NC}"
vercel link

echo ""
echo -e "${GREEN}✓ Project linked!${NC}"
echo ""

# Prompt for environment variables
echo -e "${BLUE}Step 4: Set up environment variables${NC}"
echo ""
echo "You'll need the following:"
echo "1. DATABASE_URL (from https://neon.tech)"
echo "2. Clerk keys (from https://clerk.com)"
echo ""

read -p "Have you created a Neon database? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${YELLOW}Please create a Neon database first:${NC}"
    echo "1. Go to https://neon.tech"
    echo "2. Create a new project"
    echo "3. Copy the connection string"
    echo ""
    read -p "Press enter when ready..."
fi

read -p "Have you created a Clerk application? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${YELLOW}Please create a Clerk application first:${NC}"
    echo "1. Go to https://clerk.com"
    echo "2. Create a new application"
    echo "3. Copy the publishable and secret keys"
    echo ""
    read -p "Press enter when ready..."
fi

echo ""
echo "Adding environment variables..."
echo ""

# Add DATABASE_URL
echo -e "${BLUE}Enter your DATABASE_URL:${NC}"
read -r DATABASE_URL
echo "$DATABASE_URL" | vercel env add DATABASE_URL production

# Add Clerk keys
echo ""
echo -e "${BLUE}Enter your NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:${NC}"
read -r CLERK_PUB_KEY
echo "$CLERK_PUB_KEY" | vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production

echo ""
echo -e "${BLUE}Enter your CLERK_SECRET_KEY:${NC}"
read -r CLERK_SECRET_KEY
echo "$CLERK_SECRET_KEY" | vercel env add CLERK_SECRET_KEY production

# Add sign-in/up URLs
echo "/sign-in" | vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_URL production
echo "/sign-up" | vercel env add NEXT_PUBLIC_CLERK_SIGN_UP_URL production

echo ""
echo -e "${GREEN}✓ Environment variables set!${NC}"
echo ""

# Deploy to production
echo -e "${BLUE}Step 5: Deploying to production...${NC}"
vercel --prod

echo ""
echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo ""

# Database migration
echo -e "${BLUE}Step 6: Running database migration${NC}"
echo ""
echo "Now we need to create the database tables..."
echo ""

cd ../../packages/database

# Set DATABASE_URL locally for migration
export DATABASE_URL="$DATABASE_URL"

echo "Generating Prisma client..."
npx prisma generate

echo ""
echo "Pushing schema to database..."
npx prisma db push

echo ""
echo -e "${GREEN}✓ Database migration complete!${NC}"
echo ""

# Get deployment URL
cd ../../apps/app
DEPLOYMENT_URL=$(vercel inspect --prod 2>/dev/null | grep "https://" | head -1 || echo "Check Vercel dashboard")

echo ""
echo "=========================================="
echo -e "${GREEN}🚀 Your QR Platform is LIVE!${NC}"
echo "=========================================="
echo ""
echo "Deployment URL: $DEPLOYMENT_URL"
echo ""
echo "Next steps:"
echo "1. Visit your deployment URL"
echo "2. Sign in with Clerk"
echo "3. Create your first short link"
echo "4. Generate a QR code"
echo ""
echo "Need help? Check DEPLOYMENT.md"
echo ""
