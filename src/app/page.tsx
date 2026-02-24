"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Certified Professionals",
    description:
      "Our trained technicians handle every grill type with care, using professional-grade tools and eco-friendly cleaning solutions.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Convenient Scheduling",
    description:
      "Book online in minutes. We come to your home at a time that works for you, including weekends.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
    title: "Like-New Results",
    description:
      "We remove grease, carbon buildup, and grime to restore your grill to peak performance and appearance.",
  },
];

const steps = [
  {
    number: "1",
    title: "Book Online",
    description: "Choose your service and pick a date and time that works for you.",
  },
  {
    number: "2",
    title: "We Come to You",
    description:
      "A certified technician arrives at your home with all the equipment needed.",
  },
  {
    number: "3",
    title: "Enjoy Your Clean Grill",
    description:
      "Fire it up with confidence. Your grill is clean, safe, and ready to cook.",
  },
];

const testimonials = [
  {
    name: "Mike R.",
    location: "Hyde Park, Cincinnati",
    text: "I couldn't believe the difference. My 10-year-old Weber looked brand new after their deep clean service. Absolutely worth every penny.",
  },
  {
    name: "Sarah T.",
    location: "Mason, OH",
    text: "Super easy to book and the technician was on time, professional, and thorough. I'll be using them every spring from now on.",
  },
  {
    name: "Dave & Linda K.",
    location: "Anderson Township",
    text: "We have a big Traeger and a gas grill. They cleaned both and gave us tips on maintaining them. Highly recommend!",
  },
];

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
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
    service_id: "",
    booking_date: "",
    booking_time: "",
    notes: "",
  });

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoadingServices(false);
      })
      .catch(() => setLoadingServices(false));
  }, []);

  const selectedService = services.find((s) => s.id === form.service_id);

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

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Cincinnati&apos;s Premier{" "}
              <span className="text-orange-400">Grill Cleaning</span> Service
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              A dirty grill isn&apos;t just unappetizing &mdash; it&apos;s a health risk. Our
              professional technicians deep clean your grill at your home, removing grease,
              carbon, and bacteria so every cookout is safe and delicious.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#book"
                className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors text-center"
              >
                Book Your Cleaning
              </a>
              <Link
                href="/services"
                className="border border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors text-center"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Queen City Grill Cleaning?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We&apos;re Cincinnati&apos;s trusted grill cleaning experts, serving homeowners
              and businesses across the tri-state area.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="text-center p-8 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Three simple steps to a spotless grill.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#book"
              className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
            >
              Schedule Your Cleaning Today
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-8">
                <div className="flex gap-1 text-orange-400 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="book" className="py-20 bg-gray-50 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Book Your Cleaning
            </h2>
            <p className="text-lg text-gray-600">
              Fill out the form below and we&apos;ll get your grill sparkling clean.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
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
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Thank You, {form.customer_name}!
              </h3>
              <p className="text-gray-600 mb-6">
                Your grill cleaning has been scheduled. We&apos;ll send a confirmation email to{" "}
                <strong>{form.customer_email}</strong>.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left space-y-2 max-w-sm mx-auto">
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
              <p className="text-sm text-gray-500">
                A technician will be assigned and you&apos;ll receive a reminder before your
                appointment.
              </p>
            </div>
          ) : loadingServices ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Service Selection */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">1. Choose Your Service</h3>
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  2. Your Contact Information
                </h3>
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  3. Pick a Date & Time
                </h3>
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  4. Additional Notes (Optional)
                </h3>
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

      {/* Service Area */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Serving Greater Cincinnati</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            We proudly serve Cincinnati and surrounding communities including Mason, West
            Chester, Anderson Township, Hyde Park, Kenwood, Loveland, Milford, and Northern
            Kentucky.
          </p>
          <a
            href="#book"
            className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
          >
            Check Availability in Your Area
          </a>
        </div>
      </section>
    </>
  );
}
