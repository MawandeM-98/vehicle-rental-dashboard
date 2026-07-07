import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';

const mockPayments = [
  { id: '1', transactionId: 'PAY-001', customer: 'Acme Corporation', amount: 2450, method: 'Card', status: 'Completed', date: '2025-05-20' },
  { id: '2', transactionId: 'PAY-002', customer: 'Global Solutions', amount: 980, method: 'Bank Transfer', status: 'Pending', date: '2025-05-21' },
  { id: '3', transactionId: 'PAY-003', customer: 'Tech Innovators', amount: 5600, method: 'Card', status: 'Completed', date: '2025-05-22' },
  { id: '4', transactionId: 'PAY-004', customer: 'City Logistics', amount: 760, method: 'Cash', status: 'Failed', date: '2025-05-23' },
];

export function Payments() {
  const [payments] = useState(mockPayments);

  const statusColors: Record<string, string> = {
    Completed: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Failed: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Payments</h2>
        <Button>+ Record Payment</Button>
      </div>
      <div className="bg-white rounded-lg border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.transactionId}</TableCell>
                <TableCell>{payment.customer}</TableCell>
                <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>
                  <Badge className={statusColors[payment.status] || 'bg-slate-100'}>
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell>{payment.date}</TableCell>
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