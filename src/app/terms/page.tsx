import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Seven Hills and Grill terms of service. Read about our booking, cancellation, and service policies.",
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-sm text-gray-400">Last updated: February 2026</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Services</h2>
          <p className="text-gray-600 mb-4">
            Seven Hills and Grill LLC provides professional grill cleaning services in the
            Cincinnati, OH metropolitan area. By booking a service, you agree to these terms.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Booking & Scheduling</h2>
          <p className="text-gray-600 mb-4">
            All bookings are subject to availability. We will confirm your appointment within 2
            business hours. A confirmed booking constitutes an agreement for service at the
            specified date and time.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Cancellation Policy</h2>
          <p className="text-gray-600 mb-4">
            Free rescheduling or cancellation is available up to 24 hours before your scheduled
            appointment. Cancellations made less than 24 hours before the appointment may be
            subject to a cancellation fee.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Pricing & Payment</h2>
          <p className="text-gray-600 mb-4">
            All prices are listed on our website and are subject to change. Payment is due upon
            completion of service. We accept major credit cards and digital payments.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Satisfaction Guarantee</h2>
          <p className="text-gray-600 mb-4">
            We stand behind our work with a 100% satisfaction guarantee. If you&apos;re not
            satisfied with the results, contact us within 48 hours and we&apos;ll return to
            address any concerns at no additional charge.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Liability</h2>
          <p className="text-gray-600 mb-4">
            Seven Hills and Grill LLC is fully insured. We take every precaution to protect your
            property during service. In the unlikely event of damage caused by our team, we will
            work with you to resolve the issue promptly.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Contact</h2>
          <p className="text-gray-600">
            Questions about these terms? Reach us at{" "}
            <a href="mailto:info@sevenhillsandgrill.com" className="text-orange-500 hover:text-orange-600">
              info@sevenhillsandgrill.com
            </a>{" "}
            or call{" "}
            <a href="tel:+15135554745" className="text-orange-500 hover:text-orange-600">
              (513) 555-GRILL
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
