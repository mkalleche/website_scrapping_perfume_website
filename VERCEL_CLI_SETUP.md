# 🚀 Vercel CLI Setup Guide

Complete guide to connect and deploy your project using Vercel CLI.

## 📋 Prerequisites

- Node.js 18+ installed
- Vercel account (free tier available)
- Git repository (optional, but recommended)
- Project dependencies installed (`npm install` or `pnpm install`)

## 🔧 Step 1: Install Vercel CLI

### Option A: Install Globally (Recommended)

```bash
npm install -g vercel
```

### Option B: Use npx (No Installation)

```bash
npx vercel
```

### Option C: Install Locally

```bash
npm install --save-dev vercel
```

Then use with:
```bash
npx vercel
```

## 🔐 Step 2: Login to Vercel

```bash
vercel login
```

This will:
1. Open your browser
2. Ask you to authorize the CLI
3. Complete the login process

**Alternative: Email Login**
```bash
vercel login your-email@example.com
```

## 🔗 Step 3: Link Your Project

Navigate to your project directory and link it:

```bash
cd perfumex
vercel link
```

You'll be prompted to:
1. **Set up and deploy?** → Choose `Y` (Yes)
2. **Which scope?** → Select your account/team
3. **Link to existing project?** → Choose `N` (No) for new project, or `Y` to link to existing
4. **Project name?** → Enter a name (e.g., `perfumex` or press Enter for default)
5. **Directory?** → Press Enter (current directory)

**Or link to existing project:**
```bash
vercel link --project=your-project-name
```

## 📝 Step 4: Set Environment Variables

### Option A: Using Vercel CLI (Recommended)

Set environment variables one by one:

```bash
# Database
vercel env add DATABASE_URL production
vercel env add DIRECT_URL production
vercel env add DATABASE_URL preview
vercel env add DIRECT_URL preview
vercel env add DATABASE_URL development
vercel env add DIRECT_URL development

# Authentication
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production
vercel env add NEXTAUTH_SECRET preview
vercel env add NEXTAUTH_URL preview
vercel env add NEXTAUTH_SECRET development
vercel env add NEXTAUTH_URL development

# Supabase
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add NEXT_PUBLIC_SUPABASE_URL preview
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview
vercel env add SUPABASE_SERVICE_ROLE_KEY preview
vercel env add NEXT_PUBLIC_SUPABASE_URL development
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development
vercel env add SUPABASE_SERVICE_ROLE_KEY development

# App Configuration
vercel env add NEXT_PUBLIC_APP_NAME production
vercel env add NEXT_PUBLIC_APP_URL production
vercel env add NEXT_PUBLIC_BASE_URL production
```

**For each variable:**
- Paste the value when prompted
- Press Enter to confirm

### Option B: Bulk Import from .env.local

Create a script to import all variables:

```bash
# Create import script (see below)
```

### Option C: Using Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add variables manually

## 🚀 Step 5: Deploy

### Deploy to Preview (Development)

```bash
vercel
```

This creates a preview deployment with a unique URL.

### Deploy to Production

```bash
vercel --prod
```

### Deploy with Specific Environment

```bash
# Production
vercel --prod

# Preview (default)
vercel

# Development
vercel dev
```

## 📊 Step 6: Verify Deployment

After deployment, you'll get:
- **Preview URL**: `https://your-project-xyz.vercel.app`
- **Production URL**: `https://your-project.vercel.app` (if custom domain configured)

Test your deployment:
1. Visit the URL
2. Check API routes
3. Verify database connection
4. Test authentication

## 🔍 Useful Vercel CLI Commands

### View Project Info

```bash
vercel ls
```

### View Deployment Logs

```bash
vercel logs
```

### View Specific Deployment

```bash
vercel inspect [deployment-url]
```

### Remove Project Link

```bash
vercel unlink
```

### Pull Environment Variables

```bash
vercel env pull .env.local
```

This downloads all environment variables to your local `.env.local` file.

### View Environment Variables

```bash
vercel env ls
```

### Remove Environment Variable

```bash
vercel env rm VARIABLE_NAME production
```

## 🛠️ Advanced Configuration

### Custom Build Command

If needed, you can override the build command in `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### Project Settings

View current project settings:

```bash
vercel project ls
```

### Domain Management

```bash
# Add domain
vercel domains add yourdomain.com

# List domains
vercel domains ls

# Remove domain
vercel domains rm yourdomain.com
```

## 📦 Environment Variables Reference

Here's the complete list of environment variables you need:

```env
# Database (Supabase)
DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=20&pool_timeout=20&sslmode=require&prepared=false"
DIRECT_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres?sslmode=require"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-project.vercel.app"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://[REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# App Configuration
NEXT_PUBLIC_APP_NAME="Project X"
NEXT_PUBLIC_APP_URL="https://your-project.vercel.app"
NEXT_PUBLIC_BASE_URL="https://your-project.vercel.app"

# Email (Optional)
EMAIL_FROM="noreply@your-app.com"
EMAIL_SERVER_HOST="smtp.resend.com"
EMAIL_SERVER_PORT="587"
RESEND_API_KEY="your-resend-api-key"

# Features
ENABLE_NOTIFICATIONS="true"
ENABLE_OFFLINE_MODE="true"
ENABLE_PWA="true"

# Development
SKIP_MIDDLEWARE="false"

# Sentry (Optional)
SENTRY_DSN="your-sentry-dsn"
```

## 🔄 Workflow Examples

### Daily Development Workflow

```bash
# 1. Make changes locally
# 2. Test locally
npm run dev

# 3. Deploy to preview
vercel

# 4. Test preview URL
# 5. Deploy to production when ready
vercel --prod
```

### CI/CD Integration

The project is automatically linked to Git, so:
- **Push to main branch** → Auto-deploy to production
- **Push to other branches** → Auto-deploy to preview

### Manual Deployment

```bash
# Always deploy manually
vercel --prod
```

## 🐛 Troubleshooting

### Issue: "Project not found"

**Solution:**
```bash
vercel link
```

### Issue: "Authentication failed"

**Solution:**
```bash
vercel logout
vercel login
```

### Issue: "Environment variables not working"

**Solution:**
1. Check variables are set: `vercel env ls`
2. Redeploy: `vercel --prod`
3. Verify in dashboard

### Issue: "Build failed"

**Solution:**
1. Check build logs: `vercel logs`
2. Test build locally: `npm run build`
3. Check `vercel.json` configuration

### Issue: "Database connection failed"

**Solution:**
1. Verify `DATABASE_URL` is set correctly
2. Check Supabase IP allowlist
3. Use connection pooler URL (port 6543)

## 📝 Quick Reference

```bash
# Install
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Deploy preview
vercel

# Deploy production
vercel --prod

# View deployments
vercel ls

# View logs
vercel logs

# Pull env vars
vercel env pull .env.local

# List env vars
vercel env ls
```

## 🎯 Next Steps

After setup:
1. ✅ Deploy to preview and test
2. ✅ Configure custom domain (optional)
3. ✅ Set up automatic deployments from Git
4. ✅ Configure monitoring and analytics
5. ✅ Set up database migrations for production

---

**Need Help?** Check [Vercel CLI Documentation](https://vercel.com/docs/cli) or create an issue.

