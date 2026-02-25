import { NextRequest, NextResponse } from "next/server";
import { dbAll, dbGet, dbRun, Technician } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    const technicians = await dbAll<Technician>(
      "SELECT * FROM technicians ORDER BY first_name ASC"
    );

    return NextResponse.json(technicians);
  } catch (err) {
    console.error("[API] GET /api/technicians error:", err);
    return NextResponse.json({ error: "Failed to fetch technicians" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { first_name, last_name, email, phone, service_area, notes } = body;

    if (!first_name || !last_name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check for duplicate email
    const existing = await dbGet("SELECT id FROM technicians WHERE email = ?", [email]);
    if (existing) {
      return NextResponse.json(
        { error: "A technician with this email already exists" },
        { status: 409 }
      );
    }

    const id = `tech_${uuidv4().split("-")[0]}`;

    await dbRun(
      `INSERT INTO technicians (id, first_name, last_name, email, phone, service_area, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, first_name, last_name, email, phone, service_area || "Cincinnati", notes || null]
    );

    const technician = await dbGet<Technician>("SELECT * FROM technicians WHERE id = ?", [id]);
    return NextResponse.json(technician, { status: 201 });
  } catch (err) {
    console.error("[API] POST /api/technicians error:", err);
    return NextResponse.json({ error: "Failed to create technician" }, { status: 500 });
  }
}
