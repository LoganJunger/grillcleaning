import type { Metadata } from "next";
import Link from "next/link";
import { getDb, Service } from "@/lib/db";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Grill Revival Co. offers professional grill cleaning services starting at $149. Basic cleaning, deep clean & restoration, seasonal tune-ups, and commercial grill service in Cincinnati, OH.",
  openGraph: {
    title: "Grill Cleaning Services & Pricing | Grill Revival Co.",
    description:
      "Professional grill cleaning starting at $149. View our services and book online today.",
  },
};

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`;
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

const categoryLabels: Record<string, string> = {
  standard: "Residential",
  premium: "Premium",
  commercial: "Commercial",
};

const categoryColors: Record<string, string> = {
  standard: "bg-green-50 text-green-700",
  premium: "bg-orange-50 text-orange-700",
  commercial: "bg-blue-50 text-blue-700",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does a grill cleaning take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A basic cleaning takes about 1 hour, while a deep clean and restoration can take up to 2 hours depending on the grill's condition.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to be home during the grill cleaning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We prefer you to be home for the initial walkthrough, but you don't need to supervise. We'll let you know when we're finished.",
      },
    },
    {
      "@type": "Question",
      name: "What types of grills do you clean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We clean all types including gas grills, charcoal grills, pellet smokers (Traeger, Pit Boss), kamado grills (Big Green Egg), and commercial units.",
      },
    },
    {
      "@type": "Question",
      name: "Are your grill cleaning products safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We use professional-grade, food-safe, and eco-friendly products. Your grill will be safe to cook on immediately after cleaning.",
      },
    },
    {
      "@type": "Question",
      name: "How often should I have my grill professionally cleaned?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We recommend at least once a year, ideally at the start of grilling season. Heavy users should consider twice a year.",
      },
    },
  ],
};

export default function ServicesPage() {
  const db = getDb();
  const services = db
    .prepare("SELECT * FROM services WHERE is_active = 1 ORDER BY price_cents ASC")
    .all() as Service[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Page Header */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Services & Pricing</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Transparent pricing with no hidden fees. Every service includes a satisfaction
            guarantee.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                          categoryColors[service.category] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {categoryLabels[service.category] || service.category}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-900">{service.name}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-orange-500">
                        {formatPrice(service.price_cents)}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Approx. {formatDuration(service.duration_minutes)}</span>
                    </div>
                    <Link
                      href={`/book?service=${service.id}`}
                      className="bg-orange-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Every Cleaning Includes
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Complete degreasing of all cooking surfaces",
              "Burner and heat plate inspection",
              "Exterior wipe-down and polish",
              "Grease trap clean-out",
              "Before & after photos sent to you",
              "Post-cleaning performance test",
              "Eco-friendly cleaning products",
              "100% satisfaction guarantee",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4">
                <svg
                  className="w-5 h-5 text-green-500 mt-0.5 shrink-0"
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
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "How long does a cleaning take?",
                a: "A basic cleaning takes about 1 hour, while a deep clean and restoration can take up to 2 hours depending on the grill's condition.",
              },
              {
                q: "Do I need to be home during the cleaning?",
                a: "We prefer you to be home for the initial walkthrough, but you don't need to supervise. We'll let you know when we're finished.",
              },
              {
                q: "What types of grills do you clean?",
                a: "We clean all types including gas grills, charcoal grills, pellet smokers (Traeger, Pit Boss), kamado grills (Big Green Egg), and commercial units.",
              },
              {
                q: "Are your cleaning products safe?",
                a: "Yes! We use professional-grade, food-safe, and eco-friendly products. Your grill will be safe to cook on immediately after cleaning.",
              },
              {
                q: "How often should I have my grill professionally cleaned?",
                a: "We recommend at least once a year, ideally at the start of grilling season. Heavy users should consider twice a year.",
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Your Grill Sparkling?</h2>
          <p className="text-orange-100 mb-8 text-lg">
            Book your cleaning online and we&apos;ll handle the rest.
          </p>
          <Link
            href="/book"
            className="inline-block bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-50 transition-colors"
          >
            Book Your Cleaning Now
          </Link>
        </div>
      </section>
    </>
  );
}
