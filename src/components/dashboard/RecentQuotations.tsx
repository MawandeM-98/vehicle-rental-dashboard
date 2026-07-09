import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Panel } from '../ui/panel';
import { Quotation } from '../../types';

const statusColors: Record<Quotation['status'], string> = {
  Draft: 'bg-slate-100 text-slate-800',
  Sent: 'bg-blue-100 text-blue-800',
  Viewed: 'bg-yellow-100 text-yellow-800',
  Accepted: 'bg-green-100 text-green-800',
  Expired: 'bg-red-100 text-red-800',
};

export function RecentQuotations({ quotations }: { quotations: Quotation[] }) {
  const navigate = useNavigate();

  return (
    <Panel className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-800 dark:text-white">Recent Quotations</h3>
        <button onClick={() => navigate('/quotations')} className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quote ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead>Status</TableHead>
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
                  <Badge className={statusColors[quote.status]}>{quote.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Panel>
  );
}