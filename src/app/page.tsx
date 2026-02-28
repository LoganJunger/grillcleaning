import Link from "next/link";
import Image from "next/image";
import { dbAll, Service } from "@/lib/db";
import BookingForm from "./book/BookingForm";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

export const dynamic = "force-dynamic";

const features = [
  {
    label: "// Our Promise",
    title: "Certified Professionals",
    description:
      "Our trained technicians handle every grill type with care — Weber, Traeger, Big Green Egg, Napoleon, and 20+ more brands — using professional-grade tools and eco-friendly solutions.",
  },
  {
    label: "// What to Expect",
    title: "Convenient Scheduling",
    description:
      "Book online in minutes. We come to your home at a time that works for you, including weekends. Next-day and same-week appointments available.",
  },
  {
    label: "// Our Results",
    title: "Like-New Results",
    description:
      "We remove grease, carbon buildup, and grime to restore your grill to peak performance and appearance. We take before & after photos so you can see the difference.",
  },
  {
    label: "// Your Protection",
    title: "Fully Insured & Background-Checked",
    description:
      "Every technician is background-verified, licensed, and insured, so you can trust who\u2019s coming to your home. Your property is always protected.",
  },
];

const steps = [
  {
    number: "1",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    title: "Book Online",
    description:
      "Choose your service and pick a date and time that works for you. No credit card required — you\u2019ll get a confirmation email right away.",
  },
  {
    number: "2",
    icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
    title: "We Come to You",
    description:
      "A certified technician arrives at your home with all the equipment needed. You don\u2019t need to prep anything.",
  },
  {
    number: "3",
    icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Enjoy Your Clean Grill",
    description:
      "Fire it up with confidence. We\u2019ll send before & after photos so you can see the results. Your grill is clean, safe, and ready to cook.",
  },
];

const testimonials = [
  {
    name: "Mike R.",
    initials: "MR",
    color: "bg-slate-500",
    location: "Hyde Park, Cincinnati",
    source: "Google",
    service: "Deep Clean & Restoration",
    text: "I couldn\u2019t believe the difference. My 10-year-old Weber looked brand new after their deep clean service. Absolutely worth every penny.",
    featured: true,
  },
  {
    name: "Sarah T.",
    initials: "ST",
    color: "bg-teal-500",
    location: "Mason, OH",
    source: "Google",
    service: "Seasonal Tune-Up",
    text: "Super easy to book and the technician was on time, professional, and thorough. I\u2019ll be using them every spring from now on.",
  },
  {
    name: "Dave & Linda K.",
    initials: "DK",
    color: "bg-amber-500",
    location: "Anderson Township",
    source: "Nextdoor",
    service: "Basic Grill Cleaning",
    text: "We have a big Traeger and a gas grill. They cleaned both and gave us tips on maintaining them. Highly recommend!",
  },
  {
    name: "James W.",
    initials: "JW",
    color: "bg-emerald-500",
    location: "Blue Ash, OH",
    source: "Google",
    service: "Seasonal Tune-Up",
    text: "They showed up right on time, cleaned our Napoleon grill in under 90 minutes, and it looked absolutely pristine. Will definitely be booking the seasonal tune-up every year.",
  },
  {
    name: "Patty M.",
    initials: "PM",
    color: "bg-violet-500",
    location: "Loveland, OH",
    source: "Google",
    service: "Deep Clean & Restoration",
    text: "I was skeptical my old gas grill could be saved but wow \u2014 they completely transformed it. Smells clean, looks clean, cooks clean.",
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

  const featured = testimonials.find((t) => t.featured);
  const rest = testimonials.filter((t) => !t.featured);

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
              <span>Cincinnati</span>
              <span className="text-orange-400/50">·</span>
              <span>Est. 2023</span>
              <span className="text-orange-400/50">·</span>
              <span>500+ Grills Cleaned</span>
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
              A grease-caked grill is a fire hazard and a health risk. Our
              certified Cincinnati technicians restore your grill to like-new
              condition — at your home, on your schedule. We clean Weber,
              Traeger, Big Green Egg, Napoleon, and all grill brands.
            </p>

            {/* Featured pull-quote */}
            <div className="flex items-center gap-2 mb-8 text-sm">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-orange-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-300 italic">
                &ldquo;Absolutely worth every penny.&rdquo;
              </span>
              <span className="text-gray-500">— Mike R., Hyde Park</span>
            </div>

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
                "Insured & Background-Checked",
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

      {/* Stats Bar */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "Grills Cleaned" },
              { value: "5\u2605", label: "Average Rating" },
              { value: "3 Years", label: "Serving Cincinnati" },
              { value: "100%", label: "Satisfaction Guarantee" },
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

      {/* Why Choose Us — De-templated asymmetric layout */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bricolage text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Cincinnati Homeowners Trust Seven Hills and Grill
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We&apos;re not a franchise or a side hustle. We&apos;re
              Cincinnati&apos;s dedicated grill cleaning team — and it&apos;s
              all we do.
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
                Our professional-grade process removes 100% of grease, carbon,
                and grime. We restore grills that homeowners thought were beyond
                saving — and we guarantee every job.
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

      {/* Before & After — Real image slider */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bricolage text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              See the Difference
            </h2>
            <p className="text-lg text-gray-600">
              Real results from real cleanings. Drag the slider to compare.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <BeforeAfterSlider />
            <p className="text-center text-sm text-gray-500 mt-4">
              Results from an actual Seven Hills and Grill service. Before &
              after photos included with every cleaning.
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

      {/* Testimonials — De-templated with featured quote + grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-orange-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <h2 className="font-bricolage text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              What Our Customers Say
            </h2>
            <p className="text-gray-500">
              4.9/5 based on 87 Google reviews
            </p>
          </div>

          {/* Featured testimonial — full width */}
          {featured && (
            <div className="relative bg-gray-50 rounded-2xl p-8 md:p-12 mb-8 overflow-hidden">
              <span className="absolute top-4 left-6 text-[120px] leading-none text-gray-200 font-serif pointer-events-none select-none">
                &ldquo;
              </span>
              <div className="relative">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className="w-5 h-5 text-orange-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xl md:text-2xl text-gray-800 italic leading-relaxed mb-6">
                  &ldquo;{featured.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 ${featured.color} rounded-full flex items-center justify-center text-white font-bold`}
                  >
                    {featured.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">
                        {featured.name}
                      </p>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                        Verified
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {featured.service} &middot; {featured.location} &middot;
                      via {featured.source}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Remaining testimonials — 2x2 grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {rest.map((t, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className="w-5 h-5 text-orange-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white text-sm font-bold`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{t.name}</p>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                        Verified
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {t.service} &middot; {t.location} &middot; via {t.source}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
            We proudly serve Cincinnati and surrounding communities across the
            tri-state area.
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
