import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useAppContext } from '../../context/AppContext';

const enquirySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['New', 'Contacted', 'Quotation Sent']),
});
type EnquiryFormValues = z.infer<typeof enquirySchema>;

interface NewEnquiryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewEnquiryModal({ open, onOpenChange }: NewEnquiryModalProps) {
  const { addEnquiry } = useAppContext();

  const form = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: '', description: '', status: 'New' },
  });

  const handleSubmit = (data: EnquiryFormValues) => {
    addEnquiry({ ...data, timeAgo: 'Just now' });
    form.reset({ name: '', description: '', status: 'New' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="sm:max-w-lg w-[calc(100%-2rem)] max-h-[88vh] overflow-y-auto bg-white dark:bg-slate-900 dark:text-white p-0 rounded-2xl gap-0"
      >
        <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <MessageSquare size={22} className="text-white" />
              </div>
              <div>
                <DialogTitle className="text-white text-lg">Log New Enquiry</DialogTitle>
                <DialogDescription className="text-orange-100 text-sm">
                  Capture an incoming customer enquiry
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <Form form={form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6 space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Customer Name</FormLabel>
                <FormControl><Input placeholder="Enter name" {...field} /></FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Enquiry Details</FormLabel>
                <FormControl><Input placeholder="e.g. Corporate Rental - 5 Cars" {...field} /></FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )} />
            <FormField control={form.control} name="status" render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger className="w-full"><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                    <SelectItem value="Quotation Sent">Quotation Sent</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )} />
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">Log Enquiry</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}