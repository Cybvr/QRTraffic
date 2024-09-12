// components/dashboard/PricingPopup.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createCheckoutSession } from '@/services/api/fetchers';
import { useAuth } from "@/context/AuthContext";
import { loadStripe } from '@stripe/stripe-js';
import { isStripeEnabled } from '@/lib/stripe';

type Plan = {
  name: string;
  description: string;
  price: string;
  period: string;
  features: { name: string; value: string }[];
  priceId: string;
};

const plans: Plan[] = [
  {
    name: 'Basic',
    description: 'For small projects',
    price: '£9.99',
    period: 'month',
    features: [
      { name: 'Projects', value: '3' },
      { name: 'Users', value: '5' },
      { name: 'Storage', value: '10 GB' },
    ],
    priceId: 'price_1PsMXh2N40sxeNMwqFF0TRYE',
  },
  {
    name: 'Pro',
    description: 'For growing teams',
    price: '£19.99',
    period: 'month',
    features: [
      { name: 'Projects', value: '10' },
      { name: 'Users', value: '20' },
      { name: 'Storage', value: '50 GB' },
    ],
    priceId: 'price_1PsMVT2N40sxeNMwkhZxgosH',
  },
  {
    name: 'Enterprise',
    description: 'For large organizations',
    price: '£49.99',
    period: 'month',
    features: [
      { name: 'Projects', value: 'Unlimited' },
      { name: 'Users', value: 'Unlimited' },
      { name: 'Storage', value: '500 GB' },
    ],
    priceId: 'price_1PsMWd2N40sxeNMw5pXwn5qQ',
  },
];

type PricingPopupProps = {
  currentPlan: string;
  children: React.ReactNode;
};

export function PricingPopup({ currentPlan, children }: PricingPopupProps) {
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    setSelectedPlan(currentPlan);
  }, [currentPlan]);

  const handleSelectPlan = async (plan: Plan) => {
    if (!isStripeEnabled) {
      toast({
        title: "Error",
        description: "Stripe is currently disabled. Unable to process subscriptions.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Error",
        description: "Please log in to change your plan.",
        variant: "destructive",
      });
      return;
    }

    if (plan.name === currentPlan) {
      toast({
        title: "Info",
        description: "You are already subscribed to this plan.",
      });
      return;
    }

    if (plan.priceId) {
      try {
        const session = await createCheckoutSession(plan.name.toLowerCase(), user.uid);
        if (session && session.id) {
          const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
          if (stripe) {
            await stripe.redirectToCheckout({ sessionId: session.id });
          } else {
            throw new Error('Failed to load Stripe');
          }
        } else {
          throw new Error('Failed to create checkout session');
        }
      } catch (error) {
        console.error('Error creating checkout session:', error);
        toast({
          title: "Error",
          description: "Failed to initiate checkout. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Select Your Plan</DialogTitle>
        </DialogHeader>
        <RadioGroup
          value={selectedPlan}
          onValueChange={setSelectedPlan}
          className="grid gap-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.name} className={`flex flex-col ${selectedPlan === plan.name ? 'border-2 border-blue-500' : ''}`}>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {plan.name}
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
                  <Button 
                    className="w-full" 
                    variant={selectedPlan === plan.name ? "default" : "outline"} 
                    onClick={() => handleSelectPlan(plan)}
                    disabled={plan.name === currentPlan}
                  >
                    {plan.name === currentPlan ? 'Current Plan' : 'Select Plan'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </DialogContent>
    </Dialog>
  );
}