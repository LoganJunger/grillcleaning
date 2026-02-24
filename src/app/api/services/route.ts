import { NextResponse } from "next/server";
import { getDb, Service } from "@/lib/db";

export async function GET() {
  const db = getDb();
  const services = db
    .prepare("SELECT * FROM services WHERE is_active = 1 ORDER BY price_cents ASC")
    .all() as Service[];

  return NextResponse.json(services);
}
