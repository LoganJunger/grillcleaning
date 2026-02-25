import { NextResponse } from "next/server";
import { dbAll, dbGet, dbRun } from "@/lib/db";

export async function GET() {
  const checks: Record<string, { ok: boolean; detail?: string }> = {};

  try {
    checks.database = { ok: true };

    // Tables exist
    const tables = await dbAll<{ name: string }>(
      "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
    );
    const tableNames = tables.map((t) => t.name);
    const required = ["bookings", "services", "technicians", "activity_log", "email_log"];
    const missing = required.filter((t) => !tableNames.includes(t));
    checks.tables = missing.length === 0
      ? { ok: true, detail: tableNames.join(", ") }
      : { ok: false, detail: `Missing: ${missing.join(", ")}` };

    // Services seeded
    const serviceCount = await dbGet<{ count: number }>("SELECT COUNT(*) as count FROM services");
    checks.services = serviceCount && serviceCount.count > 0
      ? { ok: true, detail: `${serviceCount.count} services` }
      : { ok: false, detail: "No services found" };

    // Write access
    try {
      await dbRun(
        "INSERT INTO activity_log (action, entity_type, details) VALUES (?, ?, ?)",
        ["health_check", "system", "Health check write test"]
      );
      checks.write_access = { ok: true };
    } catch (writeErr) {
      checks.write_access = {
        ok: false,
        detail: writeErr instanceof Error ? writeErr.message : String(writeErr),
      };
    }

    // Booking count
    const bookingCount = await dbGet<{ count: number }>("SELECT COUNT(*) as count FROM bookings");
    checks.bookings = { ok: true, detail: `${bookingCount?.count ?? 0} total bookings` };

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
