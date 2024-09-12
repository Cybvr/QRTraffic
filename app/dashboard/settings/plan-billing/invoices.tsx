// File: app/dashboard/settings/plan-billing/invoices.tsx

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Invoice = {
  id: string;
  date: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Overdue';
};

const fetchInvoices = async (): Promise<Invoice[]> => {
  // Simulate fetching invoices from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'INV-001', date: '2023-09-01', amount: '£14.99', status: 'Paid' },
        { id: 'INV-002', date: '2023-10-01', amount: '£14.99', status: 'Paid' },
        { id: 'INV-003', date: '2023-11-01', amount: '£14.99', status: 'Pending' },
      ]);
    }, 1000);
  });
};

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const fetchedInvoices = await fetchInvoices();
        setInvoices(fetchedInvoices);
      } catch (err) {
        setError('Failed to load invoices. Please try again later.');
        console.error('Error fetching invoices:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInvoices();
  }, []);

  if (isLoading) return <div>Loading invoices...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
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
  );
}