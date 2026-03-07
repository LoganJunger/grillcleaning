import Link from "next/link";
import Image from "next/image";
import { dbAll, Service } from "@/lib/db";
import BookingForm from "./book/BookingForm";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

export const dynamic = "force-dynamic";

const features = [
  {
    label: "// Our Promise",
    title: "Trained & Insured",
    description:
      "We handle every grill type with care - Weber, Traeger, Big Green Egg, Napoleon, and 20+ more brands - using professional-grade tools and eco-friendly solutions.",
  },
  {
    label: "// What to Expect",
    title: "Convenient Scheduling",
    description:
      "Book online in minutes. We come to your home at a time that works for you, including weekends. Same-week appointments available.",
  },
  {
    label: "// Our Results",
    title: "Like-New Results",
    description:
      "We remove grease, carbon buildup, and grime to restore your grill to peak performance and appearance. We take before & after photos so you can see the difference.",
  },
  {
    label: "// Your Protection",
    title: "Satisfaction Guaranteed",
    description:
      "Not happy with the results? We\u2019ll come back and make it right at no extra cost. Flat-rate pricing with no hidden fees or surprises.",
  },
];

const steps = [
  {
    number: "1",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    title: "Book Online",
    description:
      "Choose your service and pick a date and time that works for you. No credit card required - you\u2019ll get a confirmation email right away.",
  },
  {
    number: "2",
    icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
    title: "We Come to You",
    description:
      "We arrive at your home with all the equipment needed. You don\u2019t need to prep anything.",
  },
  {
    number: "3",
    icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Enjoy Your Clean Grill",
    description:
      "Fire it up with confidence. We\u2019ll send before & after photos so you can see the results. Your grill is clean, safe, and ready to cook.",
  },
];

const serviceAreas = [
  "Cincinnati",
  "Hyde Park",
  "Indian Hill",
  "Mason",
  "West Chester",
  "Anderson Township",
  "Kenwood",
  "Blue Ash",
  "Montgomery",
  "Madeira",
  "Loveland",
  "Milford",
  "Mariemont",
  "Mt. Lookout",
  "Northern Kentucky",
];

