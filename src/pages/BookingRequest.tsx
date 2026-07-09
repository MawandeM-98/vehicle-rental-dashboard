import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Car, CheckCircle2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useAppContext } from '../context/AppContext';

const requestSchema = z.object({
  name: z.string().min(1, 'Your name is required'),
  vehicleType: z.string().min(1, 'Please describe what you need'),
  pickupDate: z.string().min(1, 'Pickup date is required'),
});
type RequestFormValues = z.infer<typeof requestSchema>;

export function BookingRequest() {
  const { addEnquiry } = useAppContext();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: { name: '', vehicleType: '', pickupDate: '' },
  });

  const handleSubmit = (data: RequestFormValues) => {
    addEnquiry({
      name: data.name,
      description: `Self-service request: ${data.vehicleType} (pickup ${data.pickupDate})`,
      timeAgo: 'Just now',
      status: 'New',
    });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0b1324] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2.5 mb-6">
          <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <Car size={22} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-white">Bushlore</span><span className="text-blue-500">_Fleet</span>
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {submitted ? (
            <div className="text-center py-6">
              <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-slate-800">Request Received!</h2>
              <p className="text-sm text-slate-500 mt-2">
                Thanks — our team at Bushlore HR will reach out shortly to confirm your rental.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => { setSubmitted(false); form.reset(); }}
              >
                Submit Another Request
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-slate-800 text-center">Request a Vehicle</h2>
              <p className="text-sm text-slate-500 text-center mt-1 mb-6">
                Tell us what you need and we'll follow up with a quote.
              </p>
              <Form form={form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm font-medium text-slate-700">Your Name</FormLabel>
                      <FormControl><Input placeholder="Jane Doe" {...field} /></FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="vehicleType" render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm font-medium text-slate-700">What do you need?</FormLabel>
                      <FormControl><Input placeholder="e.g. 5-seater SUV for a weekend trip" {...field} /></FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="pickupDate" render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm font-medium text-slate-700">Preferred Pickup Date</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )} />
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2">
                    Submit Request
                  </Button>
                </form>
              </Form>
            </>
          )}
        </div>
        <p className="text-center text-xs text-slate-500 mt-4">© {new Date().getFullYear()} Bushlore HR — Bushlore_Fleet</p>
      </div>
    </div>
  );
}