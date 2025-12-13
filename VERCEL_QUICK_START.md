# ⚡ Vercel CLI Quick Start

## 🚀 5-Minute Setup

### 1. Install & Login

```bash
npm install -g vercel
vercel login
```

### 2. Link Project

```bash
cd perfumex
vercel link
```

Follow prompts:
- Set up and deploy? → **Y**
- Which scope? → **Your account**
- Link to existing? → **N** (new project)
- Project name? → **perfumex** (or Enter)
- Directory? → **Enter** (current)

### 3. Import Environment Variables

**Option A: Automated (Recommended)**
```bash
npm run vercel:env:import production
```

**Option B: Manual**
```bash
vercel env add DATABASE_URL production
# Paste value, press Enter
# Repeat for all variables
```

### 4. Deploy

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

## 📋 Required Environment Variables

Copy these from your `.env.local`:

```bash
DATABASE_URL
DIRECT_URL
NEXTAUTH_SECRET
NEXTAUTH_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_APP_NAME
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_BASE_URL
```

## 🔄 Common Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployments
vercel ls

# View logs
vercel logs

# Pull env vars locally
npm run vercel:env:pull

# Import env vars to Vercel
npm run vercel:env:import production
```

## ✅ Verification

After deployment:
1. Visit the preview/production URL
2. Test login functionality
3. Check API routes
4. Verify database connection

## 🆘 Quick Fixes

**Not logged in?**
```bash
vercel login
```

**Project not linked?**
```bash
vercel link
```

**Env vars not working?**
```bash
vercel env ls
vercel --prod  # Redeploy
```

---

📖 **Full Guide**: See `VERCEL_CLI_SETUP.md`

