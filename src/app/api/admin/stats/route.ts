import { NextResponse } from "next/server";
import { dbGet, dbAll } from "@/lib/db";

export async function GET() {
  try {
    const totalBookings = await dbGet<{ count: number }>("SELECT COUNT(*) as count FROM bookings");

    const pendingBookings = await dbGet<{ count: number }>(
      "SELECT COUNT(*) as count FROM bookings WHERE status = 'pending'"
    );

    const confirmedBookings = await dbGet<{ count: number }>(
      "SELECT COUNT(*) as count FROM bookings WHERE status = 'confirmed'"
    );

    const completedBookings = await dbGet<{ count: number }>(
      "SELECT COUNT(*) as count FROM bookings WHERE status = 'completed'"
    );

    const totalRevenue = await dbGet<{ total: number }>(
      "SELECT COALESCE(SUM(total_cents), 0) as total FROM bookings WHERE status = 'completed'"
    );

    const activeTechnicians = await dbGet<{ count: number }>(
      "SELECT COUNT(*) as count FROM technicians WHERE is_active = 1"
    );

    const upcomingBookings = await dbAll(
      `SELECT b.*, s.name as service_name,
              t.first_name || ' ' || t.last_name as technician_name
       FROM bookings b
       JOIN services s ON b.service_id = s.id
       LEFT JOIN technicians t ON b.technician_id = t.id
       WHERE b.status IN ('pending', 'confirmed')
       ORDER BY b.booking_date ASC, b.booking_time ASC
       LIMIT 10`
    );

    return NextResponse.json({
      total_bookings: totalBookings?.count ?? 0,
      pending_bookings: pendingBookings?.count ?? 0,
      confirmed_bookings: confirmedBookings?.count ?? 0,
      completed_bookings: completedBookings?.count ?? 0,
      total_revenue_cents: totalRevenue?.total ?? 0,
      active_technicians: activeTechnicians?.count ?? 0,
      upcoming_bookings: upcomingBookings,
    });
  } catch (err) {
    console.error("[API] GET /api/admin/stats error:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
