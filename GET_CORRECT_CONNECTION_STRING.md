# How to Get the Correct Connection String from Supabase

## Problem Identified
✅ Password encoding is correct  
✅ Connection string format is correct  
❌ **The password doesn't match what's in Supabase**

## Solution: Get the Connection String Directly from Supabase

### Step 1: Go to Supabase Dashboard
1. Open: https://supabase.com/dashboard/project/otwwbtndkwkzgjqozcfn
2. Click on **Settings** (left sidebar)
3. Click on **Database** (under Settings)

### Step 2: Find Connection String Section
On the Database Settings page, look for:
- **Connection String** section
- **Connection Pooling** section
- Or **Database URL** section

### Step 3: Copy the Connection String
Supabase provides connection strings in different formats:

#### Option A: Connection Pooling (for runtime)
- Look for **"Connection Pooling"** or **"Transaction Mode"**
- Copy the connection string (usually port 6543)
- This is your `DATABASE_URL`

#### Option B: Direct Connection (for migrations)
- Look for **"Direct Connection"** or **"Session Mode"**
- Copy the connection string (usually port 5432)
- This is your `DIRECT_URL`

### Step 4: Update Your .env.local

Replace the connection strings in `.env.local` with the ones from Supabase:

```env
DATABASE_URL="[paste connection pooling string from Supabase]"
DIRECT_URL="[paste direct connection string from Supabase]"
```

### Step 5: Test Again

After updating, run:
```bash
npx tsx scripts/diagnose-connection.ts
```

## Alternative: Reset Database Password

If you can't find the connection string:

1. Go to Supabase Dashboard → Settings → Database
2. Find **"Database Password"** section
3. Click **"Reset Database Password"**
4. Copy the new password
5. Update your connection strings with the new password

**Password encoding:**
- If password is: `NewPassword123!@#`
- URL-encoded: `NewPassword123%21%40%23`

## Quick Test

After updating `.env.local`, test immediately:
```bash
npx tsx scripts/test-db-connection.ts
```

## What to Look For in Supabase Dashboard

The connection string should look like:
```
postgresql://postgres.otwwbtndkwkzgjqozcfn:[PASSWORD]@db.otwwbtndkwkzgjqozcfn.supabase.co:5432/postgres
```

Where `[PASSWORD]` is the actual password (Supabase will show it or you can reset it).

## Current Status

- ✅ Connection string format: Correct
- ✅ Password encoding: Correct  
- ❌ Password value: **Doesn't match Supabase**

**Action Required:** Get the correct connection string or password from Supabase Dashboard.

