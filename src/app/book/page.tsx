import type { Metadata } from "next";
import { dbAll, Service } from "@/lib/db";
import BookingForm from "./BookingForm";

export const dynamic = "force-dynamic";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://sevenhillsandgrill.com";
const OG_IMAGE = `${SITE_URL}/api/og?title=${encodeURIComponent("Book a Grill Cleaning")}&subtitle=${encodeURIComponent("Same-Week Availability · Starting at $149")}`;

export const metadata: Metadata = {
  title: "Book a Grill Cleaning | Seven Hills and Grill — Cincinnati OH",
  description:
    "Book your professional grill cleaning in Cincinnati online. Choose your service, pick a time, and we come to you. No payment required to book. Same-week availability.",
  openGraph: {
    title: "Book a Grill Cleaning | Seven Hills and Grill",
    description:
      "Book your professional grill cleaning online. No payment required to book. Same-week availability.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Grill Cleaning — Cincinnati OH",
    images: [OG_IMAGE],
  },
};

export default async function BookPage() {
  const services = await dbAll<Service>(
    "SELECT * FROM services WHERE is_active = 1 ORDER BY price_cents ASC"
  );

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
          <BookingForm services={services} />
        </div>
      </section>
    </>
  );
}
