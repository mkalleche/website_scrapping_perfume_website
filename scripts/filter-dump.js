/**
 * Script to filter database dump to extract only public schema content
 * This removes Supabase system schemas (auth, storage, realtime, etc.)
 */

const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../database_dump.sql');
const outputFile = path.join(__dirname, '../database_dump_public_only.sql');

if (!fs.existsSync(inputFile)) {
  console.error(`❌ Dump file not found: ${inputFile}`);
  process.exit(1);
}

console.log('🔍 Filtering database dump to extract public schema only...\n');

const dumpContent = fs.readFileSync(inputFile, 'utf8');
const lines = dumpContent.split('\n');
const filteredLines = [];
let skipBlock = false;
let inSystemSchema = false;
let braceCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();
  
  // Skip system schema creation
  if (trimmed.match(/CREATE SCHEMA (auth|storage|realtime|graphql|vault|pgbouncer)/i)) {
    skipBlock = true;
    inSystemSchema = true;
    continue;
  }
  
  // Skip role creation (except postgres)
  if (trimmed.match(/^CREATE ROLE (?!postgres)/i)) {
    skipBlock = true;
    continue;
  }
  
  // Skip role grants for system roles
  if (trimmed.match(/GRANT.*TO (anon|authenticated|authenticator|service_role|supabase_)/i)) {
    continue;
  }
  
  // Include public schema types
  if (trimmed.match(/CREATE TYPE public\./i)) {
    skipBlock = false;
    inSystemSchema = false;
    filteredLines.push(line);
    continue;
  }
  
  // Include public schema tables
  if (trimmed.match(/CREATE TABLE public\./i)) {
    skipBlock = false;
    inSystemSchema = false;
    filteredLines.push(line);
    continue;
  }
  
  // Include public schema data
  if (trimmed.match(/INSERT INTO public\./i) || trimmed.match(/COPY public\./i)) {
    skipBlock = false;
    inSystemSchema = false;
    filteredLines.push(line);
    continue;
  }
  
  // Include ALTER statements for public schema
  if (trimmed.match(/ALTER TABLE public\./i) || trimmed.match(/ALTER TYPE public\./i)) {
    skipBlock = false;
    inSystemSchema = false;
    filteredLines.push(line);
    continue;
  }
  
  // Include indexes on public schema
  if (trimmed.match(/CREATE INDEX.*public\./i) || trimmed.match(/CREATE UNIQUE INDEX.*public\./i)) {
    skipBlock = false;
    inSystemSchema = false;
    filteredLines.push(line);
    continue;
  }
  
  // Include constraints
  if (trimmed.match(/ADD CONSTRAINT.*public\./i) || trimmed.match(/ALTER TABLE public\./i)) {
    skipBlock = false;
    inSystemSchema = false;
    filteredLines.push(line);
    continue;
  }
  
  // Include SET statements and other configuration
  if (trimmed.match(/^SET /i) && !inSystemSchema) {
    filteredLines.push(line);
    continue;
  }
  
  // Include comments
  if (trimmed.startsWith('--') && !inSystemSchema) {
    filteredLines.push(line);
    continue;
  }
  
  // If we're in a multi-line statement and not skipping, include it
  if (!skipBlock && !inSystemSchema) {
    // Check if this is part of a CREATE TABLE or INSERT statement
    if (trimmed && !trimmed.match(/^(CREATE|ALTER|DROP|GRANT|REVOKE) (SCHEMA|ROLE|DATABASE)/i)) {
      filteredLines.push(line);
    }
  }
  
  // Reset skipBlock when we see a semicolon (end of statement)
  if (trimmed.endsWith(';') && skipBlock) {
    skipBlock = false;
  }
}

// Write filtered dump
fs.writeFileSync(outputFile, filteredLines.join('\n'));

const originalSize = fs.statSync(inputFile).size;
const filteredSize = fs.statSync(outputFile).size;
const reduction = ((1 - filteredSize / originalSize) * 100).toFixed(1);

console.log('✅ Filtering complete!');
console.log(`📊 Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`📊 Filtered size: ${(filteredSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`📊 Reduction: ${reduction}%`);
console.log(`\n📁 Filtered dump saved to: ${outputFile}`);
console.log('\n💡 Next steps:');
console.log('   1. Review the filtered dump: database_dump_public_only.sql');
console.log('   2. Restore using Supabase SQL Editor or psql');
console.log('   3. Or use: npm run restore:dump');



