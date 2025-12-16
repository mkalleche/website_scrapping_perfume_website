import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();
    
    // Try a simple query to verify tables exist
    const userCount = await prisma.user.count().catch(() => null);
    const productCount = await prisma.product.count().catch(() => null);
    
    // Get database info
    const dbInfo = {
      connected: true,
      timestamp: new Date().toISOString(),
      tables: {
        users: userCount !== null ? userCount : "table not found",
        products: productCount !== null ? productCount : "table not found",
      },
      databaseUrl: process.env.DATABASE_URL
        ? `${process.env.DATABASE_URL.split("@")[0]}@***` // Mask password
        : "not configured",
      directUrl: process.env.DIRECT_URL
        ? `${process.env.DIRECT_URL.split("@")[0]}@***` // Mask password
        : "not configured",
    };

    return NextResponse.json(
      {
        status: "success",
        message: "✅ Database connection successful!",
        data: dbInfo,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorDetails = error instanceof Error ? error.stack : String(error);

    return NextResponse.json(
      {
        status: "error",
        message: "❌ Database connection failed!",
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? errorDetails : undefined,
        databaseUrl: process.env.DATABASE_URL
          ? `${process.env.DATABASE_URL.split("@")[0]}@***`
          : "not configured",
        directUrl: process.env.DIRECT_URL
          ? `${process.env.DIRECT_URL.split("@")[0]}@***`
          : "not configured",
      },
      { status: 500 }
    );
  } finally {
    // Disconnect to free up connection pool
    await prisma.$disconnect().catch(() => {
      // Ignore disconnect errors
    });
  }
}
