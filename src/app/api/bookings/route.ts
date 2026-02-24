import { NextRequest, NextResponse } from "next/server";
import { getDb, Booking, Service } from "@/lib/db";
import { logActivity } from "@/lib/logger";
import { sendBookingConfirmation } from "@/lib/email";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let query = `
      SELECT b.*, s.name as service_name,
             t.first_name || ' ' || t.last_name as technician_name
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      LEFT JOIN technicians t ON b.technician_id = t.id
    `;
    const params: string[] = [];

    if (status) {
      query += " WHERE b.status = ?";
      params.push(status);
    }

    query += " ORDER BY b.booking_date ASC, b.booking_time ASC";

    const bookings = db.prepare(query).all(...params);
    return NextResponse.json(bookings);
  } catch (err) {
    console.error("[API] GET /api/bookings error:", err);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    const body = await request.json();
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

    const {
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      customer_city,
      customer_state,
      customer_zip,
      service_id,
      booking_date,
      booking_time,
      notes,
    } = body;

    // Validate required fields
    if (
      !customer_name ||
      !customer_email ||
      !customer_phone ||
      !customer_address ||
      !customer_zip ||
      !service_id ||
      !booking_date ||
      !booking_time
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get service info
    const service = db.prepare("SELECT * FROM services WHERE id = ?").get(service_id) as
      | Service
      | undefined;

    if (!service) {
      return NextResponse.json({ error: "Invalid service selected" }, { status: 400 });
    }

    // Check for time slot conflicts
    const existing = db.prepare(
      `SELECT id FROM bookings
       WHERE booking_date = ? AND booking_time = ?
       AND status NOT IN ('cancelled')`
    ).get(booking_date, booking_time) as { id: string } | undefined;

    if (existing) {
      return NextResponse.json(
        { error: "This time slot is already booked. Please choose a different time." },
        { status: 409 }
      );
    }

    const id = `bk_${uuidv4().split("-")[0]}`;
    const paymentToken = uuidv4();

    const stmt = db.prepare(`
      INSERT INTO bookings (id, customer_name, customer_email, customer_phone,
        customer_address, customer_city, customer_state, customer_zip,
        service_id, booking_date, booking_time, notes, total_cents, payment_token)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      customer_city || "Cincinnati",
      customer_state || "OH",
      customer_zip,
      service_id,
      booking_date,
      booking_time,
      notes || null,
      service.price_cents,
      paymentToken
    );

    const booking = db.prepare("SELECT * FROM bookings WHERE id = ?").get(id) as Booking;

    // Log the activity (non-critical, don't let it fail the booking)
    try {
      logActivity(
        "booking_created",
        "booking",
        id,
        `New booking: ${service.name} on ${booking_date} at ${booking_time} for ${customer_name}`,
        ip
      );
    } catch (logErr) {
      console.error("[API] Activity log failed:", logErr);
    }

    // Send confirmation email (non-critical, don't let it fail the booking)
    try {
      sendBookingConfirmation(booking, service);
    } catch (emailErr) {
      console.error("[API] Email send failed:", emailErr);
    }

    return NextResponse.json(booking, { status: 201 });
  } catch (err) {
    console.error("[API] POST /api/bookings error:", err);
    return NextResponse.json(
      { error: "Failed to create booking. Please try again." },
      { status: 500 }
    );
  }
}
