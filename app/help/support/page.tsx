import Link from 'next/link'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { PlayCircle, Mail, BookOpen, FileText, HelpCircle } from "lucide-react"

export default function Component() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Support Center</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center space-x-2">
              <PlayCircle className="h-5 w-5" />
              <span>Video Tutorials</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              {[
                "Getting Started with QRTraffic",
                "Creating Your First QR Code",
                "Understanding QR Code Analytics"
              ].map((title, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <PlayCircle className="h-4 w-4 text-primary" />
                  <Link href="#" className="hover:underline">
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Contact Support</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-sm">Can't find what you're looking for? Our support team is here to help!</p>
            <Button size="sm" className="w-full sm:w-auto">
              <Mail className="mr-2 h-4 w-4" /> Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>Helpful Resources</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 text-sm">
            {[
              { title: "Product Guide", icon: BookOpen, href: "/help/docs/product-guide" },
              { title: "API Documentation", icon: FileText, href: "/help/docs/api-documentation" },
              { title: "QR Code Best Practices", icon: BookOpen, href: "/help/docs/best-practices" },
              { title: "Release Notes", icon: FileText, href: "/help/docs/release-notes" },
              { title: "FAQs", icon: HelpCircle, href: "http://qrtraffic.com/faqs" }
            ].map((item, index) => (
              <li key={index}>
                <Link href={item.href} className="flex items-center p-1.5 rounded-md hover:bg-accent">
                  <item.icon className="h-4 w-4 mr-2 text-primary" />
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}