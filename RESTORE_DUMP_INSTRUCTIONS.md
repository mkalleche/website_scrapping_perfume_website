# 🗄️ Database Dump Restoration Instructions

## Current Status

✅ Database dump saved to: `database_dump.sql`  
⚠️ Authentication issues with direct connection - may need IP allowlist configuration

## 🔧 Connection Issues

If you're getting `P1000: Authentication failed` errors, this is likely due to:

1. **IP Allowlist**: Your IP address may not be allowed in Supabase
2. **Connection String Format**: May need to use different host format

## 📋 Restoration Methods

### Method 1: Using Supabase SQL Editor (Easiest - Recommended)

1. **Go to Supabase Dashboard**:
   - Navigate to: https://supabase.com/dashboard/project/otwwbtndkwkzgjqozcfn
   - Click on **SQL Editor** in the left sidebar

2. **Prepare the Dump**:
   - Open `database_dump.sql` in a text editor
   - Extract only the **public schema** parts:
     - Look for `CREATE TABLE public.`
     - Look for `INSERT INTO public.`
     - Look for `CREATE TYPE public.`
     - **Skip** all `auth`, `storage`, `realtime`, `graphql`, `vault` schema statements

3. **Execute SQL**:
   - Copy the filtered SQL statements
   - Paste into SQL Editor
   - Click **Run** or press `Ctrl+Enter`

### Method 2: Using psql (If Installed)

If you have PostgreSQL client tools installed:

```bash
# Test connection first
psql "postgresql://postgres.otwwbtndkwkzgjqozcfn:Aliparfum@99!!@db.otwwbtndkwkzgjqozcfn.supabase.co:5432/postgres?sslmode=require" -c "SELECT 1;"

# If connection works, restore the dump
psql "postgresql://postgres.otwwbtndkwkzgjqozcfn:Aliparfum@99!!@db.otwwbtndkwkzgjqozcfn.supabase.co:5432/postgres?sslmode=require" -f database_dump.sql
```

**Note**: Use the actual password (not URL-encoded) when using psql directly.

### Method 3: Fix IP Allowlist First

1. **Go to Supabase Dashboard**:
   - Settings → Database → Connection Pooling
   - Or Settings → Database → Network Restrictions

2. **Add Your IP**:
   - Find your current IP: https://whatismyipaddress.com/
   - Add it to the allowlist, or temporarily allow all IPs

3. **Then Try Prisma Push**:
   ```bash
   npx prisma db push --skip-generate
   ```

4. **Restore Dump**:
   ```bash
   npm run restore:dump
   ```

### Method 4: Manual Table Creation + Data Import

1. **Push Prisma Schema** (creates table structure):
   ```bash
   npx prisma db push --skip-generate
   ```

2. **Extract Data Only** from dump:
   - Open `database_dump.sql`
   - Find all `INSERT INTO public.*` statements
   - Copy only those statements

3. **Import Data via SQL Editor**:
   - Paste INSERT statements into Supabase SQL Editor
   - Execute

## 🔍 What to Extract from Dump

From your `database_dump.sql`, you need:

✅ **Include**:
- `CREATE TYPE public."OrderStatus"`
- `CREATE TYPE public."UserRole"`
- `CREATE TABLE public.products`
- `CREATE TABLE public.customers`
- `CREATE TABLE public.orders`
- All other `CREATE TABLE public.*` statements
- All `INSERT INTO public.*` statements
- All `ALTER TABLE public.*` statements
- All `CREATE INDEX` on public schema tables

❌ **Exclude**:
- `CREATE SCHEMA auth`
- `CREATE SCHEMA storage`
- `CREATE SCHEMA realtime`
- `CREATE SCHEMA graphql`
- `CREATE SCHEMA vault`
- `CREATE ROLE` statements (except postgres)
- All auth.*, storage.*, realtime.* table definitions

## 📝 Step-by-Step: Using Supabase SQL Editor

1. **Open Supabase Dashboard** → SQL Editor

2. **First, create the table structure** (if not already done):
   ```sql
   -- Run this first to create tables
   -- You can use Prisma for this: npx prisma db push
   ```

3. **Then, extract and run data inserts**:
   - Open `database_dump.sql`
   - Search for `INSERT INTO public.`
   - Copy all INSERT statements
   - Paste into SQL Editor
   - Run

## 🛠️ Quick Filter Script

If you want to automatically filter the dump:

```bash
# On Linux/Mac
grep -E "(CREATE TYPE public\.|CREATE TABLE public\.|INSERT INTO public\.|ALTER TABLE public\.|CREATE INDEX.*public\.)" database_dump.sql > database_dump_public_only.sql

# Then restore
psql "YOUR_CONNECTION_STRING" -f database_dump_public_only.sql
```

## ✅ Verification

After restoration, verify:

```bash
# Using Prisma Studio
npx prisma studio

# Or check table counts
npx prisma db execute --stdin <<< "SELECT COUNT(*) FROM public.products;"
```

## 🆘 Still Having Issues?

1. **Check Supabase Dashboard**:
   - Go to Settings → Database
   - Verify connection string format
   - Check IP allowlist settings

2. **Try Connection Pooler**:
   - Use port 6543 instead of 5432
   - But note: migrations need direct connection (5432)

3. **Contact Support**:
   - Supabase has excellent support
   - They can help with connection issues

## 📞 Next Steps

Once the dump is restored:

1. ✅ Run: `npx prisma generate`
2. ✅ Test: `npm run dev`
3. ✅ Verify data in Prisma Studio: `npx prisma studio`



