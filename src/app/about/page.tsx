import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://sevenhillsandgrill.com";
const OG_IMAGE = `${SITE_URL}/api/og?title=${encodeURIComponent("About Seven Hills and Grill")}&subtitle=${encodeURIComponent("Cincinnati's Trusted Grill Cleaning Experts")}`;

export const metadata: Metadata = {
  title: "About Seven Hills and Grill | Cincinnati Grill Cleaning Experts",
  description:
    "Learn about Seven Hills and Grill — Cincinnati's trusted grill cleaning company. Locally owned, fully insured, background-checked technicians serving the tri-state area since 2023.",
  openGraph: {
    title: "About Seven Hills and Grill | Cincinnati Grill Cleaning Experts",
    description:
      "Locally owned, fully insured grill cleaning serving Cincinnati since 2023.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Seven Hills and Grill",
    images: [OG_IMAGE],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About Us",
      item: `${SITE_URL}/about`,
    },
  ],
};

const milestones = [
  { year: "2023", label: "Founded in Cincinnati" },
  { year: "2024", label: "250th grill cleaned" },
  { year: "2025", label: "Expanded to Northern Kentucky" },
  { year: "2026", label: "500+ cleanings and counting" },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Header */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-bricolage text-4xl md:text-5xl font-bold mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A small Cincinnati team that does one thing really well.
          </p>
        </div>
      </section>

      {/* Meet the Owner */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-100 rounded-2xl shrink-0 flex items-center justify-center">
              <svg
                className="w-20 h-20 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={0.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <span className="text-xs font-semibold text-orange-500 tracking-wide uppercase">
                Meet the Owner
              </span>
              <h2 className="font-bricolage text-2xl font-bold text-gray-900 mt-1 mb-4">
                How It Started
              </h2>
              <div className="text-gray-600 space-y-4 leading-relaxed">
                <p>
                  Seven Hills and Grill started the way a lot of good ideas do
                  — out of frustration. After spending an entire Saturday trying
                  to deep clean a Weber Genesis that hadn&apos;t been touched in
                  three years, the thought was simple: there has to be someone
                  who does this professionally. Turns out, in Cincinnati, there
                  really wasn&apos;t. Not well, at least.
                </p>
                <p>
                  So we figured it out ourselves. Researched the right products
                  (food-safe, professional-grade degreasers — not the stuff from
                  the hardware store). Learned the differences between cleaning a
                  gas grill vs. a Big Green Egg vs. a commercial flat-top.
                  Started with friends&apos; grills, then neighbors, then word
                  got around.
                </p>
                <p>
                  Today we&apos;re a small team of three, all Cincinnati
                  natives, all background-checked and insured. We clean 10-15
                  grills a week across Greater Cincinnati and Northern Kentucky.
                  It&apos;s not a franchise and it&apos;s not a side gig —
                  it&apos;s what we do full-time, and we take real pride in it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Believe — prose, not card grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-bricolage text-2xl font-bold text-gray-900 mb-6">
            What We Believe
          </h2>
          <div className="text-gray-600 space-y-4 leading-relaxed">
            <p>
              We believe in doing work you can actually see. That&apos;s why
              every job comes with before-and-after photos — not because
              it&apos;s a marketing gimmick, but because the difference should
              be obvious. If it isn&apos;t, we haven&apos;t done our job.
            </p>
            <p>
              We charge flat rates because surprises are for birthdays, not
              invoices. The price on the website is the price you pay. We show
              up on time because your Saturday matters. And we use eco-friendly,
              food-safe products because your family is eating off the thing we
              just cleaned.
            </p>
            <p>
              If something isn&apos;t right, we come back and fix it — no
              questions, no awkward phone calls. We&apos;d rather lose money on
              a re-clean than lose a customer. That&apos;s not a corporate
              policy. It&apos;s just how we think a local business should work.
            </p>
          </div>
        </div>
      </section>

      {/* By the Numbers Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-bricolage text-2xl font-bold text-gray-900 text-center mb-12">
            By the Numbers
          </h2>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-orange-200 -translate-y-1/2" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {milestones.map((m) => (
                <div key={m.year} className="relative text-center">
                  <div className="relative z-10 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-sm shadow-md">
                    {m.year.slice(2)}
                  </div>
                  <p className="font-bold text-gray-900">{m.year}</p>
                  <p className="text-sm text-gray-500 mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AEO — Is professional grill cleaning worth it? */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-bricolage text-2xl font-bold text-gray-900 mb-4">
            Is professional grill cleaning worth it?
          </h2>
          <p className="text-gray-600 leading-relaxed" data-speakable="true">
            Yes. Professional grill cleaning removes carcinogenic carbon buildup
            that transfers to your food, improves heat distribution for more
            even cooking, extends the lifespan of your grill by preventing rust
            and corrosion, and eliminates grease-based fire hazards. Most
            homeowners who try a professional cleaning once say the difference
            is immediately obvious — and they book again the following year.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-bricolage text-3xl font-bold mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-orange-100 mb-8 text-lg">
            Book your first cleaning and see why hundreds of Cincinnati
            homeowners trust us.
          </p>
          <Link
            href="/book"
            className="inline-block bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-50 transition-colors"
          >
            Book Your Cleaning
          </Link>
        </div>
      </section>
    </>
  );
}
