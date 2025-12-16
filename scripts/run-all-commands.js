/**
 * Run all commands to set up the database
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

console.log('🚀 Running all setup commands...\n');

const steps = [
  {
    name: 'Generate Prisma Client',
    command: 'npx prisma generate',
    optional: false,
  },
  {
    name: 'Try to push schema (may fail due to auth)',
    command: 'npx prisma db push --skip-generate',
    optional: true,
  },
];

async function runSteps() {
  for (const step of steps) {
    console.log(`\n📋 Step: ${step.name}`);
    console.log(`   Command: ${step.command}\n`);
    
    try {
      execSync(step.command, {
        stdio: 'inherit',
        cwd: path.join(__dirname, '..'),
        env: process.env,
      });
      console.log(`✅ ${step.name} - Success!\n`);
    } catch (error) {
      if (step.optional) {
        console.log(`⚠️  ${step.name} - Failed (this is expected if IP not allowed)`);
        console.log(`   Error: ${error.message.split('\n')[0]}\n`);
      } else {
        console.error(`❌ ${step.name} - Failed!`);
        console.error(`   Error: ${error.message}\n`);
        process.exit(1);
      }
    }
  }
  
  console.log('\n📝 Summary:');
  console.log('✅ Prisma client generated');
  console.log('⚠️  Schema push may have failed (authentication issue)');
  console.log('\n💡 Next steps:');
  console.log('   1. Go to Supabase SQL Editor: https://supabase.com/dashboard/project/otwwbtndkwkzgjqozcfn/sql/new');
  console.log('   2. Open CREATE_ALL_TABLES.sql');
  console.log('   3. Copy all content and run in SQL Editor');
  console.log('   4. Then restore data from database_dump_public_only.sql');
  console.log('\n📁 Files ready:');
  console.log('   - CREATE_ALL_TABLES.sql (run this in Supabase SQL Editor)');
  console.log('   - database_dump_public_only.sql (restore your data)');
}

runSteps().catch(console.error);

