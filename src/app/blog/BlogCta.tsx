import Link from "next/link";

export default function BlogCta() {
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-8 mt-12">
      <h3 className="font-bricolage text-xl font-bold text-gray-900 mb-2">
        Skip the hassle — let us handle it.
      </h3>
      <p className="text-gray-600 mb-4">
        Seven Hills and Grill provides professional grill cleaning across
        Cincinnati. We bring all the equipment, use eco-friendly products, and
        guarantee your satisfaction. Starting at $149.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/book"
          className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-orange-600 transition-colors"
        >
          Book a Cleaning
        </Link>
        <Link
          href="/services"
          className="inline-block border-2 border-orange-500 text-orange-600 px-6 py-3 rounded-lg font-semibold text-center hover:bg-orange-50 transition-colors"
        >
          View Pricing
        </Link>
      </div>
    </div>
  );
}
