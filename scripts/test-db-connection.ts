import { PrismaClient } from "@prisma/client";

async function testDatabaseConnection() {
  const prisma = new PrismaClient({
    log: ["error", "warn"],
  });

  console.log("\n🔍 Testing Database Connection...\n");
  console.log("DATABASE_URL:", process.env.DATABASE_URL ? "✅ Configured" : "❌ Not configured");
  console.log("DIRECT_URL:", process.env.DIRECT_URL ? "✅ Configured" : "❌ Not configured");
  console.log("\n");

  try {
    // Test connection
    console.log("1️⃣ Testing connection...");
    await prisma.$connect();
    console.log("   ✅ Connection successful!\n");

    // Test if tables exist
    console.log("2️⃣ Checking tables...");
    
    const userCount = await prisma.user.count().catch((e) => {
      console.log("   ⚠️  Users table:", e.message);
      return null;
    });
    
    const productCount = await prisma.product.count().catch((e) => {
      console.log("   ⚠️  Products table:", e.message);
      return null;
    });

    if (userCount !== null) {
      console.log(`   ✅ Users table exists (${userCount} records)`);
    }
    
    if (productCount !== null) {
      console.log(`   ✅ Products table exists (${productCount} records)`);
    }

    // Test a simple query
    console.log("\n3️⃣ Testing query...");
    const result = await prisma.$queryRaw`SELECT version() as version`.catch((e) => {
      console.log("   ⚠️  Query failed:", e.message);
      return null;
    });

    if (result) {
      console.log("   ✅ Query successful!");
      console.log(`   📊 Database: ${(result as any)[0]?.version || "Unknown"}`);
    }

    console.log("\n✅✅✅ DATABASE CONNECTION TEST PASSED! ✅✅✅\n");
    process.exit(0);
  } catch (error) {
    console.error("\n❌❌❌ DATABASE CONNECTION TEST FAILED! ❌❌❌\n");
    
    if (error instanceof Error) {
      console.error("Error:", error.message);
      console.error("\nDetails:");
      console.error(error.stack);
      
      // Provide helpful suggestions
      if (error.message.includes("P1000") || error.message.includes("Authentication")) {
        console.error("\n💡 Suggestions:");
        console.error("   - Check if your IP is allowlisted in Supabase dashboard");
        console.error("   - Verify DATABASE_URL and DIRECT_URL in .env.local");
        console.error("   - Check if password is correctly URL-encoded");
        console.error("   - Try using the Supabase SQL Editor instead");
      }
    } else {
      console.error("Unknown error:", error);
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabaseConnection();

