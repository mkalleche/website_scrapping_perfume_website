// Simple connection test to verify credentials
const { Client } = require('pg');

async function testConnection() {
  console.log('\n🔍 Testing Database Connection with pg library...\n');
  
  // Test with DIRECT_URL first (simpler connection)
  const directUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;
  
  if (!directUrl) {
    console.error('❌ No DATABASE_URL or DIRECT_URL found in environment');
    process.exit(1);
  }
  
  console.log('Connection String (masked):', directUrl.split('@')[0] + '@***');
  console.log('\n');
  
  const client = new Client({
    connectionString: directUrl,
  });
  
  try {
    console.log('1️⃣ Attempting to connect...');
    await client.connect();
    console.log('   ✅ Connection successful!\n');
    
    console.log('2️⃣ Testing query...');
    const result = await client.query('SELECT version() as version, current_database() as database');
    console.log('   ✅ Query successful!');
    console.log('   📊 Database:', result.rows[0].database);
    console.log('   📊 Version:', result.rows[0].version.split(',')[0]);
    
    console.log('\n3️⃣ Checking if tables exist...');
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    if (tablesResult.rows.length > 0) {
      console.log(`   ✅ Found ${tablesResult.rows.length} tables:`);
      tablesResult.rows.slice(0, 10).forEach(row => {
        console.log(`      - ${row.table_name}`);
      });
      if (tablesResult.rows.length > 10) {
        console.log(`      ... and ${tablesResult.rows.length - 10} more`);
      }
    } else {
      console.log('   ⚠️  No tables found in public schema');
    }
    
    console.log('\n✅✅✅ DATABASE CONNECTION TEST PASSED! ✅✅✅\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌❌❌ DATABASE CONNECTION TEST FAILED! ❌❌❌\n');
    console.error('Error:', error.message);
    
    if (error.message.includes('password authentication failed')) {
      console.error('\n💡 Password authentication failed. Possible issues:');
      console.error('   1. The password in your connection string is incorrect');
      console.error('   2. The password encoding might be wrong');
      console.error('   3. The database password might have been changed');
      console.error('\n   Your password should be: Aliparfum@99!!');
      console.error('   URL-encoded as: Aliparfum%4099%21%21');
      console.error('\n   Please verify:');
      console.error('   - Go to Supabase Dashboard → Settings → Database');
      console.error('   - Check the database password');
      console.error('   - Make sure it matches: Aliparfum@99!!');
    }
    
    process.exit(1);
  } finally {
    await client.end();
  }
}

// Load environment variables
require('dotenv').config({ path: '.env.local' });

testConnection();

