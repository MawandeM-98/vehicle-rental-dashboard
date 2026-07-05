import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Quotation } from '../../types';

const statusColors = {
  Draft: 'bg-slate-100 text-slate-800',
  Sent: 'bg-blue-100 text-blue-800',
  Viewed: 'bg-yellow-100 text-yellow-800',
  Accepted: 'bg-green-100 text-green-800',
  Expired: 'bg-red-100 text-red-800',
};

export function RecentQuotations({ quotations }: { quotations: Quotation[] }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Quotations</h3>
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
                <Badge className={statusColors[quote.status]}>
                  {quote.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}