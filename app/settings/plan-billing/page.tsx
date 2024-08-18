// app/settings/plan-billing/page.tsx
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const plans = [
  { name: 'Starter', price: '$0', description: 'Up to 1,000 QR codes' },
  { name: 'Pro', price: '$29', description: 'Up to 10,000 QR codes' },
  { name: 'Enterprise', price: '$99', description: 'Unlimited QR codes' },
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
          <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="grid gap-4 grid-cols-3">
            {plans.map((plan) => (
              <Label
                key={plan.name}
                className={`flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary ${
                  selectedPlan === plan.name ? 'border-primary' : ''
                }`}
              >
                <RadioGroupItem value={plan.name} id={plan.name} className="sr-only" />
                <span className="text-lg font-semibold">{plan.name}</span>
                <span className="text-2xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.description}</span>
              </Label>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Update Plan</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>Update your billing details and address.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add billing information fields here */}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">Update Billing Info</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Update your payment method.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add payment method fields here */}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">Update Payment Method</Button>
        </CardFooter>
      </Card>
    </div>
  )
}