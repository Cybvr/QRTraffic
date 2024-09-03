// File: app/settings/plan-billing/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Import router for navigation
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { fetchInvoices, fetchSubscriptionStatus, fetchPaymentMethod, createCheckoutSession } from '@/services/api'; // Import necessary API functions

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const plans = [
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
    priceId: 'price_1Hh1eTHzcfR34NFrZNdqbgKq' // Add unique price ID for each plan
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
    priceId: 'price_1Hh1eTHzcfR34NFrZNeabcde' 
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
    priceId: 'price_1Hh1eTHzcfR34NFrzxyznopq' 
  },
];

export default function PlanBilling() {
  const [selectedPlan, setSelectedPlan] = useState('Basic');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const router = useRouter(); // Use router for navigation

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);

  const handleSelectPlan = async (plan) => {
    if (plan.priceId) {
      // Create a checkout session and redirect to Stripe Checkout
      const session = await createCheckoutSession(plan.priceId);
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: session.id });
    }
  };

  useEffect(() => {
    // Fetch invoices on mount
    const fetchAndSetInvoices = async () => {
      try {
        const fetchedInvoices = await fetchInvoices();
        setInvoices(fetchedInvoices);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    // Fetch subscription status
    const fetchAndSetSubscription = async () => {
      try {
        const fetchedSubscription = await fetchSubscriptionStatus();
        setSubscription(fetchedSubscription);
      } catch (error) {
        console.error('Error fetching subscription status:', error);
      }
    };

    // Fetch payment method
    const fetchAndSetPaymentMethod = async () => {
      try {
        const fetchedPaymentMethod = await fetchPaymentMethod();
        setPaymentMethod(fetchedPaymentMethod);
      } catch (error) {
        console.error('Error fetching payment method:', error);
      }
    };

    fetchAndSetInvoices();
    fetchAndSetSubscription();
    fetchAndSetPaymentMethod();
  }, []);

  const currentPlan = plans.find(plan => plan.name === selectedPlan);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Plan & Billing</h1>
        <p className="text-muted-foreground">Manage your subscription and billing details.</p>
      </div>
      <Separator />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>
              You are currently subscribed to the {subscription ? subscription.planName : 'N/A'} plan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">
              {subscription ? subscription.price : 'N/A'}<span className="text-lg font-normal">/{subscription ? subscription.period : 'N/A'}</span>
            </div>
            <ul className="space-y-2 text-sm">
              {currentPlan.features.map((feature) => (
                <li key={feature.name} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>{feature.name}: {feature.value}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Dialog isOpen={isDialogOpen} onClose={handleDialogClose}>
              <DialogTrigger asChild onClick={handleDialogOpen}>
                <Button className="w-full">Change Plan</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select Your Plan</DialogTitle>
                </DialogHeader>
                <RadioGroup
                  value={selectedPlan}
                  onValueChange={setSelectedPlan}
                  className="grid gap-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((plan) => (
                      <Card key={plan.name} className={`flex flex-col ${selectedPlan === plan.name ? 'border-2 border-blue-500' : ''}`}>
                        <CardHeader>
                          <CardTitle className="text-xl">
                            {plan.name} {plan.name === selectedPlan && <span className="text-blue-500 text-sm ml-2">Current</span>}
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
                          <Button className="w-full" variant={selectedPlan === plan.name ? "default" : "outline"} onClick={() => handleSelectPlan(plan)}>
                            {selectedPlan === plan.name ? "Current Plan" : "Select Plan"}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </RadioGroup>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Manage your payment methods.</CardDescription>
          </CardHeader>
          <CardContent>
            {paymentMethod ? (
              <div className="flex items-center space-x-4">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{paymentMethod.brand} ending in {paymentMethod.last4}</p>
                  <p className="text-sm text-muted-foreground">Expires {paymentMethod.expiryMonth}/{paymentMethod.expiryYear}</p>
                </div>
              </div>
            ) : (
              <p>No payment method on file</p>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Update Payment Method</Button>
          </CardFooter>
        </Card>
      </div>

      <Separator />

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
  );
}