import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CalendarDays } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useAppContext } from '../../context/AppContext';

const generateIds = () => {
  const t = Date.now().toString();
  return { bookingId: `BK-${t.slice(-4)}`, quoteId: `QT-${t.slice(-4)}` };
};

const bookingSchema = z.object({
  customer: z.string().min(1, 'Customer is required'),
  vehicle: z.string().min(1, 'Vehicle is required'),
  pickupDate: z.string().min(1, 'Pickup date is required'),
  returnDate: z.string().min(1, 'Return date is required'),
  status: z.enum(['Confirmed', 'Upcoming', 'Completed', 'Cancelled']),
  amount: z.number().min(0, 'Amount must be 0 or greater'),
});
type BookingFormValues = z.infer<typeof bookingSchema>;

interface NewBookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewBookingModal({ open, onOpenChange }: NewBookingModalProps) {
  const { addBooking } = useAppContext();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { customer: '', vehicle: '', pickupDate: '', returnDate: '', status: 'Upcoming', amount: 0 },
  });

  const handleSubmit = (data: BookingFormValues) => {
    const { bookingId, quoteId } = generateIds();
    addBooking({ ...data, bookingId, quoteId });
    form.reset({ customer: '', vehicle: '', pickupDate: '', returnDate: '', status: 'Upcoming', amount: 0 });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="sm:max-w-lg w-[calc(100%-2rem)] max-h-[88vh] overflow-y-auto bg-white dark:bg-slate-900 dark:text-white p-0 rounded-2xl gap-0"
      >
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <CalendarDays size={22} className="text-white" />
              </div>
              <div>
                <DialogTitle className="text-white text-lg">Create New Booking</DialogTitle>
                <DialogDescription className="text-blue-100 text-sm">
                  Fill in the details to schedule a vehicle rental
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <Form form={form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="customer" render={({ field }) => (
                <FormItem className="space-y-1.5 sm:col-span-2">
                  <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Customer</FormLabel>
                  <FormControl><Input placeholder="Enter customer name" {...field} /></FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )} />
              <FormField control={form.control} name="vehicle" render={({ field }) => (
                <FormItem className="space-y-1.5 sm:col-span-2">
                  <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Vehicle</FormLabel>
                  <FormControl><Input placeholder="Enter vehicle name" {...field} /></FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )} />
              <FormField control={form.control} name="pickupDate" render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Pickup Date</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )} />
              <FormField control={form.control} name="returnDate" render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Return Date</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )} />
              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger className="w-full"><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Upcoming">Upcoming</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )} />
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
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Create Booking</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}