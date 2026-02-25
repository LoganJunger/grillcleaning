import { NextResponse } from "next/server";
import { dbAll, Booking, Service } from "@/lib/db";
import { sendBookingReminder } from "@/lib/email";
import { logActivity } from "@/lib/logger";

export async function POST() {
  try {
    // Find bookings for tomorrow that haven't had reminders sent
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    const bookings = await dbAll<Booking & Service>(
      `SELECT b.*, s.name as service_name, s.description, s.price_cents, s.duration_minutes, s.category
       FROM bookings b
       JOIN services s ON b.service_id = s.id
       WHERE b.booking_date = ?
         AND b.reminder_sent = 0
         AND b.status IN ('pending', 'confirmed')`,
      [tomorrowStr]
    );

    let sent = 0;
    for (const booking of bookings) {
      const service = {
        id: booking.service_id,
        name: (booking as unknown as { service_name: string }).service_name,
        description: booking.description,
        price_cents: booking.price_cents || booking.total_cents,
        duration_minutes: booking.duration_minutes,
        category: booking.category,
        is_active: 1,
        created_at: "",
      } as Service;

      try {
        await sendBookingReminder(booking, service);
        sent++;

        await logActivity(
          "reminder_sent",
          "booking",
          booking.id,
          `Reminder email sent to ${booking.customer_email} for ${booking.booking_date}`
        );
      } catch (reminderErr) {
        console.error(`[API] Reminder failed for booking ${booking.id}:`, reminderErr);
      }
    }

    return NextResponse.json({ sent, date: tomorrowStr });
  } catch (err) {
    console.error("[API] POST /api/reminders error:", err);
    return NextResponse.json({ error: "Failed to send reminders" }, { status: 500 });
  }
}
