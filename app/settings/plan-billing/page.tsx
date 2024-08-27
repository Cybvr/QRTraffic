'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard, MapPin } from "lucide-react"

const plans = [
  {
    name: 'Free',
    price: '£0',
    period: '1 Week',
    description: 'Test period',
    features: [
      { name: 'QR Codes', value: '1' },
      { name: 'Scans', value: 'Up to 100' },
      { name: 'Regular updates', value: 'None' },
      { name: 'Support', value: 'None' },
      { name: 'Custom designs', value: 'None' },
    ],
  },
  {
    name: 'Basic',
    price: '£7.99',
    period: 'month',
    description: 'For small businesses',
    features: [
      { name: 'QR Codes', value: 'Up to 3' },
      { name: 'Scans', value: '10,000' },
      { name: 'Regular updates', value: '12 months' },
      { name: 'Support', value: 'Email' },
      { name: 'Custom designs', value: 'None' },
    ],
  },
  {
    name: 'Pro',
    price: '£14.99',
    period: 'month',
    description: 'For growing businesses',
    features: [
      { name: 'QR Codes', value: 'Up to 50' },
      { name: 'Scans', value: 'Unlimited' },
      { name: 'Regular updates', value: '24 months' },
      { name: 'Support', value: 'Priority' },
      { name: 'Custom designs', value: 'Basic' },
    ],
  },
  {
    name: 'Enterprise',
    price: '£39.99',
    period: 'month',
    description: 'For large organizations',
    features: [
      { name: 'QR Codes', value: 'Up to 250' },
      { name: 'Scans', value: 'Unlimited' },
      { name: 'Regular updates', value: '36 months' },
      { name: 'Support', value: 'Dedicated manager' },
      { name: 'Custom designs', value: 'Advanced' },
    ],
  },
]

const invoices = [
  { id: 'INV-001', date: '2023-05-01', amount: '$29.00', status: 'Paid' },
  { id: 'INV-002', date: '2023-06-01', amount: '$29.00', status: 'Paid' },
  { id: 'INV-003', date: '2023-07-01', amount: '$29.00', status: 'Pending' },
]

export default function PlanBilling() {
  const [selectedPlan, setSelectedPlan] = useState('Free')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Plan & Billing</h1>
        <p className="text-muted-foreground">Manage your subscription and billing details.</p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Choose Your Plan</CardTitle>
          <CardDescription>Select the plan that best fits your needs.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedPlan}
            onValueChange={setSelectedPlan}
            className="grid gap-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan) => (
                <Card key={plan.name} className={`flex flex-col ${plan.name === 'Basic' ? 'border-2 border-blue-500' : ''}`}>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {plan.name} {plan.name === 'Basic' && <span className="text-blue-500 text-sm ml-2">Recommended</span>}
                    </CardTitle>
                    <CardDescription className="text-sm">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="text-3xl font-bold mb-4">
                      {plan.price}<span className="text-lg font-normal">/{plan.period}</span>
                    </div>
                    <RadioGroupItem value={plan.name} id={plan.name} className="sr-only" />
                    <ul className="space-y-2 text-sm">
                      {plan.features.map((feature) => (
                        <li key={feature.name} className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{feature.name}: {feature.value}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={selectedPlan === plan.name ? "default" : "outline"}>
                      {selectedPlan === plan.name ? "Current Plan" : "Select Plan"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
            <CardDescription>Your billing address and details.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">123 Main St, Anytown, USA 12345</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Update Billing Info</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Manage your payment methods.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Visa ending in 1234</p>
                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Update Payment Method</Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
          <CardDescription>View and download your past invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant={invoice.status === 'Paid' ? 'default' : 'secondary'}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Download</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}