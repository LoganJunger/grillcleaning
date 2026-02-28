import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Seven Hills and Grill provides professional grill cleaning across Cincinnati, OH and surrounding areas including Hyde Park, Indian Hill, Mason, West Chester, and more.",
};

const areas = [
  {
    region: "East Side",
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
    region: "North",
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
    region: "Central & West",
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
    region: "Northern Kentucky",
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
      {/* Header */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Service Areas</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We proudly serve Cincinnati and the surrounding tri-state area.
          </p>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {areas.map((area) => (
              <div key={area.region}>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-orange-500">
                  {area.region}
                </h2>
                <ul className="space-y-2">
                  {area.neighborhoods.map((name) => (
                    <li key={name} className="flex items-center gap-2 text-gray-600 text-sm">
                      <svg
                        className="w-4 h-4 text-green-500 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Don&apos;t see your area?</h3>
            <p className="text-gray-600 mb-4">
              We&apos;re expanding! Contact us to check if we can service your location.
            </p>
            <a
              href="tel:+15135554745"
              className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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

      {/* CTA */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Serving Your Neighborhood</h2>
          <p className="text-orange-100 mb-8 text-lg">
            Book online and we&apos;ll come to you. Same-week appointments available.
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
