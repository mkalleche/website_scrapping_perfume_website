# ⚡ Quick Supabase Migration Guide

## 🎯 Quick Steps

### 1. Get New Supabase Credentials

From Supabase Dashboard → Settings:
- **API**: Copy `Project URL`, `Anon key`, `Service role key`
- **Database**: Copy connection strings (pooler 6543, direct 5432)

### 2. Update `.env.local`

Replace these values:
```env
DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=20&pool_timeout=20&sslmode=require&prepared=false"
DIRECT_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres?sslmode=require"
NEXT_PUBLIC_SUPABASE_URL=https://[REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=[SERVICE_ROLE_KEY]
```

### 3. Run Migration

**Option A: Automated Script (Recommended)**
```bash
npm run migrate:new-project
```

**Option B: Manual Steps**
```bash
# Generate Prisma client
npx prisma generate

# Create tables (with migration history)
npx prisma migrate dev --name init

# OR push directly (faster, no history)
npx prisma db push

# Seed database (optional)
npm run db:seed
```

### 4. Create Storage Bucket

In Supabase Dashboard → Storage:
1. Click "Create bucket"
2. Name: `product-images`
3. Make it **Public**
4. Create

### 5. Test

```bash
npm run dev
```

## 📋 Migration Script Options

```bash
# Basic migration
npm run migrate:new-project

# With database seeding
npm run migrate:new-project:seed

# Using db push (faster, no migration files)
npm run migrate:new-project:push
```

## ✅ Verification

- [ ] Environment variables updated
- [ ] Database connection works
- [ ] Tables created (check Supabase Dashboard → Table Editor)
- [ ] Storage bucket created
- [ ] App runs without errors

## 🆘 Troubleshooting

**Connection Error?**
- Check `DATABASE_URL` and `DIRECT_URL` are correct
- Verify password is correct
- Check IP allowlist in Supabase

**Migration Failed?**
- Try `npx prisma db push` instead
- Check `DIRECT_URL` is set (required for migrations)

**Storage Errors?**
- Make sure bucket name is `product-images`
- Verify bucket is public

---

📖 **Full Guide**: See `SUPABASE_MIGRATION_GUIDE.md` for detailed instructions.


