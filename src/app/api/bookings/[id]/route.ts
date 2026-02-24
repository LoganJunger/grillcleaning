import { NextRequest, NextResponse } from "next/server";
import { getDb, Booking } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();
    const booking = db
      .prepare(
        `SELECT b.*, s.name as service_name,
                t.first_name || ' ' || t.last_name as technician_name
         FROM bookings b
         JOIN services s ON b.service_id = s.id
         LEFT JOIN technicians t ON b.technician_id = t.id
         WHERE b.id = ?`
      )
      .get(id);

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(booking);
  } catch (err) {
    console.error("[API] GET /api/bookings/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();
    const body = await request.json();

    const existing = db.prepare("SELECT * FROM bookings WHERE id = ?").get(id) as
      | Booking
      | undefined;

    if (!existing) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const updates: string[] = [];
    const values: (string | number | null)[] = [];

    const allowedFields = [
      "status",
      "technician_id",
      "booking_date",
      "booking_time",
      "notes",
      "customer_name",
      "customer_email",
      "customer_phone",
      "customer_address",
    ];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates.push(`${field} = ?`);
        values.push(body[field]);
      }
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    values.push(id);
    db.prepare(`UPDATE bookings SET ${updates.join(", ")} WHERE id = ?`).run(...values);

    const updated = db.prepare("SELECT * FROM bookings WHERE id = ?").get(id);
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[API] PUT /api/bookings/[id] error:", err);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();

    const existing = db.prepare("SELECT * FROM bookings WHERE id = ?").get(id);
    if (!existing) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    db.prepare("DELETE FROM bookings WHERE id = ?").run(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[API] DELETE /api/bookings/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 });
  }
}
