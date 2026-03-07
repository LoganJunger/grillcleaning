import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";

const SITE_NAME = "Seven Hills and Grill";
const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://sevenhillsandgrill.com";
const SITE_DESCRIPTION =
  "Professional grill cleaning service in Cincinnati, OH. We clean Weber, Traeger, Big Green Egg & all grill types at your home. Starting at $149. Book online - same-week availability.";

const OG_IMAGE = `${SITE_URL}/api/og?title=${encodeURIComponent("Seven Hills and Grill")}&subtitle=${encodeURIComponent("Professional Grill Cleaning · Cincinnati, OH")}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Grill Cleaning Cincinnati OH | ${SITE_NAME} | Book Online`,
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
    "Big Green Egg cleaning",
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
    title: `Grill Cleaning Cincinnati OH | ${SITE_NAME} | Book Online`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Professional Grill Cleaning in Cincinnati OH`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Grill Cleaning Cincinnati OH | ${SITE_NAME} | Book Online`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: SITE_URL,
  },
  other: {
    "geo.region": "US-OH",
    "geo.placename": "Cincinnati",
    "geo.position": "39.1031;-84.5120",
    "ICBM": "39.1031, -84.5120",
    "theme-color": "#f97316",
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
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
        image: [OG_IMAGE],
        logo: `${SITE_URL}/icon-512.png`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "123 Main St",
          addressLocality: "Cincinnati",
          addressRegion: "OH",
          postalCode: "45202",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 39.1031,
          longitude: -84.512,
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
          { "@type": "City", name: "Blue Ash" },
          { "@type": "City", name: "Indian Hill" },
          { "@type": "City", name: "Montgomery" },
        ],
        priceRange: "$149-$399",
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "08:00",
          closes: "18:00",
        },
        sameAs: [
          "https://www.facebook.com/sevenhillsandgrill",
          "https://www.instagram.com/sevenhillsandgrill",
          "https://nextdoor.com/pages/seven-hills-and-grill",
        ],
        hasMap:
          "https://maps.google.com/?q=Seven+Hills+and+Grill+Cincinnati+OH",
        currenciesAccepted: "USD",
        paymentAccepted: "Cash, Credit Card, Venmo, Zelle",
        foundingDate: "2026",
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          value: 1,
        },
        mentions: [
          { "@type": "Brand", name: "Weber" },
          { "@type": "Brand", name: "Traeger" },
          { "@type": "Brand", name: "Big Green Egg" },
          { "@type": "Brand", name: "Napoleon Grills" },
          { "@type": "Brand", name: "Pit Boss" },
          { "@type": "City", name: "Cincinnati" },
          { "@type": "State", name: "Ohio" },
        ],
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
        "@type": "WebPage",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["[data-speakable='true']"],
        },
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
                description:
                  "Thorough cleaning of grill grates, burners, and exterior. Includes degreasing and sanitizing all cooking surfaces.",
              },
              price: "149.00",
              priceCurrency: "USD",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Seasonal Tune-Up",
                description:
                  "Full inspection, cleaning, and performance check. Includes ignition and gas line inspection.",
              },
              price: "199.00",
              priceCurrency: "USD",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Deep Clean & Restoration",
                description:
                  "Complete disassembly and deep cleaning of all components. Restores heavily used or neglected grills.",
              },
              price: "249.00",
              priceCurrency: "USD",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Commercial Grill Service",
                description:
                  "Professional cleaning for restaurant and commercial grills. Includes health code compliance check.",
              },
              price: "399.00",
              priceCurrency: "USD",
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        name: "How Professional Grill Cleaning Works",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Book Online",
            text: "Choose your service and pick a date and time that works for you. No credit card required.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "We Come to You",
            text: "We arrive at your home with all equipment and supplies. No preparation needed on your end.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Enjoy Your Clean Grill",
            text: "Fire it up with confidence. Before and after photos are sent to you after the cleaning.",
          },
        ],
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-inter">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Replace G-XXXXXXXXXX with your real Google Analytics 4 measurement ID */}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
