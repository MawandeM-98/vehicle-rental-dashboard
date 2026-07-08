import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { NewQuotationModal } from '../components/quotations/NewQuotationModal';
import { useAppContext } from '../context/AppContext';
import { Quotation } from '../types';

const statusColors: Record<Quotation['status'], string> = {
  Draft: 'bg-slate-100 text-slate-800',
  Sent: 'bg-blue-100 text-blue-800',
  Viewed: 'bg-yellow-100 text-yellow-800',
  Accepted: 'bg-green-100 text-green-800',
  Expired: 'bg-red-100 text-red-800',
};

export function Quotations() {
  const { quotations, deleteQuotation, canCreate, canDelete } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState<boolean>(
    () => Boolean((location.state as { openModal?: boolean } | null)?.openModal)
  );

  if ((location.state as { openModal?: boolean } | null)?.openModal) {
    navigate(location.pathname, { replace: true, state: null });
  }

  const handleDelete = (id: string, label: string) => {
    if (window.confirm(`Delete quotation ${label}? This cannot be undone.`)) {
      deleteQuotation(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Quotations</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{quotations.length} total quotations</p>
        </div>
        {canCreate && (
          <Button onClick={() => setModalOpen(true)} className="bg-purple-600 hover:bg-purple-700 text-white gap-1.5">
            <Plus size={16} /> New Quotation
          </Button>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="dark:border-slate-700">
              <TableHead>Quote ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead>Status</TableHead>
              {canDelete && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotations.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-slate-400">
                  No quotations yet. {canCreate ? 'Click "New Quotation" to create one.' : ''}
                </TableCell>
              </TableRow>
            )}
            {quotations.map((quote) => (
              <TableRow key={quote.id} className="dark:border-slate-800">
                <TableCell className="font-medium dark:text-white">{quote.quoteId}</TableCell>
                <TableCell className="dark:text-slate-300">{quote.customer}</TableCell>
                <TableCell className="text-right dark:text-slate-300">${quote.amount.toFixed(2)}</TableCell>
                <TableCell className="dark:text-slate-300">{quote.validUntil}</TableCell>
                <TableCell><Badge className={statusColors[quote.status]}>{quote.status}</Badge></TableCell>
                {canDelete && (
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleDelete(quote.id, quote.quoteId)}
                      className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <NewQuotationModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}