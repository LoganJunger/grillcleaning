import { NextRequest, NextResponse } from "next/server";
import { getDb, Booking, Service } from "@/lib/db";
import { logActivity } from "@/lib/logger";
import { sendPaymentConfirmation } from "@/lib/email";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const db = getDb();

  const booking = db.prepare("SELECT * FROM bookings WHERE payment_token = ?").get(token) as
    | Booking
    | undefined;

  if (!booking) {
    return NextResponse.json({ error: "Invalid payment link" }, { status: 404 });
  }

  if (booking.payment_status === "paid") {
    return NextResponse.json({ error: "Payment already processed" }, { status: 400 });
  }

  db.prepare("UPDATE bookings SET payment_status = 'paid' WHERE id = ?").run(booking.id);

  const service = db.prepare("SELECT * FROM services WHERE id = ?").get(booking.service_id) as Service;

  logActivity(
    "payment_received",
    "booking",
    booking.id,
    `Payment of $${(booking.total_cents / 100).toFixed(2)} received for booking ${booking.id}`
  );

  sendPaymentConfirmation({ ...booking, payment_status: "paid" }, service);

  return NextResponse.json({ success: true, booking_id: booking.id });
}
