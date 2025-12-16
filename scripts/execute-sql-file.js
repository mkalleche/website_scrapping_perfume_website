/**
 * Execute SQL file against Supabase database
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const DIRECT_URL = process.env.DIRECT_URL;
const SQL_FILE = path.join(__dirname, '../CREATE_ALL_TABLES.sql');

if (!DIRECT_URL) {
  console.error('❌ DIRECT_URL not found in .env');
  process.exit(1);
}

if (!fs.existsSync(SQL_FILE)) {
  console.error(`❌ SQL file not found: ${SQL_FILE}`);
  process.exit(1);
}

console.log('📥 Executing SQL file to create tables...\n');

try {
  // Try using psql if available
  const sqlContent = fs.readFileSync(SQL_FILE, 'utf8');
  
  // Extract connection details
  const url = new URL(DIRECT_URL.replace('postgresql://', 'http://'));
  const password = decodeURIComponent(url.password);
  const username = url.username;
  const host = url.hostname;
  const port = url.port || '5432';
  const database = url.pathname.slice(1) || 'postgres';
  
  console.log(`🔗 Connecting to: ${host}:${port}/${database}`);
  console.log(`👤 User: ${username}\n`);
  
  // Try to execute using psql
  try {
    // Set PGPASSWORD environment variable
    const env = { ...process.env, PGPASSWORD: password };
    
    const psqlCmd = `psql -h ${host} -p ${port} -U ${username} -d ${database} -f "${SQL_FILE}"`;
    
    console.log('⏳ Executing SQL (this may take a moment)...\n');
    execSync(psqlCmd, {
      stdio: 'inherit',
      env: env,
      shell: true,
    });
    
    console.log('\n✅ Tables created successfully!');
    
  } catch (psqlError) {
    // If psql is not available, try using node-postgres or provide instructions
    console.error('❌ Could not execute using psql');
    console.error('💡 psql might not be installed or connection failed');
    console.error('\n📝 Alternative: Run the SQL manually in Supabase SQL Editor:');
    console.error('   1. Go to: https://supabase.com/dashboard/project/otwwbtndkwkzgjqozcfn/sql/new');
    console.error(`   2. Open file: ${SQL_FILE}`);
    console.error('   3. Copy all content and paste into SQL Editor');
    console.error('   4. Click "Run"');
    console.error('\n💡 Or install PostgreSQL client tools to use psql');
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

