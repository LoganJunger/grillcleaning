import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const checks: Record<string, { ok: boolean; detail?: string }> = {};

  // 1. Database connection
  try {
    const db = getDb();
    checks.database = { ok: true };

    // 2. Tables exist
    const tables = db
      .prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
      .all() as { name: string }[];
    const tableNames = tables.map((t) => t.name);
    const required = ["bookings", "services", "technicians", "activity_log", "email_log"];
    const missing = required.filter((t) => !tableNames.includes(t));
    checks.tables = missing.length === 0
      ? { ok: true, detail: tableNames.join(", ") }
      : { ok: false, detail: `Missing: ${missing.join(", ")}` };

    // 3. Services seeded
    const serviceCount = db.prepare("SELECT COUNT(*) as count FROM services").get() as { count: number };
    checks.services = serviceCount.count > 0
      ? { ok: true, detail: `${serviceCount.count} services` }
      : { ok: false, detail: "No services found" };

    // 4. Write access
    try {
      db.prepare(
        "INSERT INTO activity_log (action, entity_type, details) VALUES (?, ?, ?)"
      ).run("health_check", "system", "Health check write test");
      checks.write_access = { ok: true };
    } catch (writeErr) {
      checks.write_access = {
        ok: false,
        detail: writeErr instanceof Error ? writeErr.message : String(writeErr),
      };
    }

    // 5. Booking count
    const bookingCount = db.prepare("SELECT COUNT(*) as count FROM bookings").get() as { count: number };
    checks.bookings = { ok: true, detail: `${bookingCount.count} total bookings` };

  } catch (err) {
    checks.database = {
      ok: false,
      detail: err instanceof Error ? err.message : String(err),
    };
  }

  const allOk = Object.values(checks).every((c) => c.ok);
  return NextResponse.json(
    { status: allOk ? "healthy" : "unhealthy", checks },
    { status: allOk ? 200 : 503 }
  );
}