export default async function HomePage() {
  const services = await dbAll<Service>(
    "SELECT * FROM services WHERE is_active = 1 ORDER BY price_cents ASC"
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white overflow-hidden min-h-screen flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&fm=webp&q=75"
          alt="Professional grill cleaning service in Cincinnati"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative w-full">
          <div className="max-w-3xl">
            {/* Local business marker */}
            <div className="flex flex-wrap items-center gap-2 mb-6 text-xs tracking-widest uppercase text-orange-400 font-medium">
              <span>Cincinnati, OH</span>
              <span className="text-orange-400/50">&middot;</span>
              <span>Locally Owned</span>
              <span className="text-orange-400/50">&middot;</span>
              <span>Insured</span>
            </div>

            <h1 className="font-bricolage text-4xl md:text-6xl font-bold leading-tight mb-6">
              Professional{" "}
              <span className="text-orange-400">Grill Cleaning</span> in
              Cincinnati, OH
            </h1>
            <p
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              data-speakable="true"
            >
              A grease-caked grill is a fire hazard and a health risk. We
              restore your grill to like-new condition - at your home, on your
              schedule. We clean Weber, Traeger, Big Green Egg, Napoleon, and
              all grill brands.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="#book"
                className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors text-center shadow-lg shadow-orange-500/25"
              >
                Book Your Cleaning
              </a>
              <Link
                href="/services"
                className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors text-center"
              >
                View Pricing
              </Link>
            </div>

            {/* Trust badges as pills */}
            <div className="flex flex-wrap gap-2">
              {[
                "Same-Week Availability",
                "Eco-Friendly Products",
                "Satisfaction Guaranteed",
                "Flat-Rate Pricing",
              ].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 text-xs bg-white/10 text-gray-300 px-3 py-1.5 rounded-full border border-white/10"
                >
                  <svg
                    className="w-3 h-3 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions Bar (replaces fake stats) */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "$149", label: "Starting Price" },
              { value: "1\u20132 hrs", label: "Typical Cleaning Time" },
              { value: "100%", label: "Satisfaction Guarantee" },
              { value: "All Brands", label: "Weber, Traeger, BGE & More" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-orange-500 font-bricolage">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - De-templated asymmetric layout */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bricolage text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Seven Hills and Grill
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We&apos;re a local Cincinnati grill cleaning service - dedicated,
              insured, and focused on doing one thing really well.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left column: 2 stacked cards */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="border-l-4 border-orange-500 pl-6 py-4"
                >
                  <span className="text-xs font-semibold text-orange-500 tracking-wide uppercase">
                    {feature.label}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Right column: Featured callout */}
            <div className="bg-gray-900 rounded-2xl p-8 text-white flex flex-col justify-center">
              <span className="text-xs font-semibold text-orange-400 tracking-wide uppercase mb-3">
                // The Bottom Line
              </span>
              <h3 className="font-bricolage text-2xl font-bold mb-4">
                Your grill deserves better than a wire brush and some hope.
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Our professional-grade process removes grease, carbon, and grime
                that DIY cleaning can&apos;t reach. We restore grills that
                homeowners thought were beyond saving - and we guarantee every
                job.
              </p>
              <a
                href="#book"
                className="inline-block bg-orange-500 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-sm"
              >
                Get Your Grill Cleaned
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After - Real image slider */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bricolage text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              See the Difference
            </h2>
            <p className="text-lg text-gray-600">
              Drag the slider to compare before and after a professional grill
              cleaning.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <BeforeAfterSlider />
            <p className="text-center text-sm text-gray-500 mt-4">
              Before & after photos included with every cleaning.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bricolage text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Three simple steps to a spotless grill.
            </p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-8">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-7 left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-0.5 border-t-2 border-dashed border-orange-300" />

            {steps.map((step) => (
              <div key={step.number} className="text-center relative">
                <div className="relative z-10 mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-orange-400 mx-auto mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={step.icon}
                    />
                  </svg>
                  <div className="w-14 h-14 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold shadow-lg">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#book"
              className="inline-block bg-orange-500 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/25"
            >
              Book My Cleaning &mdash; It Only Takes 2 Minutes
            </a>
          </div>
        </div>
      </section>

      {/* Our Guarantee (replaces fake testimonials) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bricolage text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Guarantee to You
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We stand behind every cleaning with straightforward promises - no
              fine print.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                Satisfaction Guaranteed
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                If you&apos;re not happy with the results, we&apos;ll come back
                and re-clean at no extra charge. No questions asked.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                No Hidden Fees
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The price on the website is the price you pay. We don&apos;t
                upsell, we don&apos;t add surprise charges, and we don&apos;t
                pad the invoice.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                Eco-Friendly Products
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We use food-safe, biodegradable cleaning products. Your grill is
                safe to cook on immediately after we&apos;re done.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section
        id="book"
        className="py-20 bg-gray-100 scroll-mt-16 border-t-4 border-orange-500"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bricolage text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Book Your Cleaning
            </h2>
            <p className="text-lg text-gray-600">
              Fill out the form below and we&apos;ll get your grill sparkling
              clean.
            </p>
          </div>
          <BookingForm services={services} />
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-bricolage text-3xl md:text-4xl font-bold mb-4">
            Serving Greater Cincinnati
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            We serve Cincinnati and surrounding communities across the tri-state
            area.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-3xl mx-auto">
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="bg-white/10 text-gray-200 px-4 py-2 rounded-full text-sm border border-white/10 hover:bg-white/20 transition-colors"
              >
                {area}
              </span>
            ))}
          </div>
          <a
            href="#book"
            className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
          >
            Check Availability in Your Area
          </a>
        </div>
      </section>

      {/* Floating Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t shadow-[0_-4px_12px_rgba(0,0,0,0.1)] p-3 z-40">
        <a
          href="#book"
          className="block bg-orange-500 text-white text-center py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
        >
          Book a Cleaning &mdash; From $149
        </a>
      </div>
    </>
  );
}
