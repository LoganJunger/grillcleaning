import { NextResponse } from "next/server";
import { getDb, Booking, Service } from "@/lib/db";
import { sendBookingReminder } from "@/lib/email";
import { logActivity } from "@/lib/logger";

export async function POST() {
  const db = getDb();

  // Find bookings for tomorrow that haven't had reminders sent
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const bookings = db.prepare(
    `SELECT b.*, s.name as service_name, s.description, s.price_cents, s.duration_minutes, s.category
     FROM bookings b
     JOIN services s ON b.service_id = s.id
     WHERE b.booking_date = ?
       AND b.reminder_sent = 0
       AND b.status IN ('pending', 'confirmed')`
  ).all(tomorrowStr) as (Booking & Service)[];

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

    sendBookingReminder(booking, service);
    sent++;

    logActivity(
      "reminder_sent",
      "booking",
      booking.id,
      `Reminder email sent to ${booking.customer_email} for ${booking.booking_date}`
    );
  }

  return NextResponse.json({ sent, date: tomorrowStr });
}
