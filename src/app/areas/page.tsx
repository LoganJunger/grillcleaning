import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://sevenhillsandgrill.com";
const OG_IMAGE = `${SITE_URL}/api/og?title=${encodeURIComponent("Service Areas")}&subtitle=${encodeURIComponent("Cincinnati, Mason, West Chester & NKY")}`;

export const metadata: Metadata = {
  title: "Grill Cleaning Service Areas | Cincinnati, Mason, West Chester & NKY",
  description:
    "Seven Hills and Grill serves Greater Cincinnati including Hyde Park, Mason, West Chester, Anderson Township, Blue Ash, and Northern Kentucky. Check availability in your area.",
  openGraph: {
    title: "Grill Cleaning Service Areas | Seven Hills and Grill",
    description:
      "Professional grill cleaning across Greater Cincinnati and Northern Kentucky.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grill Cleaning Service Areas - Cincinnati & NKY",
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
      name: "Service Areas",
      item: `${SITE_URL}/areas`,
    },
  ],
};

const areas = [
  {
    region: "East Side Cincinnati Grill Cleaning",
    description:
      "We serve Hyde Park, Oakley, and the East Side's beautiful older homes - many with big patios and Weber or Napoleon grills. Same-week availability for most East Side zip codes.",
    neighborhoods: [
      "Hyde Park",
      "Oakley",
      "Mount Lookout",
      "Indian Hill",
      "Madeira",
      "Kenwood",
      "Mariemont",
      "Terrace Park",
      "Milford",
    ],
  },
  {
    region: "North Cincinnati & Mason Grill Cleaning",
    description:
      "Mason, West Chester, and the northern suburbs have newer homes with built-in outdoor kitchens and high-end grills - Traeger, Big Green Egg, and Napoleon models are everywhere up here.",
    neighborhoods: [
      "Mason",
      "West Chester",
      "Liberty Township",
      "Blue Ash",
      "Montgomery",
      "Loveland",
      "Maineville",
      "Sharonville",
    ],
  },
  {
    region: "Central & West Cincinnati Grill Cleaning",
    description:
      "From Downtown's rooftop grills to Anderson Township's sprawling backyards, we cover central and west Cincinnati. Mount Adams and Clifton see a lot of compact Weber Kettles and kamado grills on smaller patios.",
    neighborhoods: [
      "Downtown Cincinnati",
      "Mount Adams",
      "Clifton",
      "Northside",
      "Western Hills",
      "Anderson Township",
      "Delhi",
    ],
  },
  {
    region: "Northern Kentucky Grill Cleaning",
    description:
      "We serve Fort Thomas, Fort Mitchell, and the surrounding NKY communities. Same pricing, same service - just across the river.",
    neighborhoods: [
      "Fort Thomas",
      "Fort Mitchell",
      "Edgewood",
      "Crestview Hills",
      "Florence",
      "Union",
    ],
  },
];

export default function AreasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-bricolage text-4xl md:text-5xl font-bold mb-4">
            Service Areas
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We proudly serve Cincinnati and the surrounding tri-state area.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-orange-50 text-orange-700 rounded-full px-6 py-3 text-sm font-medium">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              Serving 30+ neighborhoods across Greater Cincinnati
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {areas.map((area) => (
              <div key={area.region}>
                <h2 className="font-bricolage text-xl font-bold text-gray-900 mb-2 pb-2 border-b-2 border-orange-500">
                  {area.region}
                </h2>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  {area.description}
                </p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {area.neighborhoods.map((name) => (
                    <li
                      key={name}
                      className="flex items-center gap-2 text-gray-600 text-sm"
                    >
                      <svg
                        className="w-4 h-4 text-green-500 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
            <h3 className="font-bricolage text-xl font-bold text-gray-900 mb-2">
              Don&apos;t see your area?
            </h3>
            <p className="text-gray-600 mb-4">
              We&apos;re expanding! Contact us to check if we can service your
              location.
            </p>
            <a
              href="tel:+15135554745"
              className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              (513) 555-GRILL
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-bricolage text-3xl font-bold mb-4">
            Serving Your Neighborhood
          </h2>
          <p className="text-orange-100 mb-8 text-lg">
            Book online and we&apos;ll come to you. Same-week appointments
            available.
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
