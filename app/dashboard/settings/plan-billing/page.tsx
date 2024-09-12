// app/dashboard/settings/plan-billing/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { PricingPopup } from "@/components/dashboard/PricingPopup";
import { AddCardDialog } from "@/components/dashboard/AddCardDialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchCards, fetchSubscriptionStatus, fetchInvoices, removeCard, setDefaultCard } from '@/services/api/fetchers';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

type Subscription = {
  planName: string;
  price: string;
  period: string;
  status?: string;
};

type CreditCard = {
  id: string;
  brand: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
};

type Invoice = {
  id: string;
  date: string;
  amount: string;
  status: string;
};

export default function PlanBilling() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const [fetchedSubscription, fetchedCards, fetchedInvoices] = await Promise.all([
          fetchSubscriptionStatus(user.uid),
          fetchCards(user.uid),
          fetchInvoices(user.uid)
        ]);

        setSubscription(fetchedSubscription);
        setCards(fetchedCards);
        setInvoices(fetchedInvoices);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to fetch account data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, toast]);

  const handleRemoveCard = async (id: string) => {
    if (!user) return;
    try {
      await removeCard(id, user.uid);
      setCards(prevCards => prevCards.filter(card => card.id !== id));
      toast({
        title: "Success",
        description: "Card removed successfully.",
      });
    } catch (error) {
      console.error('Error removing card:', error);
      toast({
        title: "Error",
        description: "Failed to remove card. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSetDefaultCard = async (id: string) => {
    if (!user) return;
    try {
      await setDefaultCard(id, user.uid);
      setCards(prevCards => prevCards.map(card => ({
        ...card,
        isDefault: card.id === id
      })));
      toast({
        title: "Success",
        description: "Default card updated successfully.",
      });
    } catch (error) {
      console.error('Error setting default card:', error);
      toast({
        title: "Error",
        description: "Failed to set default card. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
              You are currently subscribed to the {subscription ? subscription.planName : 'Free'} plan.
              {subscription && subscription.status && (
                <span className={`ml-2 text-sm font-medium ${
                  subscription.status === 'active' ? 'text-green-500' : 'text-yellow-500'
                }`}>
                  {subscription.status}
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">
              {subscription ? subscription.price : '£0'}<span className="text-lg font-normal">/{subscription ? subscription.period : 'month'}</span>
            </div>
          </CardContent>
          <CardFooter>
            <PricingPopup currentPlan={subscription?.planName || 'Free'}>
              <Button variant="outline" className="w-full">
                {subscription?.planName === 'Free' ? 'Upgrade Plan' : 'Change Plan'}
              </Button>
            </PricingPopup>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Manage your credit cards.</CardDescription>
          </CardHeader>
          <CardContent>
            {cards.length > 0 ? (
              <ul className="space-y-2">
                {cards.map((card) => (
                  <li key={card.id} className="flex items-center justify-between p-2 bg-secondary rounded-md">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{card.brand} ending in {card.last4}</p>
                        <p className="text-sm text-muted-foreground">Expires {card.expiryMonth}/{card.expiryYear}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {card.isDefault ? (
                        <span className="text-sm text-green-500">Default</span>
                      ) : (
                        <Button variant="ghost" size="sm" onClick={() => handleSetDefaultCard(card.id)}>
                          Set as Default
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveCard(card.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No credit cards on file</p>
            )}
          </CardContent>
          <CardFooter>
            <AddCardDialog onSuccess={(newCard) => setCards(prev => [...prev, newCard])}>
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add New Card
              </Button>
            </AddCardDialog>
          </CardFooter>
        </Card>
      </div>

      <Separator />

      <div>
        <h2 className="text-xl font-semibold mb-4">Invoice History</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                <TableCell>£{invoice.amount}</TableCell>
                <TableCell>{invoice.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}