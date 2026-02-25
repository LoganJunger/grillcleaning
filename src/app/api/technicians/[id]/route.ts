import { NextRequest, NextResponse } from "next/server";
import { dbGet, dbRun, Technician } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await dbGet<Technician>("SELECT * FROM technicians WHERE id = ?", [id]);

    if (!existing) {
      return NextResponse.json({ error: "Technician not found" }, { status: 404 });
    }

    const updates: string[] = [];
    const values: (string | number | null)[] = [];

    const allowedFields = [
      "first_name",
      "last_name",
      "email",
      "phone",
      "service_area",
      "is_active",
      "notes",
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
    await dbRun(`UPDATE technicians SET ${updates.join(", ")} WHERE id = ?`, values);

    const updated = await dbGet("SELECT * FROM technicians WHERE id = ?", [id]);
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[API] PUT /api/technicians/[id] error:", err);
    return NextResponse.json({ error: "Failed to update technician" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await dbGet("SELECT * FROM technicians WHERE id = ?", [id]);
    if (!existing) {
      return NextResponse.json({ error: "Technician not found" }, { status: 404 });
    }

    // Check for assigned bookings
    const assignedBookings = await dbGet<{ count: number }>(
      "SELECT COUNT(*) as count FROM bookings WHERE technician_id = ? AND status IN ('pending', 'confirmed')",
      [id]
    );

    if (assignedBookings && assignedBookings.count > 0) {
      return NextResponse.json(
        {
          error: "Cannot delete technician with active bookings. Reassign bookings first.",
        },
        { status: 409 }
      );
    }

    await dbRun("DELETE FROM technicians WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[API] DELETE /api/technicians/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete technician" }, { status: 500 });
  }
}
