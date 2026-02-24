"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface Service {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  duration_minutes: number;
  category: string;
}

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`;
}

const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

function BookingFormInner() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service");

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [bookingId, setBookingId] = useState("");

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
    customer_city: "Cincinnati",
    customer_state: "OH",
    customer_zip: "",
    service_id: preselectedService || "",
    booking_date: "",
    booking_time: "",
    notes: "",
  });

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        if (preselectedService) {
          setForm((f) => ({ ...f, service_id: preselectedService }));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [preselectedService]);

  const selectedService = services.find((s) => s.id === form.service_id);

  // Get tomorrow as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create booking");
      }

      const booking = await res.json();
      setBookingId(booking.id);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Booking Confirmed!</h1>
          </div>
        </section>
        <section className="py-20 bg-gray-50">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Thank You, {form.customer_name}!
              </h2>
              <p className="text-gray-600 mb-6">
                Your grill cleaning has been scheduled. We&apos;ll send a confirmation email to{" "}
                <strong>{form.customer_email}</strong>.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left space-y-2">
                <p className="text-sm text-gray-500">
                  Booking ID: <span className="font-mono text-gray-900">{bookingId}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Service:{" "}
                  <span className="text-gray-900">{selectedService?.name}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Date: <span className="text-gray-900">{form.booking_date}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Time: <span className="text-gray-900">{form.booking_time}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Total:{" "}
                  <span className="text-gray-900 font-semibold">
                    {selectedService ? formatPrice(selectedService.price_cents) : ""}
                  </span>
                </p>
              </div>
              <p className="text-sm text-gray-500">
                A technician will be assigned and you&apos;ll receive a reminder before your
                appointment.
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Page Header */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book a Cleaning</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Fill out the form below and we&apos;ll get your grill sparkling clean.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Service Selection */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">1. Choose Your Service</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <label
                      key={service.id}
                      className={`block border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        form.service_id === service.id
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="service_id"
                        value={service.id}
                        checked={form.service_id === service.id}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-gray-900">{service.name}</span>
                        <span className="font-bold text-orange-500">
                          {formatPrice(service.price_cents)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{service.description}</p>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  2. Your Contact Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="customer_name"
                      value={form.customer_name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="customer_email"
                      value={form.customer_email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="customer_phone"
                      value={form.customer_phone}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="customer_zip"
                      value={form.customer_zip}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{5}"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="customer_address"
                      value={form.customer_address}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="customer_city"
                      value={form.customer_city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      name="customer_state"
                      value={form.customer_state}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  3. Pick a Date & Time
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="booking_date"
                      value={form.booking_date}
                      onChange={handleChange}
                      min={minDate}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Time *
                    </label>
                    <select
                      name="booking_time"
                      value={form.booking_time}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  4. Additional Notes (Optional)
                </h2>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Grill type, location (backyard, patio), gate codes, special instructions..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Summary & Submit */}
              {selectedService && (
                <div className="bg-orange-50 rounded-xl border border-orange-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-2">Order Summary</h3>
                  <div className="flex justify-between text-gray-700 mb-1">
                    <span>{selectedService.name}</span>
                    <span className="font-semibold">
                      {formatPrice(selectedService.price_cents)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Payment collected at time of service. No upfront charge.
                  </p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || !form.service_id}
                className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Confirm Booking"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-24">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      }
    >
      <BookingFormInner />
    </Suspense>
  );
}
