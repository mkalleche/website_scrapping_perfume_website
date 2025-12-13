# 🔄 Supabase Project Migration Guide

This guide will help you switch to a new Supabase project and recreate all database tables using Prisma.

## 📋 Step-by-Step Process

### Step 1: Create New Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in project details:
   - **Name**: Choose a name (e.g., `perfumex-new`)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
4. Click **"Create new project"** (takes 1-2 minutes)

### Step 2: Get New Supabase Credentials

Once your project is created:

1. Go to **Project Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Anon public key**: `eyJhbGci...` (anon key)
   - **Service role key**: `eyJhbGci...` (service role key - keep secret!)

3. Go to **Project Settings** → **Database**
4. Find **Connection string** section
5. Copy the **Connection pooling** URL (port 6543) for `DATABASE_URL`
6. Copy the **Direct connection** URL (port 5432) for `DIRECT_URL`

### Step 3: Update Environment Variables

Update your `.env.local` file with the new credentials:

```env
# Database (Supabase) - Dual Connection Strategy
# Runtime: Transaction Pooler (port 6543) - for Vercel serverless functions
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=20&pool_timeout=20&sslmode=require&prepared=false"

# Migrations: Direct Connection (port 5432) - for Prisma migrations and schema changes
DIRECT_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres?sslmode=require"

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=[YOUR_SERVICE_ROLE_KEY]
```

**Example:**
```env
DATABASE_URL="postgresql://postgres.abcdefghijklmnop:MyPassword123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=20&pool_timeout=20&sslmode=require&prepared=false"
DIRECT_URL="postgresql://postgres.abcdefghijklmnop:MyPassword123@aws-0-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require"
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 4: Create Database Tables with Prisma

You have two options:

#### Option A: Using Prisma Migrate (Recommended for Production)

```bash
# 1. Generate Prisma Client
npx prisma generate

# 2. Create initial migration from schema
npx prisma migrate dev --name init

# 3. This will:
#    - Create a migrations folder
#    - Apply all tables to your new database
#    - Generate the Prisma client
```

#### Option B: Using Prisma DB Push (Faster for Development)

```bash
# 1. Generate Prisma Client
npx prisma generate

# 2. Push schema directly to database (no migration history)
npx prisma db push

# Note: This is faster but doesn't create migration files
```

### Step 5: Seed the Database (Optional)

If you want to populate with initial data:

```bash
npx prisma db seed
```

Or use the npm script:
```bash
npm run db:seed
```

### Step 6: Verify Connection

Test that everything works:

```bash
# Test database connection
npm run debug:database

# Or start the dev server
npm run dev
```

### Step 7: Setup Supabase Storage (for Images)

1. Go to **Storage** in your Supabase dashboard
2. Click **"Create bucket"**
3. Name it: `product-images`
4. Make it **Public** (for public image access)
5. Click **"Create bucket"**

## 🔍 Verification Checklist

- [ ] New Supabase project created
- [ ] `.env.local` updated with new credentials
- [ ] `DATABASE_URL` and `DIRECT_URL` are correct
- [ ] `NEXT_PUBLIC_SUPABASE_URL` updated
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` updated
- [ ] `SUPABASE_SERVICE_ROLE_KEY` updated
- [ ] Prisma client generated (`npx prisma generate`)
- [ ] Database tables created (migration or push)
- [ ] Database seeded (optional)
- [ ] Storage bucket created
- [ ] Connection tested successfully

## 🚨 Troubleshooting

### Issue: "Connection refused" or "Connection timeout"

**Solution:**
- Check that your IP is allowed in Supabase (Settings → Database → Connection Pooling)
- Verify the connection strings are correct
- Make sure you're using the correct port (6543 for pooler, 5432 for direct)

### Issue: "Migration failed" or "Schema push failed"

**Solution:**
- Make sure `DIRECT_URL` is set correctly (required for migrations)
- Check that the database password is correct
- Try using `npx prisma db push` instead of migrate

### Issue: "Prisma Client not generated"

**Solution:**
```bash
npx prisma generate
```

### Issue: Storage bucket errors

**Solution:**
- Make sure the bucket name matches `product-images` (or update `lib/supabase.ts`)
- Verify the bucket is set to public
- Check RLS policies if needed

## 📊 What Gets Created

When you run the migration, Prisma will create these tables:

- `users` - User accounts and authentication
- `products` - Product catalog
- `product_images` - Product images
- `customers` - Customer information
- `customer_prices` - Customer-specific pricing
- `customer_margins` - Category-based margins
- `customer_discounts` - Brand discounts
- `customer_hidden_categories` - Hidden categories per customer
- `volume_discounts` - Quantity-based discounts
- `orders` - Order management
- `order_items` - Order line items
- `picklists` - Warehouse picklists
- `picklist_items` - Picklist line items
- `reviews` - Product reviews
- `promotions` - Promotional campaigns
- `audit_logs` - Activity tracking
- `import_history` - Import tracking
- `export_history` - Export tracking
- `pos_sessions` - POS sessions
- `pos_transactions` - POS transactions
- `pos_items` - POS transaction items
- `inventory_scans` - Inventory scanning
- `suppliers` - Supplier information
- `normalized_products` - Normalized product data
- `price_scraping_sources` - Scraping sources
- `price_scraping_results` - Scraping results
- `price_scraping_jobs` - Scraping jobs
- `currency_rates` - Currency conversion
- `scraping_alerts` - Price alerts
- And more...

## 🔄 Quick Migration Script

You can also use the provided migration script:

```bash
npm run migrate:new-project
```

This script will:
1. Verify environment variables
2. Generate Prisma client
3. Create migration
4. Apply to database
5. Seed initial data (optional)

## 📝 Notes

- **Backup First**: If you have existing data, export it before switching projects
- **Migration History**: Using `prisma migrate dev` creates migration files you can version control
- **Direct URL**: Required for migrations, use the direct connection (port 5432)
- **Pooler URL**: Use for runtime connections (port 6543) for better performance
- **Storage**: Don't forget to create the storage bucket for images

## 🎯 Next Steps

After migration:
1. Test all features in your application
2. Verify image uploads work
3. Check authentication flows
4. Test API endpoints
5. Update any hardcoded references to old project

---

**Need Help?** Check the main README.md or create an issue.


