#!/usr/bin/env tsx
/**
 * Script to import environment variables from .env.local to Vercel
 * 
 * Usage:
 *   tsx scripts/vercel-env-import.ts [environment]
 * 
 * Examples:
 *   tsx scripts/vercel-env-import.ts production
 *   tsx scripts/vercel-env-import.ts preview
 *   tsx scripts/vercel-env-import.ts development
 */

import { execSync } from "child_process";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

interface EnvVar {
  key: string;
  value: string;
  environments: string[];
}

// Required environment variables
const requiredVars = [
  "DATABASE_URL",
  "DIRECT_URL",
  "NEXTAUTH_SECRET",
  "NEXTAUTH_URL",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "NEXT_PUBLIC_APP_NAME",
  "NEXT_PUBLIC_APP_URL",
  "NEXT_PUBLIC_BASE_URL",
];

// Optional environment variables
const optionalVars = [
  "EMAIL_FROM",
  "EMAIL_SERVER_HOST",
  "EMAIL_SERVER_PORT",
  "RESEND_API_KEY",
  "ENABLE_NOTIFICATIONS",
  "ENABLE_OFFLINE_MODE",
  "ENABLE_PWA",
  "SKIP_MIDDLEWARE",
  "SENTRY_DSN",
];

function loadEnvFile(filePath: string): Record<string, string> {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }

  const envContent = fs.readFileSync(filePath, "utf-8");
  const env = dotenv.parse(envContent);
  return env;
}

function validateEnvVars(env: Record<string, string>): {
  valid: boolean;
  missing: string[];
} {
  const missing: string[] = [];

  for (const key of requiredVars) {
    if (!env[key] || env[key].trim() === "") {
      missing.push(key);
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  };
}

async function addEnvVarToVercel(
  key: string,
  value: string,
  environment: string,
): Promise<boolean> {
  try {
    // Use echo to pipe value to vercel env add
    const command = `echo "${value.replace(/"/g, '\\"')}" | vercel env add ${key} ${environment}`;
    execSync(command, {
      stdio: "inherit",
      shell: true,
    });
    return true;
  } catch (error) {
    console.error(`❌ Failed to add ${key} to ${environment}`);
    return false;
  }
}

async function main() {
  console.log("🚀 Vercel Environment Variables Import Script\n");
  console.log("=" .repeat(50) + "\n");

  // Get environment from command line or prompt
  const args = process.argv.slice(2);
  let environment = args[0];

  if (!environment) {
    environment = await question(
      "Which environment? (production/preview/development): ",
    );
  }

  if (
    !["production", "preview", "development"].includes(environment.toLowerCase())
  ) {
    console.error("❌ Invalid environment. Must be: production, preview, or development");
    process.exit(1);
  }

  // Load .env.local
  const envPath = path.resolve(process.cwd(), ".env.local");
  console.log(`📂 Loading environment variables from: ${envPath}\n`);

  const env = loadEnvFile(envPath);

  // Validate required variables
  const validation = validateEnvVars(env);
  if (!validation.valid) {
    console.error("❌ Missing required environment variables:");
    validation.missing.forEach((key) => console.error(`   - ${key}`));
    console.error("\n💡 Please update your .env.local file with all required variables.");
    process.exit(1);
  }

  console.log("✅ All required environment variables found!\n");

  // Confirm before proceeding
  console.log(`⚠️  This will add environment variables to Vercel for: ${environment}`);
  const confirm = await question("Continue? (y/n): ");

  if (confirm.toLowerCase() !== "y") {
    console.log("❌ Cancelled.");
    process.exit(0);
  }

  console.log("\n📤 Adding environment variables to Vercel...\n");

  // Add required variables
  const allVars = [...requiredVars, ...optionalVars];
  let successCount = 0;
  let failCount = 0;

  for (const key of allVars) {
    if (env[key] && env[key].trim() !== "") {
      console.log(`Adding ${key}...`);
      const success = await addEnvVarToVercel(key, env[key], environment);
      if (success) {
        successCount++;
        console.log(`✅ ${key} added successfully\n`);
      } else {
        failCount++;
        console.log(`❌ Failed to add ${key}\n`);
      }
    }
  }

  console.log("=" .repeat(50));
  console.log(`✅ Import complete!`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Failed: ${failCount}\n`);

  console.log("📝 Next steps:");
  console.log(`   1. Verify variables: vercel env ls`);
  console.log(`   2. Deploy: vercel --prod`);
  console.log(`   3. Test your deployment\n`);

  rl.close();
}

main().catch((error) => {
  console.error("❌ Import failed:", error);
  process.exit(1);
});

