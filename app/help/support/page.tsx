import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, PlayCircle, FileText, HelpCircle } from 'lucide-react';

const videos = [
  { title: "Getting Started with QRTraffic", link: "#", thumbnail: "/placeholder.svg?height=192&width=384", duration: "5 min" },
  { title: "Creating Your First QR Code", link: "#", thumbnail: "/placeholder.svg?height=192&width=384", duration: "8 min" },
  { title: "Understanding QR Code Analytics", link: "#", thumbnail: "/placeholder.svg?height=192&width=384", duration: "10 min" },
  { title: "Advanced QR Code Customization", link: "#", thumbnail: "/placeholder.svg?height=192&width=384", duration: "12 min" },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section remains unchanged */}
      <div className="bg-black text-white py-16 mb-12 flex-grow flex items-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Support Center</h1>
            <p className="text-lg text-gray-300">How can we assist you today?</p>
          </div>
        </div>
      </div>

      {/* Enhanced content section */}
      <div className="container mx-auto px-4 max-w-6xl py-12 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4 space-y-6">
          <Card className="transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Mail className="h-6 w-6 text-primary" />
              <CardTitle className="ml-2 text-lg font-medium">Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm text-muted-foreground">Can't find what you're looking for? Our support team is here to help!</p>
              <Button size="sm" className="w-full">
                <Mail className="mr-2 h-4 w-4" /> Contact Support
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <FileText className="h-6 w-6 text-primary" />
              <CardTitle className="ml-2 text-lg font-medium">Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm text-muted-foreground">Explore our comprehensive documentation for in-depth information.</p>
              <Button variant="outline" size="sm" className="w-full">
                <FileText className="mr-2 h-4 w-4" /> View Docs
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <HelpCircle className="h-6 w-6 text-primary" />
              <CardTitle className="ml-2 text-lg font-medium">FAQs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm text-muted-foreground">Find quick answers to common questions about QRTraffic.</p>
              <Button variant="outline" size="sm" className="w-full">
                <HelpCircle className="mr-2 h-4 w-4" /> View FAQs
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold mb-2">Video Tutorials</CardTitle>
              <p className="text-sm text-muted-foreground">Learn how to use QRTraffic with these step-by-step video guides.</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                {videos.map((video, index) => (
                  <Link key={index} href={video.link} className="block group">
                    <Card className="h-full transition-all hover:shadow-md overflow-hidden">
                      <div className="relative h-48 overflow-hidden bg-muted">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="object-cover w-full h-full transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <PlayCircle className="h-12 w-12 text-white" />
                        </div>
                        <p className="absolute bottom-2 right-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                          {video.duration}
                        </p>
                      </div>
                      <CardContent>
                        <p className="mt-2 font-medium group-hover:text-primary transition-colors">{video.title}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}