import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useAppContext } from '../../context/AppContext';

const generateQuotationId = () => `QT-${Date.now().toString().slice(-4)}`;

const quotationSchema = z.object({
  customer: z.string().min(1, 'Customer is required'),
  amount: z.number().min(0, 'Amount must be 0 or greater'),
  validUntil: z.string().min(1, 'Valid until date is required'),
  status: z.enum(['Draft', 'Sent', 'Viewed', 'Accepted', 'Expired']),
});
type QuotationFormValues = z.infer<typeof quotationSchema>;

interface NewQuotationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewQuotationModal({ open, onOpenChange }: NewQuotationModalProps) {
  const { addQuotation } = useAppContext();

  const form = useForm<QuotationFormValues>({
    resolver: zodResolver(quotationSchema),
    defaultValues: { customer: '', amount: 0, validUntil: '', status: 'Draft' },
  });

  const handleSubmit = (data: QuotationFormValues) => {
    addQuotation({ ...data, quoteId: generateQuotationId() });
    form.reset({ customer: '', amount: 0, validUntil: '', status: 'Draft' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="sm:max-w-lg w-[calc(100%-2rem)] max-h-[88vh] overflow-y-auto bg-white dark:bg-slate-900 dark:text-white p-0 rounded-2xl gap-0"
      >
        <div className="p-6 bg-gradient-to-r from-purple-600 to-purple-700 rounded-t-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <FileText size={22} className="text-white" />
              </div>
              <div>
                <DialogTitle className="text-white text-lg">Create New Quotation</DialogTitle>
                <DialogDescription className="text-purple-100 text-sm">
                  Draft a rental quote for a customer
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <Form form={form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6 space-y-4">
            <FormField control={form.control} name="customer" render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Customer</FormLabel>
                <FormControl><Input placeholder="Enter customer name" {...field} /></FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="amount" render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Amount ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={field.value}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )} />
              <FormField control={form.control} name="validUntil" render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Valid Until</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="status" render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger className="w-full"><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Sent">Sent</SelectItem>
                    <SelectItem value="Viewed">Viewed</SelectItem>
                    <SelectItem value="Accepted">Accepted</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )} />
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">Create Quotation</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}