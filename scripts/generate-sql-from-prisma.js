/**
 * Generate SQL from Prisma schema
 * This creates the SQL statements needed to create all tables
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Generating SQL from Prisma schema...\n');

try {
  // First, try to introspect and generate migration SQL
  // We'll use prisma migrate dev --create-only to generate the SQL
  
  console.log('📝 Creating migration SQL...');
  
  // Create a temporary migration
  const migrationDir = path.join(__dirname, '../prisma/migrations');
  if (!fs.existsSync(migrationDir)) {
    fs.mkdirSync(migrationDir, { recursive: true });
  }
  
  // Try to generate the SQL using Prisma
  try {
    execSync('npx prisma migrate dev --create-only --name init_schema', {
      stdio: 'pipe',
      cwd: path.join(__dirname, '..'),
    });
    
    // Find the migration file
    const migrations = fs.readdirSync(migrationDir);
    const latestMigration = migrations
      .filter(m => m.includes('init_schema'))
      .sort()
      .pop();
    
    if (latestMigration) {
      const migrationPath = path.join(migrationDir, latestMigration, 'migration.sql');
      if (fs.existsSync(migrationPath)) {
        const sql = fs.readFileSync(migrationPath, 'utf8');
        const outputFile = path.join(__dirname, '../prisma_schema.sql');
        fs.writeFileSync(outputFile, sql);
        console.log(`✅ SQL generated successfully!`);
        console.log(`📁 Saved to: ${outputFile}`);
        console.log('\n💡 You can now copy this SQL and run it in Supabase SQL Editor');
        return;
      }
    }
  } catch (error) {
    console.log('⚠️  Could not generate via migrate, trying alternative method...\n');
  }
  
  // Alternative: Generate SQL manually from schema
  console.log('📝 Generating SQL from schema.prisma...');
  
  const schemaPath = path.join(__dirname, '../prisma/schema.prisma');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  
  // This is a simplified approach - we'll create a basic SQL file
  // The user should use Prisma Studio or Supabase to generate proper SQL
  const sqlContent = `-- SQL Generated from Prisma Schema
-- Run this in Supabase SQL Editor after creating the enum types

-- Note: This is a template. For the actual SQL, please:
-- 1. Use Supabase SQL Editor to run: npx prisma db push (if connection works)
-- 2. Or use Prisma Studio to generate the SQL
-- 3. Or manually create tables based on your Prisma schema

-- The easiest way is to:
-- 1. Go to Supabase Dashboard → SQL Editor
-- 2. Try to push schema: npx prisma db push
-- 3. If that fails due to auth, add your IP to Supabase allowlist
-- 4. Then run: npx prisma db push --skip-generate

-- Your Prisma schema is located at: prisma/schema.prisma
-- You can review it to see all table definitions
`;

  const outputFile = path.join(__dirname, '../prisma_schema_template.sql');
  fs.writeFileSync(outputFile, sqlContent);
  
  console.log('⚠️  Could not generate full SQL automatically');
  console.log('📁 Created template file: prisma_schema_template.sql');
  console.log('\n💡 Recommended approach:');
  console.log('   1. Add your IP to Supabase allowlist');
  console.log('   2. Run: npx prisma db push --skip-generate');
  console.log('   3. Or use Supabase SQL Editor to create tables manually');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}



