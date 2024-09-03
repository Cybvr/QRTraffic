import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Headphones, BookOpen, FileText, Search } from "lucide-react";
import { Button } from '@/app/components/ui/button';
import { Input } from "@/app/components/ui/input";

export default function HelpPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
      <p className="text-lg text-muted-foreground mb-6">Welcome to the QRTraffic Help Center. Choose a section to get started:</p>
      <div className="relative mb-6 flex items-center">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search for help..." className="pl-8 mr-2" />
        <Button variant="outline">Search</Button>
      </div>
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
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { question: "How do I create a QR code?", answer: "To create a QR code, log in to your account, click on 'Create New QR Code', and follow the step-by-step instructions." },
            { question: "Can I customize my QR code?", answer: "Yes, you can customize your QR code's colors, add a logo, and choose from various patterns in the QR code creator tool." },
            { question: "How do I track scans of my QR code?", answer: "All scans are automatically tracked in your dashboard. You can view detailed analytics by clicking on a specific QR code in your account." },
          ].map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-base font-medium">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}