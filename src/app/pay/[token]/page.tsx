import { getDb, Booking, Service } from "@/lib/db";
import { notFound } from "next/navigation";
import PaymentClient from "./PaymentClient";

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const db = getDb();

  const booking = db.prepare(
    `SELECT b.*, s.name as service_name, s.duration_minutes
     FROM bookings b
     JOIN services s ON b.service_id = s.id
     WHERE b.payment_token = ?`
  ).get(token) as (Booking & { service_name: string; duration_minutes: number }) | undefined;

  if (!booking) {
    notFound();
  }

  if (booking.payment_status === "paid") {
    return (
      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Already Received</h1>
            <p className="text-gray-600 mb-6">
              Thank you, {booking.customer_name}! Your payment of{" "}
              <strong>{formatPrice(booking.total_cents)}</strong> has already been processed.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
              <p className="text-sm text-gray-500">
                Booking ID: <span className="font-mono text-gray-900">{booking.id}</span>
              </p>
              <p className="text-sm text-gray-500">
                Service: <span className="text-gray-900">{booking.service_name}</span>
              </p>
              <p className="text-sm text-gray-500">
                Date: <span className="text-gray-900">{booking.booking_date} at {booking.booking_time}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Complete Your Payment</h1>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Service</span>
              <span className="text-gray-900 font-medium">{booking.service_name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date</span>
              <span className="text-gray-900">{booking.booking_date}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Time</span>
              <span className="text-gray-900">{booking.booking_time}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Address</span>
              <span className="text-gray-900 text-right">
                {booking.customer_address}<br />
                {booking.customer_city}, {booking.customer_state} {booking.customer_zip}
              </span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-bold text-orange-500 text-xl">
                {formatPrice(booking.total_cents)}
              </span>
            </div>
          </div>

          <PaymentClient token={token} amount={booking.total_cents} />

          <p className="text-xs text-gray-400 text-center mt-4">
            Payment is optional. You can also pay at the time of service.
          </p>
        </div>
      </div>
    </section>
  );
}
