import { NextRequest, NextResponse } from "next/server";
import { dbAll } from "@/lib/db";

const ALL_SLOTS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ error: "date parameter required" }, { status: 400 });
    }

    const booked = await dbAll<{ booking_time: string }>(
      `SELECT booking_time FROM bookings
       WHERE booking_date = ? AND status NOT IN ('cancelled')`,
      [date]
    );

    const bookedTimes = new Set(booked.map((b) => b.booking_time));
    const availableSlots = ALL_SLOTS.filter((slot) => !bookedTimes.has(slot));

    return NextResponse.json({ date, available: availableSlots, booked: Array.from(bookedTimes) });
  } catch (err) {
    console.error("[API] GET /api/bookings/available-slots error:", err);
    return NextResponse.json(
      { error: "Failed to check available slots", date: null, available: [], booked: [] },
      { status: 500 }
    );
  }
}
