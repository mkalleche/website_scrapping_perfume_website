import { PrismaClient } from "@prisma/client";

async function diagnoseConnection() {
  console.log("\n🔍 DIAGNOSING DATABASE CONNECTION ISSUE...\n");
  console.log("=" .repeat(60));
  
  // Check environment variables
  console.log("\n1️⃣ Checking Environment Variables:");
  const dbUrl = process.env.DATABASE_URL;
  const directUrl = process.env.DIRECT_URL;
  
  console.log("   DATABASE_URL:", dbUrl ? "✅ Found" : "❌ Missing");
  console.log("   DIRECT_URL:", directUrl ? "✅ Found" : "❌ Missing");
  
  if (!dbUrl || !directUrl) {
    console.error("\n❌ Missing environment variables!");
    process.exit(1);
  }
  
  // Parse connection strings
  console.log("\n2️⃣ Parsing Connection Strings:");
  
  const parseUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return {
        protocol: urlObj.protocol,
        username: urlObj.username,
        password: urlObj.password,
        hostname: urlObj.hostname,
        port: urlObj.port,
        database: urlObj.pathname.slice(1),
        searchParams: Object.fromEntries(urlObj.searchParams),
      };
    } catch (e) {
      return null;
    }
  };
  
  const dbParsed = parseUrl(dbUrl);
  const directParsed = parseUrl(directUrl);
  
  if (dbParsed) {
    console.log("   DATABASE_URL (Pooler):");
    console.log(`      Host: ${dbParsed.hostname}:${dbParsed.port}`);
    console.log(`      User: ${dbParsed.username}`);
    console.log(`      Password: ${dbParsed.password ? "***" + dbParsed.password.slice(-3) : "NOT SET"}`);
    console.log(`      Database: ${dbParsed.database}`);
    console.log(`      PgBouncer: ${dbParsed.searchParams.pgbouncer || "false"}`);
  }
  
  if (directParsed) {
    console.log("\n   DIRECT_URL (Direct):");
    console.log(`      Host: ${directParsed.hostname}:${directParsed.port}`);
    console.log(`      User: ${directParsed.username}`);
    console.log(`      Password: ${directParsed.password ? "***" + directParsed.password.slice(-3) : "NOT SET"}`);
    console.log(`      Database: ${directParsed.database}`);
  }
  
  // Test password encoding
  console.log("\n3️⃣ Checking Password Encoding:");
  const expectedPassword = "Aliparfum@99!!";
  const encodedPassword = encodeURIComponent(expectedPassword);
  console.log(`   Expected password: ${expectedPassword}`);
  console.log(`   URL-encoded: ${encodedPassword}`);
  
  if (directParsed) {
    const actualEncoded = directParsed.password;
    console.log(`   Actual in connection string: ${actualEncoded}`);
    
    // Decode to check
    try {
      const decoded = decodeURIComponent(actualEncoded);
      console.log(`   Decoded from connection string: ${decoded}`);
      
      if (decoded !== expectedPassword) {
        console.log(`   ⚠️  WARNING: Decoded password doesn't match expected password!`);
        console.log(`      Expected: "${expectedPassword}"`);
        console.log(`      Got: "${decoded}"`);
      } else {
        console.log(`   ✅ Password encoding looks correct`);
      }
    } catch (e) {
      console.log(`   ⚠️  Could not decode password: ${e}`);
    }
  }
  
  // Test connection with Prisma
  console.log("\n4️⃣ Testing Connection with Prisma:");
  console.log("   Attempting to connect using DIRECT_URL...");
  
  try {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: directUrl,
        },
      },
      log: ["error"],
    });
    
    await prisma.$connect();
    console.log("   ✅ Connection successful!");
    
    // Try a simple query
    const result = await prisma.$queryRaw`SELECT version() as version`.catch(() => null);
    if (result) {
      console.log("   ✅ Query successful!");
    }
    
    await prisma.$disconnect();
    console.log("\n✅✅✅ CONNECTION TEST PASSED! ✅✅✅\n");
    process.exit(0);
  } catch (error: any) {
    console.error("   ❌ Connection failed!");
    console.error(`   Error: ${error.message}`);
    
    // Detailed error analysis
    console.log("\n5️⃣ Error Analysis:");
    
    if (error.message.includes("P1000") || error.message.includes("Authentication")) {
      console.log("   ❌ Authentication Error Detected");
      console.log("\n   Possible causes:");
      console.log("   1. The database password is incorrect");
      console.log("   2. The password encoding is wrong");
      console.log("   3. The database user doesn't exist");
      console.log("   4. The database password was changed in Supabase");
      
      console.log("\n   💡 Solutions:");
      console.log("   1. Go to Supabase Dashboard → Settings → Database");
      console.log("   2. Check the actual database password");
      console.log("   3. If it's different, update .env.local with the correct password");
      console.log("   4. Make sure to URL-encode special characters:");
      console.log("      @ → %40");
      console.log("      ! → %21");
      console.log("      # → %23");
      console.log("      $ → %24");
      console.log("      % → %25");
      console.log("      & → %26");
    } else if (error.message.includes("ENOTFOUND") || error.message.includes("getaddrinfo")) {
      console.log("   ❌ DNS/Hostname Error");
      console.log("   The hostname cannot be resolved");
      console.log("   Check if the Supabase project is active");
    } else if (error.message.includes("ECONNREFUSED")) {
      console.log("   ❌ Connection Refused");
      console.log("   The database server is not accepting connections");
      console.log("   Check if the port is correct (5432 for direct, 6543 for pooler)");
    } else if (error.message.includes("timeout")) {
      console.log("   ❌ Connection Timeout");
      console.log("   The connection timed out");
      console.log("   Check your network connection and firewall settings");
    }
    
    console.log("\n❌❌❌ CONNECTION TEST FAILED! ❌❌❌\n");
    process.exit(1);
  }
}

// Load environment variables
require("dotenv").config({ path: ".env.local" });

diagnoseConnection();

