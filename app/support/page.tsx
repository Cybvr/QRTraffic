import React from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FAQs = [
  {
    question: "How do I create a QR code?",
    answer: "To create a QR code, log in to your QRTraffic account, click on 'Create New QR Code', choose the type of QR code you want to create, enter the required information, and click 'Generate'. You can then customize and download your QR code."
  },
  // ... (other FAQ items)
];

export default function Support() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-6">Support Center</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Search for Help</h2>
        <div className="flex gap-2">
          <Input type="text" placeholder="Search for answers..." className="flex-grow" />
          <Button>Search</Button>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQs.map((faq, index) => (
            <details key={index} className="border rounded-lg p-4">
              <summary className="font-medium cursor-pointer">{faq.question}</summary>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Video Tutorials</h2>
        <ul className="list-disc pl-5">
          <li><Link href="#" className="text-blue-600 hover:underline">Getting Started with QRTraffic</Link></li>
          <li><Link href="#" className="text-blue-600 hover:underline">Creating Your First QR Code</Link></li>
          <li><Link href="#" className="text-blue-600 hover:underline">Understanding QR Code Analytics</Link></li>
          <li><Link href="#" className="text-blue-600 hover:underline">Advanced QR Code Customization</Link></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
        <p className="mb-4">Can&apos;t find what you&apos;re looking for? Our support team is here to help!
</p>
        <Button>Contact Support</Button>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Helpful Resources</h2>
        <ul className="list-disc pl-5">
          <li><Link href="/product-guide" className="text-blue-600 hover:underline">Product Guide</Link></li>
          <li><Link href="/api-documentation" className="text-blue-600 hover:underline">API Documentation</Link></li>
          <li><Link href="/best-practices" className="text-blue-600 hover:underline">QR Code Best Practices</Link></li>
          <li><Link href="/release-notes" className="text-blue-600 hover:underline">Release Notes</Link></li>
        </ul>
      </section>
    </div>
  );
}