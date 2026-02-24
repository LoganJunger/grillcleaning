"use client";

import { useEffect, useState } from "react";

interface Booking {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  customer_state: string;
  customer_zip: string;
  service_name: string;
  technician_name: string | null;
  technician_id: string | null;
  booking_date: string;
  booking_time: string;
  status: string;
  notes: string | null;
  total_cents: number;
  created_at: string;
}

interface Technician {
  id: string;
  first_name: string;
  last_name: string;
  is_active: number;
}

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusOptions = ["pending", "confirmed", "completed", "cancelled"];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const fetchBookings = () => {
    const url = filter ? `/api/bookings?status=${filter}` : "/api/bookings";
    fetch(url)
      .then((res) => res.json())
      .then(setBookings)
      .catch(() => {});
  };

  useEffect(() => {
    Promise.all([
      fetch("/api/bookings").then((r) => r.json()),
      fetch("/api/technicians").then((r) => r.json()),
    ])
      .then(([b, t]) => {
        setBookings(b);
        setTechnicians(t);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading) fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const updateBooking = async (id: string, data: Record<string, string | null>) => {
    await fetch(`/api/bookings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    fetchBookings();
    setSelectedBooking(null);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Bookings</h1>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">All Statuses</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center text-gray-500">
          No bookings found.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b bg-gray-50">
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Date & Time</th>
                  <th className="px-4 py-3 font-medium">Technician</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{b.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{b.customer_name}</p>
                      <p className="text-xs text-gray-500">{b.customer_email}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{b.service_name}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {b.booking_date}
                      <br />
                      <span className="text-xs text-gray-400">{b.booking_time}</span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={b.technician_id || ""}
                        onChange={(e) =>
                          updateBooking(b.id, {
                            technician_id: e.target.value || null,
                          })
                        }
                        className="px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Unassigned</option>
                        {technicians
                          .filter((t) => t.is_active)
                          .map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.first_name} {t.last_name}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={b.status}
                        onChange={(e) => updateBooking(b.id, { status: e.target.value })}
                        className={`px-2 py-1 border-0 rounded-full text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          statusColors[b.status] || "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {formatPrice(b.total_cents)}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="text-orange-500 hover:text-orange-600 text-xs font-medium"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500">Booking ID:</span>{" "}
                <span className="font-mono">{selectedBooking.id}</span>
              </div>
              <div>
                <span className="text-gray-500">Customer:</span>{" "}
                {selectedBooking.customer_name}
              </div>
              <div>
                <span className="text-gray-500">Email:</span>{" "}
                {selectedBooking.customer_email}
              </div>
              <div>
                <span className="text-gray-500">Phone:</span>{" "}
                {selectedBooking.customer_phone}
              </div>
              <div>
                <span className="text-gray-500">Address:</span>{" "}
                {selectedBooking.customer_address}, {selectedBooking.customer_city},{" "}
                {selectedBooking.customer_state} {selectedBooking.customer_zip}
              </div>
              <div>
                <span className="text-gray-500">Service:</span>{" "}
                {selectedBooking.service_name}
              </div>
              <div>
                <span className="text-gray-500">Date:</span>{" "}
                {selectedBooking.booking_date} at {selectedBooking.booking_time}
              </div>
              <div>
                <span className="text-gray-500">Total:</span>{" "}
                <strong>{formatPrice(selectedBooking.total_cents)}</strong>
              </div>
              {selectedBooking.notes && (
                <div>
                  <span className="text-gray-500">Notes:</span>{" "}
                  {selectedBooking.notes}
                </div>
              )}
              <div>
                <span className="text-gray-500">Created:</span>{" "}
                {selectedBooking.created_at}
              </div>
            </div>
            <button
              onClick={() => setSelectedBooking(null)}
              className="mt-6 w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
