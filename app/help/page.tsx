"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones, BookOpen, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";

const faqs = [
  { question: "How do I create a QR code?", answer: "To create a QR code, log in to your account, click on 'Create New QR Code', and follow the step-by-step instructions." },
  { question: "Can I customize my QR code?", answer: "Yes, you can customize your QR code's colors, add a logo, and choose from various patterns in the QR code creator tool." },
  { question: "How do I track scans of my QR code?", answer: "All scans are automatically tracked in your dashboard. You can view detailed analytics by clicking on a specific QR code in your account." },
];

export default function HelpPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-black text-white py-16 mb-12 flex-grow flex items-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Help Center</h1>
            <p className="text-lg text-gray-300 mb-4">Welcome to the QRTraffic Help Center. How can we assist you today?</p>
            <div className="flex items-center max-w-2xl mx-auto">
              <div className="relative flex-grow">
                <Input type="search" placeholder="Search for help..." className="pl-10 py-6 bg-gray-800 text-white border-gray-700 placeholder-gray-400 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl space-y-12 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/help/support" className="block">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Headphones className="h-6 w-6 text-primary" />
                <CardTitle className="ml-2 text-lg font-medium">Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Get help from our support team.</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/help/docs" className="block">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <CardTitle className="ml-2 text-lg font-medium">Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Browse our comprehensive documentation.</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/help/docs/release-notes" className="block">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <FileText className="h-6 w-6 text-primary" />
                <CardTitle className="ml-2 text-lg font-medium">Release Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Read about the latest updates and changes.</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-md">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-4 py-2 focus:outline-none focus:bg-gray-100 flex justify-between items-center"
                >
                  <span className="text-base font-medium">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${activeIndex === index ? 'rotate-180' : 'rotate-0'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {activeIndex === index && (
                  <div className="px-4 py-2">
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}