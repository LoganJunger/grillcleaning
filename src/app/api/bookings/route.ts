import { NextRequest, NextResponse } from "next/server";
import { getDb, Booking, Service } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: NextRequest) {
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
}

export async function POST(request: NextRequest) {
  const db = getDb();
  const body = await request.json();

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

  // Get service price
  const service = db.prepare("SELECT * FROM services WHERE id = ?").get(service_id) as
    | Service
    | undefined;

  if (!service) {
    return NextResponse.json({ error: "Invalid service selected" }, { status: 400 });
  }

  const id = `bk_${uuidv4().split("-")[0]}`;

  const stmt = db.prepare(`
    INSERT INTO bookings (id, customer_name, customer_email, customer_phone,
      customer_address, customer_city, customer_state, customer_zip,
      service_id, booking_date, booking_time, notes, total_cents)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    service.price_cents
  );

  const booking = db.prepare("SELECT * FROM bookings WHERE id = ?").get(id) as Booking;

  return NextResponse.json(booking, { status: 201 });
}
