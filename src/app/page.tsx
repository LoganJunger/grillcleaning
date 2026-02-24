import Link from "next/link";
import { getDb, Service } from "@/lib/db";
import BookingForm from "./book/BookingForm";

const features = [
  {
    iconPath:
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: "Certified Professionals",
    description:
      "Our trained technicians handle every grill type with care, using professional-grade tools and eco-friendly cleaning solutions.",
  },
  {
    iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Convenient Scheduling",
    description:
      "Book online in minutes. We come to your home at a time that works for you, including weekends.",
  },
  {
    iconPath:
      "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
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
  const db = getDb();
  const services = db
    .prepare("SELECT * FROM services WHERE is_active = 1 ORDER BY price_cents ASC")
    .all() as Service[];

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
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={feature.iconPath}
                    />
                  </svg>
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
          <BookingForm services={services} />
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
