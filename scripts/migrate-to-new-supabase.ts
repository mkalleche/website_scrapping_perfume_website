#!/usr/bin/env tsx
/**
 * Script to migrate to a new Supabase project
 * This script will:
 * 1. Verify environment variables
 * 2. Test database connection
 * 3. Generate Prisma client
 * 4. Create and apply migrations
 * 5. Optionally seed the database
 */

import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const prisma = new PrismaClient();

interface MigrationOptions {
  seed?: boolean;
  reset?: boolean;
  usePush?: boolean;
}

async function verifyEnvironment() {
  console.log("🔍 Verifying environment variables...\n");

  const required = [
    "DATABASE_URL",
    "DIRECT_URL",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  ];

  const missing: string[] = [];

  for (const key of required) {
    if (!process.env[key]) {
      missing.push(key);
      console.log(`❌ ${key} is missing`);
    } else {
      console.log(`✅ ${key} is set`);
    }
  }

  if (missing.length > 0) {
    console.error("\n❌ Missing required environment variables!");
    console.error("Please update your .env.local file with the new Supabase credentials.");
    console.error("\nMissing variables:", missing.join(", "));
    process.exit(1);
  }

  console.log("\n✅ All required environment variables are set!\n");
}

async function testConnection() {
  console.log("🔌 Testing database connection...\n");

  try {
    await prisma.$connect();
    console.log("✅ Database connection successful!\n");

    // Test a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("✅ Database query test passed!\n");
    return true;
  } catch (error) {
    console.error("❌ Database connection failed!");
    console.error("Error:", error instanceof Error ? error.message : error);
    console.error("\n💡 Please check:");
    console.error("  1. DATABASE_URL is correct");
    console.error("  2. Database password is correct");
    console.error("  3. Your IP is allowed in Supabase settings");
    console.error("  4. Network connection is working\n");
    return false;
  }
}

async function generatePrismaClient() {
  console.log("📦 Generating Prisma Client...\n");

  try {
    execSync("npx prisma generate", {
      stdio: "inherit",
      cwd: process.cwd(),
    });
    console.log("\n✅ Prisma Client generated successfully!\n");
    return true;
  } catch (error) {
    console.error("\n❌ Failed to generate Prisma Client!");
    console.error("Error:", error instanceof Error ? error.message : error);
    return false;
  }
}

async function createMigration(usePush: boolean = false) {
  console.log("🗄️  Creating database tables...\n");

  try {
    if (usePush) {
      console.log("Using 'prisma db push' (no migration history)...\n");
      execSync("npx prisma db push", {
        stdio: "inherit",
        cwd: process.cwd(),
      });
    } else {
      console.log("Using 'prisma migrate dev' (creates migration files)...\n");
      execSync("npx prisma migrate dev --name init", {
        stdio: "inherit",
        cwd: process.cwd(),
      });
    }
    console.log("\n✅ Database tables created successfully!\n");
    return true;
  } catch (error) {
    console.error("\n❌ Failed to create database tables!");
    console.error("Error:", error instanceof Error ? error.message : error);
    console.error("\n💡 Try using --use-push flag for faster setup");
    return false;
  }
}

async function seedDatabase() {
  console.log("🌱 Seeding database...\n");

  try {
    execSync("npx prisma db seed", {
      stdio: "inherit",
      cwd: process.cwd(),
    });
    console.log("\n✅ Database seeded successfully!\n");
    return true;
  } catch (error) {
    console.error("\n❌ Failed to seed database!");
    console.error("Error:", error instanceof Error ? error.message : error);
    console.error("\n💡 You can seed manually later with: npm run db:seed");
    return false;
  }
}

async function resetDatabase() {
  console.log("⚠️  Resetting database (this will delete all data!)...\n");
  console.log("Are you sure? This action cannot be undone!");
  console.log("Press Ctrl+C to cancel, or wait 5 seconds to continue...\n");

  await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    execSync("npx prisma migrate reset --force", {
      stdio: "inherit",
      cwd: process.cwd(),
    });
    console.log("\n✅ Database reset successfully!\n");
    return true;
  } catch (error) {
    console.error("\n❌ Failed to reset database!");
    console.error("Error:", error instanceof Error ? error.message : error);
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const options: MigrationOptions = {
    seed: args.includes("--seed"),
    reset: args.includes("--reset"),
    usePush: args.includes("--use-push"),
  };

  console.log("🚀 Supabase Migration Script\n");
  console.log("=" .repeat(50) + "\n");

  // Step 1: Verify environment
  await verifyEnvironment();

  // Step 2: Test connection
  const connected = await testConnection();
  if (!connected) {
    await prisma.$disconnect();
    process.exit(1);
  }

  // Step 3: Reset if requested
  if (options.reset) {
    const reset = await resetDatabase();
    if (!reset) {
      await prisma.$disconnect();
      process.exit(1);
    }
  }

  // Step 4: Generate Prisma Client
  const generated = await generatePrismaClient();
  if (!generated) {
    await prisma.$disconnect();
    process.exit(1);
  }

  // Step 5: Create migration
  const migrated = await createMigration(options.usePush);
  if (!migrated) {
    await prisma.$disconnect();
    process.exit(1);
  }

  // Step 6: Seed if requested
  if (options.seed) {
    await seedDatabase();
  }

  console.log("=" .repeat(50));
  console.log("✅ Migration completed successfully!\n");
  console.log("📝 Next steps:");
  console.log("  1. Create storage bucket 'product-images' in Supabase dashboard");
  console.log("  2. Test your application: npm run dev");
  console.log("  3. Verify all features work correctly\n");

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error("❌ Migration failed:", error);
  process.exit(1);
});


