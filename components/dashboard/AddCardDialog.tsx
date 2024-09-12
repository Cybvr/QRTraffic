'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

type FormData = {
  name: string;
};

type CreditCard = {
  id: string;
  brand: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
};

type AddCardDialogProps = {
  children: React.ReactNode;
  onSuccess: (card: CreditCard) => void;
};

export function AddCardDialog({ children, onSuccess }: AddCardDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const { toast } = useToast();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (data: FormData) => {
    if (!stripe || !elements || !user) {
      toast({
        title: "Error",
        description: "Unable to process payment. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: data.name,
        },
      });

      if (error) {
        throw error;
      }

      // Send the payment method ID to your server
      const response = await fetch('/api/add-payment-method', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          userId: user.uid,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add payment method');
      }

      const result = await response.json();

      const newCard: CreditCard = {
        id: result.paymentMethod.id,
        brand: result.paymentMethod.card.brand,
        last4: result.paymentMethod.card.last4,
        expiryMonth: result.paymentMethod.card.exp_month.toString(),
        expiryYear: result.paymentMethod.card.exp_year.toString(),
        isDefault: result.isDefault,
      };

      onSuccess(newCard);
      toast({
        title: "Success",
        description: "New card added successfully.",
      });
      setIsOpen(false);
      reset();
    } catch (error) {
      console.error('Error adding new card:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add new card. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Card</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Name on Card</Label>
            <Input 
              id="name" 
              {...register("name", { required: "Name is required" })}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="card-element">Card Details</Label>
            <div className="mt-1 p-3 border rounded-md">
              <CardElement id="card-element" options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }} />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={!stripe}>Add Card</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}