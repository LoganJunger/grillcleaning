"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  total_bookings: number;
  pending_bookings: number;
  confirmed_bookings: number;
  completed_bookings: number;
  total_revenue_cents: number;
  active_technicians: number;
  upcoming_bookings: Array<{
    id: string;
    customer_name: string;
    service_name: string;
    technician_name: string | null;
    booking_date: string;
    booking_time: string;
    status: string;
    total_cents: number;
  }>;
}

function formatPrice(cents: number): string {
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  if (!stats) {
    return <p className="text-red-500">Failed to load dashboard data.</p>;
  }

  const cards = [
    {
      label: "Total Bookings",
      value: stats.total_bookings,
      color: "bg-blue-500",
    },
    {
      label: "Pending",
      value: stats.pending_bookings,
      color: "bg-yellow-500",
    },
    {
      label: "Confirmed",
      value: stats.confirmed_bookings,
      color: "bg-green-500",
    },
    {
      label: "Completed",
      value: stats.completed_bookings,
      color: "bg-gray-500",
    },
    {
      label: "Revenue",
      value: formatPrice(stats.total_revenue_cents),
      color: "bg-orange-500",
    },
    {
      label: "Active Technicians",
      value: stats.active_technicians,
      color: "bg-purple-500",
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-lg shadow-sm border p-4">
            <p className="text-sm text-gray-500 mb-1">{card.label}</p>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Upcoming Bookings */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Bookings</h2>
          <Link
            href="/admin/bookings"
            className="text-sm text-orange-500 hover:text-orange-600 font-medium"
          >
            View All
          </Link>
        </div>
        {stats.upcoming_bookings.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No upcoming bookings yet. They&apos;ll appear here when customers book.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Time</th>
                  <th className="px-4 py-3 font-medium">Technician</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {stats.upcoming_bookings.map((b) => (
                  <tr key={b.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{b.customer_name}</td>
                    <td className="px-4 py-3 text-gray-600">{b.service_name}</td>
                    <td className="px-4 py-3 text-gray-600">{b.booking_date}</td>
                    <td className="px-4 py-3 text-gray-600">{b.booking_time}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {b.technician_name || (
                        <span className="text-orange-500 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                          statusColors[b.status] || "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {formatPrice(b.total_cents)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
