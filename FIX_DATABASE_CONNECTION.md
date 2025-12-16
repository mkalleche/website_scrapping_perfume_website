# Fix Database Connection Issue

## Current Status
- ✅ IP Restrictions: **NOT the issue** (Your database allows all IPs)
- ❌ Authentication: **FAILING** (Password/credentials issue)

## The Problem
The authentication error means either:
1. **The database password is incorrect**
2. **The password encoding in the connection string is wrong**
3. **The database password was changed/reset**

## Solution Steps

### Step 1: Verify the Database Password in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/otwwbtndkwkzgjqozcfn
2. Navigate to **Settings** → **Database**
3. Scroll down to find **Database Password** section
4. **Check what the actual password is** (or reset it if needed)

### Step 2: Update Your Connection Strings

Once you have the correct password, update it in `.env.local`:

**Current password in your connection string:** `Aliparfum@99!!`

**Password encoding rules:**
- `@` → `%40`
- `!` → `%21`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- `=` → `%3D`

**Example:**
- Password: `Aliparfum@99!!`
- Encoded: `Aliparfum%4099%21%21`

### Step 3: Test the Connection

After updating the password, run:
```bash
npx tsx scripts/test-db-connection.ts
```

### Step 4: Alternative - Reset Database Password

If you're unsure of the password:

1. Go to Supabase Dashboard → Settings → Database
2. Find **Database Password** section
3. Click **Reset Database Password**
4. Copy the new password
5. Update `.env.local` with the new password (properly URL-encoded)
6. Test again

## Quick Password Encoding Helper

If your password is: `Aliparfum@99!!`

The connection string should be:
```
postgresql://postgres.otwwbtndkwkzgjqozcfn:Aliparfum%4099%21%21@db.otwwbtndkwkzgjqozcfn.supabase.co:5432/postgres?sslmode=require
```

## What to Do Right Now

1. **Check the actual database password** in Supabase Dashboard
2. **Compare it with** `Aliparfum@99!!` (what's currently in your `.env.local`)
3. **If different**, update `.env.local` with the correct password (URL-encoded)
4. **Run the test again**: `npx tsx scripts/test-db-connection.ts`

## Test URLs Available

Once the connection works, you can also test via:
- **API Endpoint**: http://localhost:3000/api/test-db (when dev server is running)
- **Script**: `npx tsx scripts/test-db-connection.ts`

