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
    name: 'Starter',
    price: '$0',
    description: 'For individuals and small projects',
    features: [
      { name: 'QR Codes', value: 'Up to 1,000' },
      { name: 'Analytics', value: 'Basic' },
      { name: 'Customization', value: 'Limited' },
      { name: 'Support', value: 'Email' },
    ],
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'For growing businesses',
    features: [
      { name: 'QR Codes', value: 'Up to 10,000' },
      { name: 'Analytics', value: 'Advanced' },
      { name: 'Customization', value: 'Full' },
      { name: 'Support', value: 'Priority Email' },
    ],
  },
  {
    name: 'Enterprise',
    price: '$99',
    description: 'For large organizations',
    features: [
      { name: 'QR Codes', value: 'Unlimited' },
      { name: 'Analytics', value: 'Enterprise-grade' },
      { name: 'Customization', value: 'Advanced' },
      { name: 'Support', value: '24/7 Phone & Email' },
    ],
  },
]

const invoices = [
  { id: 'INV-001', date: '2023-05-01', amount: '$29.00', status: 'Paid' },
  { id: 'INV-002', date: '2023-06-01', amount: '$29.00', status: 'Paid' },
  { id: 'INV-003', date: '2023-07-01', amount: '$29.00', status: 'Pending' },
]

export default function PlanBilling() {
  const [selectedPlan, setSelectedPlan] = useState('Pro')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Plan & Billing</h1>
        <p className="text-muted-foreground">Manage your subscription and billing details.</p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>You are currently on the {selectedPlan} plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <Label
                key={plan.name}
                className={`flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary ${
                  selectedPlan === plan.name ? 'border-primary' : ''
                }`}
              >
                <RadioGroupItem value={plan.name} id={plan.name} className="sr-only" />
                <span className="text-lg font-semibold">{plan.name}</span>
                <span className="text-2xl font-bold">{plan.price}/mo</span>
                <span className="text-sm text-muted-foreground text-center">{plan.description}</span>
                <ul className="mt-4 space-y-2 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>{feature.name}: {feature.value}</span>
                    </li>
                  ))}
                </ul>
              </Label>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Update Plan</Button>
        </CardFooter>
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
                    <Badge variant={invoice.status === 'Paid' ? 'success' : 'warning'}>
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