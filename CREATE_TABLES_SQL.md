# 🗄️ Create Tables SQL - For Supabase SQL Editor

Since Prisma `db push` is failing due to authentication, you can create the tables directly in Supabase SQL Editor.

## 🚀 Quick Steps

1. **Go to Supabase SQL Editor**:
   - https://supabase.com/dashboard/project/otwwbtndkwkzgjqozcfn/sql/new

2. **Run the SQL below** (copy and paste)

3. **Then restore your data** from `database_dump_public_only.sql`

## 📋 SQL to Create Tables

Run this SQL in Supabase SQL Editor:

```sql
-- Create Enum Types
CREATE TYPE public."UserRole" AS ENUM ('ADMIN', 'BUYER');
CREATE TYPE public."OrderStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');
CREATE TYPE public."ProductStatus" AS ENUM ('CONCEPT', 'ACTIEF', 'NIET_BESCHIKBAAR', 'VERVALLEN');
CREATE TYPE public."ReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE public."PicklistStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
CREATE TYPE public."PickItemStatus" AS ENUM ('PENDING', 'PICKED', 'PARTIALLY_PICKED', 'OUT_OF_STOCK');
CREATE TYPE public."POSSessionStatus" AS ENUM ('ACTIVE', 'PAUSED', 'CLOSED', 'CANCELLED');
CREATE TYPE public."POSTransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED', 'REFUNDED');
CREATE TYPE public."PaymentMethod" AS ENUM ('CASH', 'CARD', 'BANK_TRANSFER', 'MOBILE_PAYMENT', 'GIFT_CARD', 'OTHER');
CREATE TYPE public."PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED');
CREATE TYPE public."ScrapingHealthStatus" AS ENUM ('HEALTHY', 'DEGRADED', 'UNHEALTHY', 'OFFLINE');
CREATE TYPE public."ScrapingJobStatus" AS ENUM ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED');
CREATE TYPE public."ScrapingAlertType" AS ENUM ('MARGIN_OPPORTUNITY', 'PRICE_DROP', 'COMPETITOR_ALERT', 'SUPPLY_ISSUE', 'DATA_QUALITY');

-- Note: The actual table creation SQL should be generated from your Prisma schema
-- For now, try to fix the authentication issue and use: npx prisma db push
```

## 🔧 Better Solution: Fix Authentication

The best approach is to fix the authentication so Prisma can push the schema:

### Step 1: Add IP to Supabase Allowlist

1. Go to: https://supabase.com/dashboard/project/otwwbtndkwkzgjqozcfn
2. **Settings** → **Database** → **Connection Pooling**
3. Find **"Allowed IPs"** or **"Network Restrictions"**
4. Add your current IP (find it: https://whatismyipaddress.com/)
5. Or temporarily allow all IPs (0.0.0.0/0) for testing

### Step 2: Push Prisma Schema

```bash
npx prisma db push --skip-generate
```

This will create all tables automatically based on your `prisma/schema.prisma` file.

## 📝 Alternative: Generate SQL from Prisma

If you want to generate the SQL manually:

```bash
# Try to create a migration (this might also fail due to auth)
npx prisma migrate dev --create-only --name init

# If that works, the SQL will be in:
# prisma/migrations/[timestamp]_init/migration.sql
```

## ✅ After Tables Are Created

1. **Restore your data**:
   - Use Supabase SQL Editor
   - Copy content from `database_dump_public_only.sql`
   - Paste and run

2. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

3. **Verify**:
   ```bash
   npx prisma studio
   ```

## 🆘 Still Having Issues?

If authentication continues to fail:

1. **Check Supabase Dashboard** for connection string format
2. **Verify password** is correct (not URL-encoded in Supabase dashboard)
3. **Try resetting database password** in Supabase
4. **Use Supabase SQL Editor** to create tables manually (copy from Prisma schema)



