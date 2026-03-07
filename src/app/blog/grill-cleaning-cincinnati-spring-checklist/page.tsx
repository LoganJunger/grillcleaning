import type { Metadata } from "next";
import Link from "next/link";
import BlogCta from "../BlogCta";

export const metadata: Metadata = {
  title:
    "Spring Grill Cleaning Checklist for Cincinnati Homeowners (2026)",
  description:
    "Get your grill ready for Cincinnati's grilling season with this step-by-step spring cleaning checklist. Covers gas, charcoal, pellet, and kamado grills.",
  openGraph: {
    type: "article",
    title: "Spring Grill Cleaning Checklist - Cincinnati 2026",
    description:
      "Step-by-step checklist to get your grill ready for Cincinnati's grilling season.",
    images: [
      {
        url: "/api/og?title=Spring%20Grill%20Cleaning%20Checklist&subtitle=Cincinnati%20Homeowners%20%282026%29",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spring Grill Cleaning Checklist - Cincinnati 2026",
    images: [
      "/api/og?title=Spring%20Grill%20Cleaning%20Checklist&subtitle=Cincinnati%20Homeowners%20%282026%29",
    ],
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Spring Grill Cleaning Checklist for Cincinnati Homeowners (2026)",
  datePublished: "2026-02-01",
  dateModified: "2026-02-01",
  author: {
    "@type": "Organization",
    name: "Seven Hills and Grill",
    url: "https://sevenhillsandgrill.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Seven Hills and Grill",
    url: "https://sevenhillsandgrill.com",
  },
  description:
    "Step-by-step spring grill cleaning checklist for Cincinnati homeowners covering all grill types.",
};

export default function Article() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="text-sm text-gray-400 hover:text-orange-400 transition-colors mb-4 inline-block"
          >
            ← Back to Blog
          </Link>
          <h1 className="font-bricolage text-3xl md:text-4xl font-bold mb-4">
            Spring Grill Cleaning Checklist for Cincinnati Homeowners (2026)
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <time>February 1, 2026</time>
            <span>·</span>
            <span>5 min read</span>
          </div>
        </div>
      </section>

      <article className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray prose-lg">
          <p className="text-xl text-gray-600 leading-relaxed">
            Cincinnati&apos;s grilling season typically kicks off in late March or early April - right when the weather turns and everyone starts thinking about backyard cookouts. But after sitting idle all winter, your grill needs more than just a quick heat-up before that first burger goes on. Here&apos;s a complete spring checklist.
          </p>

          <h2 className="font-bricolage text-2xl font-bold text-gray-900 mt-10 mb-4">Step 1: Inspect Before You Clean</h2>
          <p className="text-gray-600 leading-relaxed">
            Before touching any cleaning products, do a visual inspection. Cincinnati winters are tough on outdoor equipment - freezing temperatures, snow, and ice can cause damage you won&apos;t notice until you look.
          </p>
          <ul className="text-gray-600 space-y-2">
            <li><strong>Check for rust</strong> on grates, burners, and the firebox interior. Surface rust on grates can often be scrubbed off, but deep rust on burners means replacement.</li>
            <li><strong>Look for cracks</strong> in ceramic grills (Big Green Egg, Kamado Joe). Freeze-thaw cycles can cause hairline cracks in the ceramics if moisture got inside.</li>
            <li><strong>Inspect gas connections</strong> - check the hose from the propane tank for cracks or weathering. Spider webs in burner tubes are extremely common after winter (spiders love the gas smell).</li>
            <li><strong>Check the cover</strong> - if you used a grill cover, check for mold or mildew underneath. Cincinnati&apos;s humidity creates perfect conditions for mold growth.</li>
          </ul>

          <h2 className="font-bricolage text-2xl font-bold text-gray-900 mt-10 mb-4">Step 2: Remove Everything</h2>
          <p className="text-gray-600 leading-relaxed">
            Take out all removable components: grates, heat deflectors/flavorizer bars, burner covers, drip pans, and warming racks. For charcoal grills, remove the ash catcher and any remaining ash. Having everything out lets you clean each piece properly and inspect the firebox interior.
          </p>

          <h2 className="font-bricolage text-2xl font-bold text-gray-900 mt-10 mb-4">Step 3: Deep Clean the Interior</h2>
          <p className="text-gray-600 leading-relaxed">
            The firebox is where most of the carbon buildup lives. Use a grill-specific degreaser (not dish soap - it&apos;s not strong enough for carbonized grease) and a stiff brush. Scrape the walls and bottom, paying special attention to the area around the grease drain.
          </p>
          <p className="text-gray-600 leading-relaxed">
            For gas grills, use a pipe cleaner or small brush to clear each burner port. Clogged ports cause uneven flame patterns - you&apos;ll notice hot spots and cold spots on the cooking surface.
          </p>

          <h2 className="font-bricolage text-2xl font-bold text-gray-900 mt-10 mb-4">Step 4: Clean the Grates</h2>
          <p className="text-gray-600 leading-relaxed">
            Your method depends on the grate material:
          </p>
          <ul className="text-gray-600 space-y-2">
            <li><strong>Stainless steel grates:</strong> Soak in hot soapy water, scrub with a non-wire brush, rinse, and dry completely.</li>
            <li><strong>Cast iron grates:</strong> Scrub with a stiff brush (no soap), rinse, dry thoroughly, then re-season with a light coat of cooking oil.</li>
            <li><strong>Porcelain-coated grates:</strong> Use a soft brush only - wire brushes chip the coating, leading to rust underneath.</li>
          </ul>

          <h2 className="font-bricolage text-2xl font-bold text-gray-900 mt-10 mb-4">Step 5: Reassemble and Test</h2>
          <p className="text-gray-600 leading-relaxed">
            Put everything back together and do a test burn. For gas grills: turn all burners to high, close the lid, and let it heat for 15 minutes. Check for even heating across the surface and make sure the ignition works properly on each burner.
          </p>
          <p className="text-gray-600 leading-relaxed">
            For gas grills, also do a leak test: apply soapy water to all gas connections and watch for bubbles. If you see bubbles, tighten the connection or replace the hose.
          </p>

          <h2 className="font-bricolage text-2xl font-bold text-gray-900 mt-10 mb-4">Step 6: Clean the Exterior</h2>
          <p className="text-gray-600 leading-relaxed">
            Wipe down the exterior with a stainless steel cleaner (for stainless models) or warm soapy water (for painted models). Clean the side tables, tool hooks, and any exterior shelving. If you have a built-in grill on a patio, clean the surrounding area too.
          </p>

          <h2 className="font-bricolage text-2xl font-bold text-gray-900 mt-10 mb-4">Cincinnati-Specific Tips</h2>
          <ul className="text-gray-600 space-y-2">
            <li><strong>Timing:</strong> Mid-March is ideal for spring cleaning. Cincinnati typically sees its last freeze in late March, and you want to be ready when that first 65°F weekend hits.</li>
            <li><strong>Pollen season:</strong> Cincinnati&apos;s heavy pollen season (April-May) will coat your grill quickly. Consider keeping the cover on between uses even after cleaning.</li>
            <li><strong>Humidity:</strong> Our summer humidity promotes rust. After spring cleaning, apply a light oil coat to cast iron parts and make sure your grill cover has ventilation.</li>
          </ul>

          <h2 className="font-bricolage text-2xl font-bold text-gray-900 mt-10 mb-4">Or Let Us Handle It</h2>
          <p className="text-gray-600 leading-relaxed">
            This whole process takes 2-3 hours if you do it yourself. Our <Link href="/services" className="text-orange-500 hover:text-orange-600">Seasonal Tune-Up ($199)</Link> covers everything on this checklist plus a gas line inspection and performance test. We bring all the equipment and products - you just need to show us where the grill is.
          </p>

          <BlogCta />
        </div>
      </article>
    </>
  );
}
