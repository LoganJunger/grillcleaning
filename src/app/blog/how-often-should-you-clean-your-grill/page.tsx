import type { Metadata } from "next";
import Link from "next/link";
import BlogCta from "../BlogCta";

export const metadata: Metadata = {
  title:
    "How Often Should You Clean Your Grill? A Cincinnati Grillmaster's Guide",
  description:
    "Learn the ideal grill cleaning frequency based on usage, the health risks of dirty grills, and when to hire a professional. Tips from Seven Hills and Grill in Cincinnati.",
  openGraph: {
    type: "article",
    title:
      "How Often Should You Clean Your Grill? A Cincinnati Grillmaster's Guide",
    description:
      "Learn the ideal grill cleaning frequency based on usage and the health risks of dirty grills.",
    images: [
      {
        url: "/api/og?title=How%20Often%20Should%20You%20Clean%20Your%20Grill%3F&subtitle=A%20Cincinnati%20Grillmaster%27s%20Guide",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Often Should You Clean Your Grill?",
    images: [
      "/api/og?title=How%20Often%20Should%20You%20Clean%20Your%20Grill%3F&subtitle=A%20Cincinnati%20Grillmaster%27s%20Guide",
    ],
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "How Often Should You Clean Your Grill? A Cincinnati Grillmaster's Guide",
  datePublished: "2026-02-15",
  dateModified: "2026-02-15",
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
    "Learn the ideal grill cleaning frequency based on usage, the health risks of dirty grills, and when to hire a professional.",
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
            How Often Should You Clean Your Grill? A Cincinnati Grillmaster&apos;s
            Guide
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <time>February 15, 2026</time>
            <span>·</span>
            <span>6 min read</span>
          </div>
        </div>
      </section>

      <article className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray prose-lg">
          <p className="text-xl text-gray-600 leading-relaxed">
            If you&apos;re like most Cincinnati homeowners, you fire up the grill regularly between April and October. But how often should you actually <em>clean</em> it? The answer depends on how much you grill - and what &ldquo;cleaning&rdquo; really means.
          </p>

          <h2 className="font-bricolage text-2xl font-bold text-gray-900 mt-10 mb-4">Quick Maintenance vs. Deep Cleaning</h2>
          <p className="text-gray-600 leading-relaxed">
            There&apos;s a big difference between the quick brush-down you do after every cookout and the deep cleaning your grill needs a few times a year. Quick maintenance - brushing the grates while they&apos;re hot, emptying the grease trap - should happen after every use. This takes five minutes and prevents buildup from becoming a bigger problem.
          </p>
          <p className="text-gray-600 leading-relaxed">
            A deep clean, however, involves disassembling the grill, degreasing all interior surfaces, cleaning the burners and heat deflectors, scrubbing the firebox, and polishing the exterior. This is the kind of cleaning that restores performance and extends the life of your grill by years.
          </p>

          <h2 className="font-bricolage text-2xl font-bold text-gray-900 mt-10 mb-4">How Often Should You Deep Clean?</h2>
          <p className="text-gray-600 leading-relaxed">
            Here&apos;s our recommendation based on usage:
          </p>
          <ul className="text-gray-600 space-y-2">
            <li><strong>Casual grillers (1-2x per month):</strong> One deep cleaning per year, ideally before grilling season starts in spring.</li>
            <li><strong>Regular grillers (1-2x per week):</strong> Two deep cleanings per year - spring and fall. Grease accumulates fast at this frequency.</li>
            <li><strong>Heavy grillers (3+ times per week):</strong> Three cleanings per year or more. At this usage level, carbon buildup affects flavor and heat distribution significantly.</li>
          </ul>

          <h2 className="font-bricolage text-2xl font-bold text-gray-900 mt-10 mb-4">The Health Risks of a Dirty Grill</h2>
          <p className="text-gray-600 leading-relaxed">
            This isn&apos;t just about aesthetics. Carbonized grease and food residue create carcinogenic compounds (polycyclic aromatic hydrocarbons, or PAHs) that transfer to your food when you cook. The FDA and health researchers have consistently flagged excessive char and carbon buildup as a health concern.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Beyond cancer risk, old grease is a fire hazard. Grease fires in outdoor grills are one of the most common causes of residential fires during summer in the Greater Cincinnati area. A clean grill is a safe grill.
          </p>

          <h2 className="font-bricolage text-2xl font-bold text-gray-900 mt-10 mb-4">Signs Your Grill Needs a Professional Cleaning</h2>
          <ul className="text-gray-600 space-y-2">
            <li>Uneven heating or hot spots across the cooking surface</li>
            <li>Flare-ups that happen more frequently than they used to</li>
            <li>Visible grease dripping below the firebox</li>
            <li>A persistent off-taste or smoke smell, even with clean food</li>
            <li>Rust starting to appear on grates, burners, or the firebox</li>
            <li>You can&apos;t remember the last time it was deep cleaned</li>
          </ul>

          <h2 className="font-bricolage text-2xl font-bold text-gray-900 mt-10 mb-4">DIY vs. Professional Grill Cleaning</h2>
          <p className="text-gray-600 leading-relaxed">
            Can you deep clean a grill yourself? Absolutely. But it takes 2-3 hours, requires specialized degreasers (not dish soap), and means disassembling components you might not be comfortable putting back together. Most people try it once and decide it&apos;s not worth the effort.
          </p>
          <p className="text-gray-600 leading-relaxed" data-speakable="true">
            In Cincinnati, professional grill cleaning typically ranges from $149 for a basic cleaning to $399 for commercial services. Seven Hills and Grill offers flat-rate pricing with no hidden fees. A professional cleaning takes about 1-2 hours, and we bring all the equipment - you don&apos;t need to do anything.
          </p>

          <h2 className="font-bricolage text-2xl font-bold text-gray-900 mt-10 mb-4">The Bottom Line</h2>
          <p className="text-gray-600 leading-relaxed">
            At minimum, get your grill deep cleaned once a year. If you grill regularly, twice a year is ideal. Your food will taste better, your grill will last longer, and you&apos;ll eliminate real fire and health risks. It&apos;s one of those things that&apos;s easy to put off - but makes a noticeable difference the moment it&apos;s done.
          </p>

          <BlogCta />
        </div>
      </article>
    </>
  );
}
