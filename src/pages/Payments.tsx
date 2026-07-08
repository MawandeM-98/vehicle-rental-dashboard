import { useState } from 'react';
import { Eye, Trash2, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { useAppContext } from '../context/AppContext';
import { exportToCSV } from '../utils/csv';

interface Payment {
  id: string;
  transactionId: string;
  customer: string;
  amount: number;
  method: string;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
}

const initialPayments: Payment[] = [
  { id: '1', transactionId: 'PAY-001', customer: 'Acme Corporation', amount: 2450, method: 'Card', status: 'Completed', date: '2025-05-20' },
  { id: '2', transactionId: 'PAY-002', customer: 'Global Solutions', amount: 980, method: 'Bank Transfer', status: 'Pending', date: '2025-05-21' },
  { id: '3', transactionId: 'PAY-003', customer: 'Tech Innovators', amount: 5600, method: 'Card', status: 'Completed', date: '2025-05-22' },
  { id: '4', transactionId: 'PAY-004', customer: 'City Logistics', amount: 760, method: 'Cash', status: 'Failed', date: '2025-05-23' },
];

const statusColors: Record<Payment['status'], string> = {
  Completed: 'bg-green-100 text-green-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  Failed: 'bg-red-100 text-red-800',
};

export function Payments() {
  const { canDelete } = useAppContext();
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [selected, setSelected] = useState<Payment | null>(null);

  const handleDelete = (id: string, txId: string) => {
    if (window.confirm(`Delete transaction ${txId}?`)) {
      setPayments(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleExport = () => {
    exportToCSV('payments_export.csv', payments.map(p => ({
      TransactionID: p.transactionId,
      Customer: p.customer,
      Amount: p.amount,
      Method: p.method,
      Status: p.status,
      Date: p.date,
    })));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Payments</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{payments.length} transactions recorded</p>
        </div>
        <Button onClick={handleExport} variant="outline" className="gap-1.5 dark:border-slate-600 dark:text-white">
          <Download size={16} /> Export CSV
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="dark:border-slate-700">
              <TableHead>Transaction ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id} className="dark:border-slate-800">
                <TableCell className="font-medium dark:text-white">{payment.transactionId}</TableCell>
                <TableCell className="dark:text-slate-300">{payment.customer}</TableCell>
                <TableCell className="text-right dark:text-slate-300">${payment.amount.toFixed(2)}</TableCell>
                <TableCell className="dark:text-slate-300">{payment.method}</TableCell>
                <TableCell><Badge className={statusColors[payment.status]}>{payment.status}</Badge></TableCell>
                <TableCell className="dark:text-slate-300">{payment.date}</TableCell>
                <TableCell className="text-right flex justify-end gap-1">
                  <Button variant="ghost" size="icon-sm" onClick={() => setSelected(payment)} className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950">
                    <Eye size={16} />
                  </Button>
                  {canDelete && (
                    <Button variant="ghost" size="icon-sm" onClick={() => handleDelete(payment.id, payment.transactionId)} className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950">
                      <Trash2 size={16} />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 dark:text-white rounded-2xl">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>Full record for this payment</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 pt-2">
              {[
                ['Transaction ID', selected.transactionId],
                ['Customer', selected.customer],
                ['Amount', `$${selected.amount.toFixed(2)}`],
                ['Method', selected.method],
                ['Date', selected.date],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">{label}</span>
                  <span className="font-medium text-slate-800 dark:text-white">{value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-1">
                <span className="text-sm text-slate-500 dark:text-slate-400">Status</span>
                <Badge className={statusColors[selected.status]}>{selected.status}</Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}