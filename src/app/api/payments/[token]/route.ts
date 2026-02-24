import { NextRequest, NextResponse } from "next/server";
import { getDb, Booking, Service } from "@/lib/db";
import { logActivity } from "@/lib/logger";
import { sendPaymentConfirmation } from "@/lib/email";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
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

    try {
      logActivity(
        "payment_received",
        "booking",
        booking.id,
        `Payment of $${(booking.total_cents / 100).toFixed(2)} received for booking ${booking.id}`
      );
    } catch (logErr) {
      console.error("[API] Payment activity log failed:", logErr);
    }

    try {
      sendPaymentConfirmation({ ...booking, payment_status: "paid" }, service);
    } catch (emailErr) {
      console.error("[API] Payment email failed:", emailErr);
    }

    return NextResponse.json({ success: true, booking_id: booking.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[API] POST /api/payments error:", message, err);
    return NextResponse.json(
      { error: `Payment processing failed: ${message}` },
      { status: 500 }
    );
  }
}
