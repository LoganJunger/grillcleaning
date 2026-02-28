"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Seven Hills <span className="text-orange-500">and Grill</span>
              </span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">
                Home
              </Link>
              <Link href="/services" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">
                Services
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">
                About
              </Link>
              <a href="tel:+15135554745" className="flex items-center gap-1.5 text-gray-600 hover:text-orange-500 font-medium transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (513) 555-GRILL
              </a>
              <Link href="/book"
                className="bg-orange-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                Book a Cleaning
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t space-y-3">
              <Link href="/" className="block text-gray-600 hover:text-orange-500 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/services" className="block text-gray-600 hover:text-orange-500 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Services & Pricing
              </Link>
              <Link href="/about" className="block text-gray-600 hover:text-orange-500 font-medium" onClick={() => setMobileMenuOpen(false)}>
                About Us
              </Link>
              <a href="tel:+15135554745" className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (513) 555-GRILL
              </a>
              <Link href="/book"
                className="block bg-orange-500 text-white px-5 py-2.5 rounded-lg font-semibold text-center hover:bg-orange-600"
                onClick={() => setMobileMenuOpen(false)}>
                Book a Cleaning
              </Link>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
