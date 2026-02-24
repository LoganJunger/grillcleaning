import { getDb, Service } from "@/lib/db";
import BookingForm from "./BookingForm";

export default function BookPage() {
  const db = getDb();
  const services = db
    .prepare("SELECT * FROM services WHERE is_active = 1 ORDER BY price_cents ASC")
    .all() as Service[];

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
