'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Support() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>

      <Card>
        <CardHeader>
          <CardTitle>Video Tutorials</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li><Link href="#" className="text-blue-600 hover:underline">Getting Started with QRTraffic</Link></li>
            <li><Link href="#" className="text-blue-600 hover:underline">Creating Your First QR Code</Link></li>
            <li><Link href="#" className="text-blue-600 hover:underline">Understanding QR Code Analytics</Link></li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Can&apos;t find what you&apos;re looking for? Our support team is here to help!</p>
          <Button>Contact Support</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Helpful Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li><Link href="/product-guide" className="text-blue-600 hover:underline">Product Guide</Link></li>
            <li><Link href="/api-documentation" className="text-blue-600 hover:underline">API Documentation</Link></li>
            <li><Link href="/best-practices" className="text-blue-600 hover:underline">QR Code Best Practices</Link></li>
            <li><Link href="/release-notes" className="text-blue-600 hover:underline">Release Notes</Link></li>
            <li><Link href="http://qrtraffic.com/faqs" className="text-blue-600 hover:underline">FAQs</Link></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}