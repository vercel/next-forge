# 🚀 Vercel CLI Deployment Guide

Two ways to deploy: **Automated Script** or **Manual Steps**

---

## Option 1: Automated Script (Easiest)

Just run this **on your local machine**:

```bash
cd /path/to/next-forge
./DEPLOY.sh
```

This script will:
- ✅ Install/check Vercel CLI
- ✅ Login to Vercel
- ✅ Set up environment variables
- ✅ Deploy to production
- ✅ Run database migrations

**You'll need:**
1. Neon database URL ([get here](https://neon.tech))
2. Clerk API keys ([get here](https://clerk.com))

---

## Option 2: Manual Steps

Run these commands **on your local machine**:

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Login

```bash
vercel login
```

### Step 3: Navigate to App

```bash
cd apps/app
```

### Step 4: Deploy

```bash
vercel
```

**You'll see prompts:**
```
? Set up and deploy? Yes
? Which scope? [Select your account/team]
? Link to existing project? No
? What's your project's name? qr-platform
? In which directory is your code located? ./
```

### Step 5: Add Environment Variables

```bash
# Database
vercel env add DATABASE_URL
# Paste: postgresql://... (from Neon)
# Select: Production, Preview, Development

# Clerk Publishable Key
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# Paste: pk_test_...
# Select: Production, Preview, Development

# Clerk Secret Key
vercel env add CLERK_SECRET_KEY
# Paste: sk_test_...
# Select: Production, Preview, Development

# Sign In URL
vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_URL
# Paste: /sign-in
# Select: Production, Preview, Development

# Sign Up URL
vercel env add NEXT_PUBLIC_CLERK_SIGN_UP_URL
# Paste: /sign-up
# Select: Production, Preview, Development
```

### Step 6: Deploy to Production

```bash
vercel --prod
```

Wait 2-3 minutes for build to complete.

### Step 7: Run Database Migration

```bash
# Navigate to database package
cd ../../packages/database

# Set your DATABASE_URL
export DATABASE_URL="postgresql://..." # Your Neon URL

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

You should see:
```
✔ Generated Prisma Client
✔ The database is now in sync with the Prisma schema
```

---

## 🎯 Verify Deployment

### Check Deployment URL

```bash
cd ../../apps/app
vercel inspect --prod
```

Or check your [Vercel Dashboard](https://vercel.com/dashboard)

### Test Your App

1. Visit your deployment URL
2. Click "Sign In"
3. Create an account (Clerk handles this)
4. You should see the Links dashboard
5. Click "Create Link" → Make your first short link!
6. Generate a QR code
7. Test redirect: `your-url.vercel.app/r/your-slug`

---

## 🔑 Getting API Keys

### Neon Database (2 minutes)

1. Go to: https://neon.tech
2. Sign up (free)
3. Create new project: "qr-platform"
4. Select region: US East (closest to Vercel)
5. Copy connection string from dashboard
6. Format: `postgresql://user:pass@host/db?sslmode=require`

### Clerk Authentication (3 minutes)

1. Go to: https://clerk.com
2. Sign up (free)
3. Create application: "QR Platform"
4. Select sign-in methods: Email, Google (or your choice)
5. Go to: **API Keys** in sidebar
6. Copy:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

**Important:** In Clerk, also configure:
- **Paths**: Add your Vercel URL to allowed origins
- **Organizations**: Enable if you want team features

---

## 🐛 Troubleshooting

### "Command not found: vercel"

```bash
# Install globally
npm i -g vercel

# Or use npx
npx vercel
```

### "No Space Left" Error

```bash
# Clear npm cache
npm cache clean --force
vercel pull --yes
vercel --prod
```

### "Prisma Client not found"

```bash
cd packages/database
rm -rf node_modules generated
pnpm install
npx prisma generate
```

### "Database connection error"

Check DATABASE_URL format:
- ✅ `postgresql://user:pass@host/db?sslmode=require`
- ❌ Missing `?sslmode=require`
- ❌ Wrong username/password

Test connection:
```bash
cd packages/database
npx prisma db pull
```

### "Unauthorized" in App

Check Clerk environment variables:
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Verify all Clerk keys are set
3. Redeploy: `vercel --prod`

### Build Fails

Check Vercel build logs:
```bash
vercel logs [deployment-url]
```

Common fixes:
- Ensure `pnpm` is installed (Vercel auto-detects from `pnpm-lock.yaml`)
- Check `vercel.json` has correct `buildCommand`
- Verify all dependencies are in `package.json`

---

## 📊 Monitor Your Deployment

### View Logs

```bash
# Real-time logs
vercel logs --follow

# Function logs
vercel logs [deployment-url] -f
```

### Check Build Status

```bash
vercel inspect [deployment-url]
```

### Metrics

Go to [Vercel Dashboard](https://vercel.com/dashboard) → Your Project → Analytics

You'll see:
- Page views
- Function invocations
- Error rate
- Performance metrics

---

## 🚦 Next: Custom Domain (Optional)

### Add Your Domain

```bash
vercel domains add yourdomain.com
```

Or in Vercel Dashboard:
1. Project Settings → Domains
2. Add domain: `qr.yourdomain.com`
3. Add DNS records (Vercel shows you what to add)
4. Wait for SSL certificate (automatic)

### Update Your Code

After adding custom domain, update the default:

```typescript
// apps/app/app/actions/links.ts
// Change default domain from localhost:3000 to your domain
domain: data.domain || "qr.yourdomain.com"
```

Redeploy:
```bash
vercel --prod
```

---

## 🎉 You're Live!

Your QR Platform is now deployed at:
```
https://your-project-xyz.vercel.app
```

**What's Next?**
1. ✅ Create test links
2. ✅ Generate QR codes
3. ✅ Share with beta users
4. ✅ Set up custom domain
5. ✅ Add more features (see `QR_PLATFORM_SUMMARY.md`)

Need help? Check:
- `DEPLOYMENT.md` - Full deployment guide
- `QR_PLATFORM_SUMMARY.md` - Feature roadmap
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)

---

## 🔄 Updating Your Deployment

When you make changes:

```bash
# Make your changes locally
git add .
git commit -m "feat: add new feature"
git push

# Deploy updated version
cd apps/app
vercel --prod
```

Vercel also auto-deploys when you push to your GitHub repo!

---

**Happy deploying! 🚀**
