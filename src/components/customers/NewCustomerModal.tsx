import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useAppContext } from '../../context/AppContext';

const customerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  company: z.string().min(1, 'Company is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
});
type CustomerFormValues = z.infer<typeof customerSchema>;

interface NewCustomerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewCustomerModal({ open, onOpenChange }: NewCustomerModalProps) {
  const { addCustomer } = useAppContext();

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: { name: '', company: '', email: '', phone: '' },
  });

  const handleSubmit = (data: CustomerFormValues) => {
    addCustomer({ ...data, totalBookings: 0, totalSpent: 0 });
    form.reset({ name: '', company: '', email: '', phone: '' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="sm:max-w-lg w-[calc(100%-2rem)] max-h-[88vh] overflow-y-auto bg-white dark:bg-slate-900 dark:text-white p-0 rounded-2xl gap-0"
      >
        <div className="p-6 bg-gradient-to-r from-green-600 to-green-700 rounded-t-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <Users size={22} className="text-white" />
              </div>
              <div>
                <DialogTitle className="text-white text-lg">Add New Customer</DialogTitle>
                <DialogDescription className="text-green-100 text-sm">
                  Add a customer to your rental network
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <Form form={form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Full Name</FormLabel>
                  <FormControl><Input placeholder="Enter customer name" {...field} /></FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )} />
              <FormField control={form.control} name="company" render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Company</FormLabel>
                  <FormControl><Input placeholder="Enter company name" {...field} /></FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Email</FormLabel>
                  <FormControl><Input type="email" placeholder="customer@email.com" {...field} /></FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Phone</FormLabel>
                  <FormControl><Input placeholder="+1 234-567-8900" {...field} /></FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )} />
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">Add Customer</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}