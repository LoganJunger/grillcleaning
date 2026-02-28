import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Seven Hills and Grill is Cincinnati's trusted professional grill cleaning service. Learn about our team, our mission, and why hundreds of homeowners trust us with their grills.",
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Cincinnati&apos;s trusted grill cleaning professionals.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg text-gray-600 space-y-4">
            <p>
              Seven Hills and Grill was born out of a simple observation: most people love grilling
              but dread the cleaning. We saw an opportunity to help Cincinnati homeowners enjoy their
              outdoor cooking without the hassle of deep-cleaning their grills.
            </p>
            <p>
              Based in the heart of Cincinnati &mdash; the City of Seven Hills &mdash; we bring
              professional-grade cleaning to your backyard. Our team is fully insured,
              background-checked, and trained to handle every type of grill, from standard gas
              models to high-end kamado cookers and commercial units.
            </p>
            <p>
              We use eco-friendly, food-safe products and leave your grill looking and performing
              like new. Every job comes with before-and-after photos and a 100% satisfaction
              guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What We Stand For</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Quality First",
                desc: "We never cut corners. Every grill gets the full treatment, every time.",
              },
              {
                title: "Transparency",
                desc: "Flat-rate pricing with no hidden fees. You know exactly what you're paying before we start.",
              },
              {
                title: "Reliability",
                desc: "We show up on time, every time. Your schedule matters to us.",
              },
              {
                title: "Eco-Friendly",
                desc: "Professional-grade products that are safe for your family, your food, and the environment.",
              },
              {
                title: "Community",
                desc: "We're proud to serve Cincinnati's neighborhoods and build lasting relationships with our customers.",
              },
              {
                title: "Satisfaction Guaranteed",
                desc: "Not happy? We'll come back and make it right — no questions asked.",
              },
            ].map((value) => (
              <div key={value.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h2>
          <p className="text-orange-100 mb-8 text-lg">
            Book your first cleaning and see why hundreds of Cincinnati homeowners trust us.
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
