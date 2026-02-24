"use client";

import { useState, useEffect } from "react";
import CalendarPicker from "@/components/CalendarPicker";
import AddressAutocomplete from "@/components/AddressAutocomplete";

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

const ALL_TIME_SLOTS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

export default function BookingForm({ services }: { services: Service[] }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [paymentLink, setPaymentLink] = useState("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Kill ALL native browser validation — prevents "did not match expected pattern" in every browser
  useEffect(() => {
    const suppress = (e: Event) => e.preventDefault();
    document.addEventListener("invalid", suppress, true);
    return () => document.removeEventListener("invalid", suppress, true);
  }, []);

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
    customer_city: "Cincinnati",
    customer_state: "OH",
    customer_zip: "",
    service_id: "",
    booking_date: "",
    booking_time: "",
    notes: "",
  });

  const selectedService = services.find((s) => s.id === form.service_id);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  // Fetch available slots when date changes
  useEffect(() => {
    if (!form.booking_date) {
      setBookedSlots([]);
      return;
    }
    setLoadingSlots(true);
    fetch(`/api/bookings/available-slots?date=${form.booking_date}`)
      .then((res) => res.json())
      .then((data) => {
        setBookedSlots(data.booked || []);
        if (data.booked?.includes(form.booking_time)) {
          setForm((f) => ({ ...f, booking_time: "" }));
        }
      })
      .catch(() => setBookedSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [form.booking_date]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    setError("");

    // All validation in JS — no <form> element, no native browser validation
    if (!form.service_id) {
      setError("Please select a service.");
      return;
    }
    if (!form.customer_name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!form.customer_email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customer_email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!form.customer_phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }
    if (!form.customer_address.trim()) {
      setError("Please enter your street address.");
      return;
    }
    if (!form.customer_zip.trim() || !/^\d{5}(-\d{4})?$/.test(form.customer_zip)) {
      setError("Please enter a valid ZIP code (e.g., 45202 or 45202-1234).");
      return;
    }
    if (!form.booking_date || !/^\d{4}-\d{2}-\d{2}$/.test(form.booking_date)) {
      setError("Please select a date.");
      return;
    }
    if (form.booking_date <= new Date().toISOString().split("T")[0]) {
      setError("Please choose a future date.");
      return;
    }
    if (!form.booking_time) {
      setError("Please select a time slot.");
      return;
    }

    setSubmitting(true);

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
      if (booking.payment_token) {
        setPaymentLink(`/pay/${booking.payment_token}`);
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Thank You, {form.customer_name}!
        </h2>
        <p className="text-gray-600 mb-6">
          Your grill cleaning has been scheduled. A confirmation email has been sent to{" "}
          <strong>{form.customer_email}</strong>.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left space-y-2">
          <p className="text-sm text-gray-500">
            Booking ID: <span className="font-mono text-gray-900">{bookingId}</span>
          </p>
          <p className="text-sm text-gray-500">
            Service: <span className="text-gray-900">{selectedService?.name}</span>
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
        {paymentLink && (
          <a
            href={paymentLink}
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors mb-4"
          >
            Pay Online Now
          </a>
        )}
        <p className="text-sm text-gray-500">
          {paymentLink
            ? "Pay online now or at the time of service. A technician will be assigned and you'll receive a reminder before your appointment."
            : "A technician will be assigned and you'll receive a reminder before your appointment."}
        </p>
      </div>
    );
  }

  const availableSlots = ALL_TIME_SLOTS.filter((slot) => !bookedSlots.includes(slot));

  return (
    <div className="space-y-8">
      {/* Service Selection */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">1. Choose Your Service</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => { setForm({ ...form, service_id: service.id }); setError(""); }}
              className={`block border-2 rounded-lg p-4 cursor-pointer transition-colors text-left ${
                form.service_id === service.id
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-gray-900">{service.name}</span>
                <span className="font-bold text-orange-500">
                  {formatPrice(service.price_cents)}
                </span>
              </div>
              <p className="text-sm text-gray-500">{service.description}</p>
            </button>
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
            <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              id="customer_name"
              type="text"
              name="customer_name"
              autoComplete="off"
              value={form.customer_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              id="customer_email"
              type="text"
              name="customer_email"
              autoComplete="off"
              value={form.customer_email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="customer_phone" className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input
              id="customer_phone"
              type="text"
              name="customer_phone"
              autoComplete="off"
              value={form.customer_phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="customer_zip" className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
            <input
              id="customer_zip"
              type="text"
              name="customer_zip"
              autoComplete="off"
              value={form.customer_zip}
              onChange={handleChange}
              placeholder="45202"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
            <AddressAutocomplete
              value={form.customer_address}
              onChange={(val) => { setForm({ ...form, customer_address: val }); setError(""); }}
              onSelect={(s) => {
                setForm((f) => ({
                  ...f,
                  customer_address: s.street || f.customer_address,
                  customer_city: s.city || f.customer_city,
                  customer_state: s.state || f.customer_state,
                  customer_zip: s.zip || f.customer_zip,
                }));
                setError("");
              }}
            />
          </div>
          <div>
            <label htmlFor="customer_city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              id="customer_city"
              type="text"
              name="customer_city"
              autoComplete="off"
              value={form.customer_city}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="customer_state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input
              id="customer_state"
              type="text"
              name="customer_state"
              autoComplete="off"
              value={form.customer_state}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Date & Time */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">3. Pick a Date & Time</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date *</label>
            <CalendarPicker
              value={form.booking_date}
              onChange={(date) => { setForm({ ...form, booking_date: date }); setError(""); }}
              minDate={minDate}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Time *
              {loadingSlots && <span className="text-orange-500 ml-2 text-xs">Loading...</span>}
            </label>
            <select
              name="booking_time"
              value={form.booking_time}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select a time</option>
              {form.booking_date ? (
                availableSlots.length > 0 ? (
                  availableSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))
                ) : (
                  <option value="" disabled>No slots available for this date</option>
                )
              ) : (
                ALL_TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))
              )}
            </select>
            {form.booking_date && bookedSlots.length > 0 && (
              <p className="text-xs text-gray-400 mt-1">
                {bookedSlots.length} slot{bookedSlots.length > 1 ? "s" : ""} already booked for this date
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">4. Additional Notes (Optional)</h2>
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
            <span className="font-semibold">{formatPrice(selectedService.price_cents)}</span>
          </div>
          <p className="text-sm text-gray-500">
            Pay online after booking or at the time of service.
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={submitting || !form.service_id}
        className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting..." : "Confirm Booking"}
      </button>
    </div>
  );
}
