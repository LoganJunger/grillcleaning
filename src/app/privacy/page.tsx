import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Seven Hills and Grill privacy policy. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-sm text-gray-400">Last updated: February 2026</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
          <p className="text-gray-600 mb-4">
            When you book a cleaning or contact us, we collect your name, email address, phone
            number, and service address. This information is used solely to provide and improve our
            services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">How We Use Your Information</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
            <li>To schedule and perform grill cleaning services</li>
            <li>To send booking confirmations and reminders</li>
            <li>To process payments</li>
            <li>To communicate about your service</li>
            <li>To improve our services and customer experience</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Information Sharing</h2>
          <p className="text-gray-600 mb-4">
            We do not sell, trade, or rent your personal information to third parties. We may share
            information with service providers who assist us in operating our business (e.g., payment
            processors), subject to confidentiality agreements.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Data Security</h2>
          <p className="text-gray-600 mb-4">
            We implement reasonable security measures to protect your personal information. However,
            no method of transmission over the internet is 100% secure.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Cookies</h2>
          <p className="text-gray-600 mb-4">
            Our website may use cookies to enhance your browsing experience. You can choose to
            disable cookies through your browser settings.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Contact Us</h2>
          <p className="text-gray-600">
            If you have questions about this privacy policy, contact us at{" "}
            <a href="mailto:info@sevenhillsandgrill.com" className="text-orange-500 hover:text-orange-600">
              info@sevenhillsandgrill.com
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
