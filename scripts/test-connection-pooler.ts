import { PrismaClient } from "@prisma/client";

async function testPoolerConnection() {
  console.log("\n🔍 Testing Database Connection with Pooler...\n");
  
  const poolerUrl = process.env.DATABASE_URL;
  
  if (!poolerUrl) {
    console.error("❌ DATABASE_URL not found");
    process.exit(1);
  }
  
  console.log("Using Pooler Connection (port 6543)");
  console.log("Connection String (masked):", poolerUrl.split("@")[0] + "@***\n");
  
  try {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: poolerUrl,
        },
      },
      log: ["error", "warn"],
    });
    
    console.log("1️⃣ Attempting to connect...");
    await prisma.$connect();
    console.log("   ✅ Connection successful!\n");
    
    console.log("2️⃣ Testing query...");
    const result = await prisma.$queryRaw`SELECT version() as version`.catch((e) => {
      console.log("   ⚠️  Query failed:", e.message);
      return null;
    });
    
    if (result) {
      console.log("   ✅ Query successful!");
      const version = (result as any)[0]?.version || "Unknown";
      console.log(`   📊 Database: ${version.split(",")[0]}\n`);
    }
    
    console.log("3️⃣ Checking tables...");
    const userCount = await prisma.user.count().catch(() => null);
    const productCount = await prisma.product.count().catch(() => null);
    
    if (userCount !== null) {
      console.log(`   ✅ Users table exists (${userCount} records)`);
    } else {
      console.log("   ⚠️  Users table not found or error");
    }
    
    if (productCount !== null) {
      console.log(`   ✅ Products table exists (${productCount} records)`);
    } else {
      console.log("   ⚠️  Products table not found or error");
    }
    
    await prisma.$disconnect();
    console.log("\n✅✅✅ DATABASE CONNECTION TEST PASSED! ✅✅✅\n");
    process.exit(0);
  } catch (error: any) {
    console.error("\n❌❌❌ DATABASE CONNECTION TEST FAILED! ❌❌❌\n");
    console.error("Error:", error.message);
    
    if (error.message.includes("P1000") || error.message.includes("Authentication")) {
      console.error("\n💡 Authentication failed. Please verify:");
      console.error("   - Password is correct: sakhawat1232");
      console.error("   - Password was saved in Supabase");
      console.error("   - Connection string is correct");
    } else if (error.message.includes("unexpected message")) {
      console.error("\n💡 Connection issue. This might be:");
      console.error("   - SSL/TLS handshake problem");
      console.error("   - Connection pooler issue");
      console.error("   - Try using DIRECT_URL instead");
    }
    
    process.exit(1);
  }
}

require("dotenv").config({ path: ".env.local" });
testPoolerConnection();

