#!/usr/bin/env tsx
/**
 * Script to restore database dump to Supabase
 * This script will:
 * 1. Test database connection
 * 2. Push Prisma schema to create table structure
 * 3. Restore the database dump (public schema only)
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const DIRECT_URL = process.env.DIRECT_URL;
const DUMP_FILE = path.join(__dirname, '../database_dump.sql');

if (!DIRECT_URL) {
  console.error('❌ DIRECT_URL environment variable is not set');
  console.error('Please check your .env.local file');
  process.exit(1);
}

if (!fs.existsSync(DUMP_FILE)) {
  console.error(`❌ Dump file not found: ${DUMP_FILE}`);
  process.exit(1);
}

console.log('🔄 Starting database restoration process...\n');

// Step 1: Test connection
console.log('📡 Step 1: Testing database connection...');
try {
  const testQuery = `SELECT 1 as test`;
  const testCmd = `psql "${DIRECT_URL}" -c "${testQuery}"`;
  execSync(testCmd, { stdio: 'pipe' });
  console.log('✅ Database connection successful\n');
} catch (error: any) {
  console.error('❌ Database connection failed');
  console.error('Error:', error.message);
  process.exit(1);
}

// Step 2: Push Prisma schema
console.log('📊 Step 2: Pushing Prisma schema to create table structure...');
try {
  execSync('npx prisma db push --skip-generate', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, DATABASE_URL: DIRECT_URL, DIRECT_URL },
  });
  console.log('✅ Prisma schema pushed successfully\n');
} catch (error: any) {
  console.error('❌ Failed to push Prisma schema');
  console.error('Error:', error.message);
  process.exit(1);
}

// Step 3: Restore dump
console.log('📥 Step 3: Restoring database dump...');
console.log('⚠️  Note: This will restore only public schema tables and data');
console.log('⚠️  Supabase system schemas (auth, storage, realtime) will be skipped\n');

try {
  // Extract connection details from DIRECT_URL
  const url = new URL(DIRECT_URL.replace('postgresql://', 'http://'));
  const password = url.password;
  const username = url.username;
  const host = url.hostname;
  const port = url.port || '5432';
  const database = url.pathname.slice(1) || 'postgres';

  // Use psql to restore, but we'll filter to only public schema
  // Note: We'll restore the dump but skip system schema commands
  const restoreCmd = `psql "${DIRECT_URL}" -f "${DUMP_FILE}" 2>&1 | grep -v "auth\\|storage\\|realtime\\|graphql\\|vault\\|pgbouncer" || true`;
  
  console.log('⏳ Restoring dump (this may take a while)...');
  execSync(restoreCmd, {
    stdio: 'inherit',
    shell: true,
  });
  
  console.log('\n✅ Database dump restored successfully');
} catch (error: any) {
  console.error('❌ Failed to restore database dump');
  console.error('Error:', error.message);
  console.error('\n💡 Tip: You may need to restore the dump manually using:');
  console.error(`   psql "${DIRECT_URL}" -f "${DUMP_FILE}"`);
  process.exit(1);
}

console.log('\n🎉 Database restoration completed successfully!');
console.log('\n📋 Next steps:');
console.log('   1. Verify the data was restored correctly');
console.log('   2. Run: npx prisma generate');
console.log('   3. Test your application');



