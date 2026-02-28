import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SITE_NAME = "Seven Hills and Grill";
const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://sevenhillsandgrill.com";
const SITE_DESCRIPTION =
  "Professional grill cleaning services in Cincinnati, OH and the tri-state area. Deep cleaning, restoration, and maintenance for all grill types. Book online today.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Professional Grill Cleaning in Cincinnati, OH`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "grill cleaning",
    "grill cleaning service",
    "Cincinnati grill cleaning",
    "professional grill cleaning",
    "BBQ cleaning",
    "grill deep cleaning",
    "grill restoration",
    "Cincinnati OH",
    "grill maintenance",
    "Weber cleaning",
    "Traeger cleaning",
    "commercial grill cleaning",
    "grill cleaning near me",
    "outdoor grill cleaning service",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Professional Grill Cleaning in Cincinnati, OH`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Professional Grill Cleaning in Cincinnati, OH`,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
  },
  other: {
    "geo.region": "US-OH",
    "geo.placename": "Cincinnati",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#business`,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        telephone: "+15135554745",
        email: "info@sevenhillsandgrill.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cincinnati",
          addressRegion: "OH",
          addressCountry: "US",
        },
        areaServed: [
          { "@type": "City", name: "Cincinnati" },
          { "@type": "City", name: "Mason" },
          { "@type": "City", name: "West Chester" },
          { "@type": "City", name: "Anderson Township" },
          { "@type": "City", name: "Hyde Park" },
          { "@type": "City", name: "Kenwood" },
          { "@type": "City", name: "Loveland" },
          { "@type": "City", name: "Milford" },
        ],
        priceRange: "$149-$399",
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "08:00",
          closes: "18:00",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "127",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#business` },
      },
      {
        "@type": "Service",
        name: "Professional Grill Cleaning",
        provider: { "@id": `${SITE_URL}/#business` },
        serviceType: "Grill Cleaning",
        areaServed: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: 39.1031,
            longitude: -84.512,
          },
          geoRadius: "50000",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Grill Cleaning Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Basic Grill Cleaning",
                description: "Thorough cleaning of grill grates, burners, and exterior.",
              },
              price: "149.00",
              priceCurrency: "USD",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Deep Clean & Restoration",
                description: "Complete disassembly and deep cleaning of all components.",
              },
              price: "249.00",
              priceCurrency: "USD",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Seasonal Tune-Up",
                description: "Full inspection, cleaning, and performance check.",
              },
              price: "199.00",
              priceCurrency: "USD",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Commercial Grill Service",
                description: "Professional cleaning for restaurant and commercial grills.",
              },
              price: "399.00",
              priceCurrency: "USD",
            },
          ],
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
