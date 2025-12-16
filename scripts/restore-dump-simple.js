/**
 * Simple script to restore database dump using psql
 * This script extracts only the public schema parts from the dump
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
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

console.log('🔄 Starting database restoration...\n');
console.log('📡 Testing database connection...');

try {
  // Test connection
  execSync(`psql "${DIRECT_URL}" -c "SELECT 1;"`, { stdio: 'pipe' });
  console.log('✅ Database connection successful\n');
} catch (error) {
  console.error('❌ Database connection failed');
  console.error('Please check your DIRECT_URL in .env.local');
  console.error('Make sure your IP is allowed in Supabase dashboard');
  process.exit(1);
}

console.log('📊 Step 1: Pushing Prisma schema...');
try {
  execSync('npx prisma db push --skip-generate', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, DATABASE_URL: DIRECT_URL },
  });
  console.log('✅ Prisma schema pushed\n');
} catch (error) {
  console.error('❌ Failed to push Prisma schema');
  process.exit(1);
}

console.log('📥 Step 2: Restoring database dump...');
console.log('⚠️  This will restore public schema tables and data');
console.log('⚠️  System schemas will be skipped automatically\n');

// Create a filtered dump that only includes public schema
const filteredDumpFile = path.join(__dirname, '../database_dump_filtered.sql');
console.log('🔍 Filtering dump to extract public schema only...');

try {
  const dumpContent = fs.readFileSync(DUMP_FILE, 'utf8');
  
  // Extract only public schema related content
  // This is a simplified approach - in production, you'd want more sophisticated filtering
  const lines = dumpContent.split('\n');
  const filteredLines = [];
  let inPublicSchema = false;
  let skipBlock = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip system schema blocks
    if (line.includes('CREATE SCHEMA auth') || 
        line.includes('CREATE SCHEMA storage') ||
        line.includes('CREATE SCHEMA realtime') ||
        line.includes('CREATE SCHEMA graphql') ||
        line.includes('CREATE SCHEMA vault') ||
        line.includes('CREATE SCHEMA pgbouncer')) {
      skipBlock = true;
      continue;
    }
    
    // Skip role creation (Supabase manages these)
    if (line.includes('CREATE ROLE') && !line.includes('postgres')) {
      skipBlock = true;
      continue;
    }
    
    // Include public schema and enum types
    if (line.includes('CREATE TYPE public.') || 
        line.includes('CREATE TABLE public.') ||
        line.includes('ALTER TABLE public.') ||
        line.includes('INSERT INTO public.') ||
        line.includes('COPY public.') ||
        line.includes('CREATE INDEX') ||
        line.includes('ALTER TYPE public.')) {
      skipBlock = false;
      filteredLines.push(line);
      continue;
    }
    
    // Include data for public schema tables
    if (!skipBlock && (line.trim().startsWith('INSERT') || line.trim().startsWith('COPY'))) {
      filteredLines.push(line);
      continue;
    }
    
    // Include other public schema related statements
    if (!skipBlock && line.includes('public.')) {
      filteredLines.push(line);
    }
  }
  
  fs.writeFileSync(filteredDumpFile, filteredLines.join('\n'));
  console.log(`✅ Filtered dump created: ${filteredDumpFile}\n`);
  
  // Restore the filtered dump
  console.log('⏳ Restoring filtered dump (this may take a while)...');
  execSync(`psql "${DIRECT_URL}" -f "${filteredDumpFile}"`, {
    stdio: 'inherit',
  });
  
  console.log('\n✅ Database dump restored successfully!');
  console.log('\n📋 Next steps:');
  console.log('   1. Run: npx prisma generate');
  console.log('   2. Verify your data');
  console.log('   3. Test your application');
  
} catch (error) {
  console.error('❌ Failed to restore database dump');
  console.error('Error:', error.message);
  console.error('\n💡 You can try restoring manually:');
  console.error(`   psql "${DIRECT_URL}" -f "${DUMP_FILE}"`);
  process.exit(1);
}



