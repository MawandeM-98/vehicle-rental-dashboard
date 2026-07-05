import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { api } from '../services/api';
import { Quotation } from '../types';

const statusColors = {
  Draft: 'bg-slate-100 text-slate-800',
  Sent: 'bg-blue-100 text-blue-800',
  Viewed: 'bg-yellow-100 text-yellow-800',
  Accepted: 'bg-green-100 text-green-800',
  Expired: 'bg-red-100 text-red-800',
};

export function Quotations() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getQuotations().then(data => {
      setQuotations(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quotations</h2>
        <Button>+ New Quotation</Button>
      </div>
      <div className="bg-white rounded-lg border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quote ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotations.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell className="font-medium">{quote.quoteId}</TableCell>
                <TableCell>{quote.customer}</TableCell>
                <TableCell className="text-right">${quote.amount.toFixed(2)}</TableCell>
                <TableCell>{quote.validUntil}</TableCell>
                <TableCell>
                  <Badge className={statusColors[quote.status]}>
                    {quote.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}