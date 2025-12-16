/**
 * Test database connection and push Prisma schema
 */

const { execSync } = require('child_process');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

console.log('🔍 Testing database connection and pushing schema...\n');

const DIRECT_URL = process.env.DIRECT_URL;

if (!DIRECT_URL) {
  console.error('❌ DIRECT_URL not found in .env');
  process.exit(1);
}

console.log('📡 Step 1: Testing database connection...\n');

try {
  // Test connection using Prisma
  const testScript = `
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    prisma.$connect()
      .then(() => {
        console.log('✅ Database connection successful!');
        return prisma.$disconnect();
      })
      .then(() => process.exit(0))
      .catch((e) => {
        console.error('❌ Connection failed:', e.message);
        process.exit(1);
      });
  `;
  
  execSync(`node -e "${testScript.replace(/"/g, '\\"')}"`, {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
  });
  
  console.log('\n📊 Step 2: Pushing Prisma schema to create tables...\n');
  
  // Push schema
  execSync('npx prisma db push --skip-generate', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
    env: { ...process.env },
  });
  
  console.log('\n✅ Schema pushed successfully!');
  console.log('\n📋 Next steps:');
  console.log('   1. Run: npx prisma generate');
  console.log('   2. Restore data from database_dump_public_only.sql');
  console.log('   3. Verify: npx prisma studio');
  
} catch (error) {
  console.error('\n❌ Failed to push schema');
  console.error('\n💡 This is likely due to:');
  console.error('   1. IP address not allowed in Supabase');
  console.error('   2. Incorrect password or connection string');
  console.error('\n📝 To fix:');
  console.error('   1. Go to: https://supabase.com/dashboard/project/otwwbtndkwkzgjqozcfn');
  console.error('   2. Settings → Database → Connection Pooling');
  console.error('   3. Add your IP address to allowlist');
  console.error('   4. Or temporarily allow all IPs (0.0.0.0/0)');
  console.error('\n   Then run this script again: npm run push:schema');
  process.exit(1);
}



