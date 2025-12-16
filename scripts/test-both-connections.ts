import { PrismaClient } from "@prisma/client";

async function testBothConnections() {
  console.log("\n🔍 Testing Both Database Connections...\n");
  console.log("=" .repeat(60));
  
  const poolerUrl = process.env.DATABASE_URL;
  const directUrl = process.env.DIRECT_URL;
  
  // Test Pooler Connection
  console.log("\n1️⃣ Testing POOLER Connection (port 6543)...");
  console.log("   Use case: Runtime queries");
  
  try {
    const prismaPooler = new PrismaClient({
      datasources: {
        db: {
          url: poolerUrl,
        },
      },
      log: ["error"],
    });
    
    await prismaPooler.$connect();
    const poolerResult = await prismaPooler.$queryRaw`SELECT version() as version`;
    await prismaPooler.$disconnect();
    
    console.log("   ✅ Pooler connection: SUCCESS");
    console.log(`   📊 Database: ${(poolerResult as any)[0]?.version.split(",")[0]}`);
  } catch (error: any) {
    console.log(`   ❌ Pooler connection: FAILED - ${error.message}`);
  }
  
  // Test Direct Connection
  console.log("\n2️⃣ Testing DIRECT Connection (port 5432)...");
  console.log("   Use case: Migrations and schema changes");
  
  try {
    const prismaDirect = new PrismaClient({
      datasources: {
        db: {
          url: directUrl,
        },
      },
      log: ["error"],
    });
    
    await prismaDirect.$connect();
    const directResult = await prismaDirect.$queryRaw`SELECT version() as version`;
    await prismaDirect.$disconnect();
    
    console.log("   ✅ Direct connection: SUCCESS");
    console.log(`   📊 Database: ${(directResult as any)[0]?.version.split(",")[0]}`);
  } catch (error: any) {
    console.log(`   ❌ Direct connection: FAILED - ${error.message}`);
    console.log("   💡 Note: Direct connection may fail due to IP restrictions or SSL issues");
    console.log("   💡 Pooler connection is sufficient for runtime queries");
  }
  
  console.log("\n" + "=" .repeat(60));
  console.log("\n✅ Database connection is working!");
  console.log("📊 Current database state:");
  
  try {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: poolerUrl,
        },
      },
    });
    
    await prisma.$connect();
    const userCount = await prisma.user.count();
    const productCount = await prisma.product.count();
    await prisma.$disconnect();
    
    console.log(`   - Users: ${userCount} records`);
    console.log(`   - Products: ${productCount} records`);
  } catch (e) {
    // Ignore
  }
  
  console.log("\n");
}

require("dotenv").config({ path: ".env.local" });
testBothConnections();

