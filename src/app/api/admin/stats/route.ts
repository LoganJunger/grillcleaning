import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();

  const totalBookings = db.prepare("SELECT COUNT(*) as count FROM bookings").get() as {
    count: number;
  };

  const pendingBookings = db
    .prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'pending'")
    .get() as { count: number };

  const confirmedBookings = db
    .prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'confirmed'")
    .get() as { count: number };

  const completedBookings = db
    .prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'completed'")
    .get() as { count: number };

  const totalRevenue = db
    .prepare(
      "SELECT COALESCE(SUM(total_cents), 0) as total FROM bookings WHERE status = 'completed'"
    )
    .get() as { total: number };

  const activeTechnicians = db
    .prepare("SELECT COUNT(*) as count FROM technicians WHERE is_active = 1")
    .get() as { count: number };

  const upcomingBookings = db
    .prepare(
      `SELECT b.*, s.name as service_name,
              t.first_name || ' ' || t.last_name as technician_name
       FROM bookings b
       JOIN services s ON b.service_id = s.id
       LEFT JOIN technicians t ON b.technician_id = t.id
       WHERE b.status IN ('pending', 'confirmed')
       ORDER BY b.booking_date ASC, b.booking_time ASC
       LIMIT 10`
    )
    .all();

  return NextResponse.json({
    total_bookings: totalBookings.count,
    pending_bookings: pendingBookings.count,
    confirmed_bookings: confirmedBookings.count,
    completed_bookings: completedBookings.count,
    total_revenue_cents: totalRevenue.total,
    active_technicians: activeTechnicians.count,
    upcoming_bookings: upcomingBookings,
  });
}
