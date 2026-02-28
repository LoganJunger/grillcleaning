import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Grill Cleaning Tips & Guides | Cincinnati Grill Care Blog",
  description:
    "Expert grill cleaning tips, maintenance guides, and seasonal checklists from Cincinnati's top-rated grill cleaning professionals. Learn how to keep your grill in peak condition.",
  openGraph: {
    title: "Grill Cleaning Tips & Guides | Seven Hills and Grill Blog",
    description:
      "Expert grill cleaning tips and maintenance guides from Cincinnati's top-rated grill cleaning professionals.",
    images: [
      {
        url: "/api/og?title=Grill%20Cleaning%20Blog&subtitle=Tips%20%26%20Guides%20from%20Cincinnati%27s%20Grill%20Experts",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grill Cleaning Tips & Guides | Seven Hills and Grill Blog",
    images: [
      "/api/og?title=Grill%20Cleaning%20Blog&subtitle=Tips%20%26%20Guides%20from%20Cincinnati%27s%20Grill%20Experts",
    ],
  },
};

const posts = [
  {
    slug: "how-often-should-you-clean-your-grill",
    title:
      "How Often Should You Clean Your Grill? A Cincinnati Grillmaster's Guide",
    excerpt:
      "Learn the ideal cleaning frequency based on how often you grill, the health risks of a dirty grill, and when to call in the professionals.",
    date: "February 15, 2026",
    readTime: "6 min read",
  },
  {
    slug: "gas-vs-charcoal-grill-cleaning",
    title:
      "Gas vs. Charcoal Grill Cleaning: What's Different and Why It Matters",
    excerpt:
      "Gas and charcoal grills have very different cleaning needs. Here's what you need to know about grease traps, grate care, and deep cleaning for each type.",
    date: "February 8, 2026",
    readTime: "5 min read",
  },
  {
    slug: "grill-cleaning-cincinnati-spring-checklist",
    title: "Spring Grill Cleaning Checklist for Cincinnati Homeowners (2026)",
    excerpt:
      "Cincinnati's grilling season is right around the corner. Use this step-by-step checklist to get your grill ready for spring cookouts.",
    date: "February 1, 2026",
    readTime: "5 min read",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-bricolage text-4xl md:text-5xl font-bold mb-4">
            Grill Cleaning Blog
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Tips, guides, and seasonal checklists from Cincinnati&apos;s grill
            cleaning experts.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {posts.map((post) => (
              <article key={post.slug} className="border-b border-gray-200 pb-10 last:border-0">
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                  <time>{post.date}</time>
                  <span className="text-gray-300">·</span>
                  <span>{post.readTime}</span>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="font-bricolage text-2xl font-bold text-gray-900 hover:text-orange-500 transition-colors mb-3">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
