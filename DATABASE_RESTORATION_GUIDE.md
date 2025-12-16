# 📥 Database Dump Restoration Guide

This guide will help you restore your PostgreSQL database dump to the new Supabase project.

## ⚠️ Important Notes

1. **Authentication Issues**: If you're getting `P1000: Authentication failed` errors, check:
   - Your IP address is allowed in Supabase Dashboard → Settings → Database → Connection Pooling → Allowed IPs
   - The password is correctly URL-encoded in the connection string
   - You're using the correct connection string format

2. **Dump File**: The `database_dump.sql` file should contain your complete database dump. If it's incomplete, you'll need to provide the full dump.

## 🔧 Step 1: Verify Connection Strings

Your `.env.local` should have:

```env
DATABASE_URL="postgresql://postgres.otwwbtndkwkzgjqozcfn:Aliparfum%4099%21%21@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=20&pool_timeout=20&sslmode=require&prepared=false"

DIRECT_URL="postgresql://postgres.otwwbtndkwkzgjqozcfn:Aliparfum%4099%21%21@db.otwwbtndkwkzgjqozcfn.supabase.co:5432/postgres?sslmode=require"
```

**Note**: The password `Aliparfum@99!!` is URL-encoded as `Aliparfum%4099%21%21`

## 📋 Step 2: Check Supabase IP Allowlist

1. Go to your Supabase Dashboard
2. Navigate to **Settings** → **Database**
3. Scroll to **Connection Pooling** or **Network Restrictions**
4. Make sure your current IP address is allowed, or set it to allow all IPs (for testing)

## 🚀 Step 3: Push Prisma Schema

First, create the table structure using Prisma:

```bash
npx prisma generate
npx prisma db push --skip-generate
```

If you get authentication errors, try:
1. Check your IP is allowed in Supabase
2. Verify the password encoding
3. Try using the direct database host: `db.otwwbtndkwkzgjqozcfn.supabase.co:5432`

## 📥 Step 4: Restore Database Dump

### Option A: Using psql (Recommended)

If you have `psql` installed (comes with PostgreSQL):

```bash
# Test connection first
psql "postgresql://postgres.otwwbtndkwkzgjqozcfn:Aliparfum%4099%21%21@db.otwwbtndkwkzgjqozcfn.supabase.co:5432/postgres?sslmode=require" -c "SELECT 1;"

# Restore the dump (public schema only)
psql "postgresql://postgres.otwwbtndkwkzgjqozcfn:Aliparfum%4099%21%21@db.otwwbtndkwkzgjqozcfn.supabase.co:5432/postgres?sslmode=require" -f database_dump.sql
```

### Option B: Using the Restoration Script

```bash
npm run restore:dump
```

This script will:
1. Test the database connection
2. Push the Prisma schema
3. Filter the dump to extract only public schema content
4. Restore the filtered dump

### Option C: Manual Restoration via Supabase SQL Editor

1. Go to Supabase Dashboard → SQL Editor
2. Copy the relevant SQL from your dump file (public schema only)
3. Execute the SQL statements

## 🔍 Step 5: Filter the Dump (If Needed)

The dump contains Supabase system schemas (auth, storage, realtime) that should NOT be restored. 

To extract only public schema content, you can:

1. **Use the provided script**:
   ```bash
   npm run restore:dump
   ```

2. **Manually filter** using grep (Linux/Mac):
   ```bash
   grep -E "(CREATE TABLE public\.|INSERT INTO public\.|COPY public\.|CREATE TYPE public\.|ALTER TABLE public\.)" database_dump.sql > database_dump_filtered.sql
   ```

3. **Use a text editor** to remove:
   - All `CREATE SCHEMA auth`, `CREATE SCHEMA storage`, `CREATE SCHEMA realtime` statements
   - All role creation statements (except postgres)
   - All system schema table definitions

## ✅ Step 6: Verify Restoration

After restoration, verify your data:

```bash
# Using Prisma Studio
npx prisma studio

# Or using psql
psql "postgresql://postgres.otwwbtndkwkzgjqozcfn:Aliparfum%4099%21%21@db.otwwbtndkwkzgjqozcfn.supabase.co:5432/postgres?sslmode=require" -c "\dt public.*"
```

## 🐛 Troubleshooting

### Authentication Failed (P1000)

**Possible causes:**
1. IP address not allowed in Supabase
2. Incorrect password encoding
3. Wrong connection string format

**Solutions:**
1. Add your IP to Supabase allowlist
2. Verify password encoding: `@` = `%40`, `!` = `%21`
3. Try direct host: `db.otwwbtndkwkzgjqozcfn.supabase.co:5432`

### Schema Already Exists

If you get errors about schemas already existing:
- This is normal for Supabase system schemas (auth, storage, realtime)
- The restoration script should skip these automatically
- If restoring manually, filter out system schema statements

### Connection Timeout

- Check your internet connection
- Verify Supabase project is active
- Try using the pooler connection for testing: port 6543

## 📝 Next Steps

After successful restoration:

1. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

2. **Verify Data**:
   ```bash
   npx prisma studio
   ```

3. **Test Application**:
   ```bash
   npm run dev
   ```

## 🔗 Useful Commands

```bash
# Test connection
psql "YOUR_DIRECT_URL" -c "SELECT 1;"

# List tables
psql "YOUR_DIRECT_URL" -c "\dt public.*"

# Count records in a table
psql "YOUR_DIRECT_URL" -c "SELECT COUNT(*) FROM public.products;"

# View table structure
psql "YOUR_DIRECT_URL" -c "\d public.products"
```

## 📞 Need Help?

If you continue to have issues:
1. Check Supabase Dashboard for connection logs
2. Verify your database password in Supabase Settings
3. Ensure your IP is allowed in network restrictions
4. Try using Supabase SQL Editor for manual restoration



