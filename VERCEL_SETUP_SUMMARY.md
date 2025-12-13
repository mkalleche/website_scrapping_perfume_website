# 📋 Vercel CLI Setup Summary

## ✅ What's Been Created

1. **VERCEL_CLI_SETUP.md** - Complete step-by-step guide
2. **VERCEL_QUICK_START.md** - Quick 5-minute setup guide
3. **scripts/vercel-env-import.ts** - Automated env var import script
4. **.vercelignore** - Files to exclude from deployment
5. **Updated package.json** - Added Vercel commands

## 🎯 Quick Start (3 Steps)

### Step 1: Install & Login
```bash
npm install -g vercel
vercel login
```

### Step 2: Link Project
```bash
vercel link
```

### Step 3: Import Env Vars & Deploy
```bash
# Import environment variables
npm run vercel:env:import production

# Deploy
vercel --prod
```

## 📝 Available Commands

```bash
# Environment Variables
npm run vercel:env:import production  # Import from .env.local
npm run vercel:env:pull              # Pull from Vercel to .env.local

# Deployment
vercel                                # Deploy to preview
vercel --prod                         # Deploy to production
vercel ls                             # List deployments
vercel logs                           # View logs
```

## 🔑 Environment Variables Needed

Make sure these are set in Vercel (for each environment):

**Required:**
- `DATABASE_URL`
- `DIRECT_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_BASE_URL`

**Optional:**
- `EMAIL_FROM`, `RESEND_API_KEY`
- `ENABLE_NOTIFICATIONS`, `ENABLE_PWA`
- `SENTRY_DSN`

## 🚀 Deployment Workflow

1. **Development**
   ```bash
   npm run dev  # Test locally
   ```

2. **Preview Deployment**
   ```bash
   vercel  # Creates preview URL
   ```

3. **Production Deployment**
   ```bash
   vercel --prod  # Deploys to production
   ```

## 🔄 Automatic Deployments

If your project is connected to Git:
- **Push to main** → Auto-deploys to production
- **Push to other branches** → Auto-deploys to preview

## 📚 Documentation

- **Full Guide**: `VERCEL_CLI_SETUP.md`
- **Quick Start**: `VERCEL_QUICK_START.md`
- **Vercel Docs**: https://vercel.com/docs/cli

## 🆘 Troubleshooting

**Issue: Not logged in**
```bash
vercel login
```

**Issue: Project not linked**
```bash
vercel link
```

**Issue: Environment variables missing**
```bash
npm run vercel:env:import production
vercel --prod  # Redeploy
```

**Issue: Build fails**
```bash
# Test build locally first
npm run build

# Check logs
vercel logs
```

## ✅ Checklist

Before deploying:
- [ ] Vercel CLI installed
- [ ] Logged in to Vercel
- [ ] Project linked
- [ ] Environment variables imported
- [ ] Build works locally (`npm run build`)
- [ ] Database migrations run on production DB
- [ ] Supabase storage bucket created

After deployment:
- [ ] Preview URL works
- [ ] Production URL works
- [ ] Authentication works
- [ ] Database connection works
- [ ] API routes work
- [ ] Images load correctly

---

**Ready to deploy?** Start with `VERCEL_QUICK_START.md`!

