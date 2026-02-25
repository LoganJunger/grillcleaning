import { NextResponse } from "next/server";
import { dbAll, Service } from "@/lib/db";

export async function GET() {
  try {
    const services = await dbAll<Service>(
      "SELECT * FROM services WHERE is_active = 1 ORDER BY price_cents ASC"
    );

    return NextResponse.json(services);
  } catch (err) {
    console.error("[API] GET /api/services error:", err);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
