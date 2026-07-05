import { Button } from '../ui/button';
import { PlusCircle, FileText, MessageSquare, Calendar } from 'lucide-react';

export function QuickActions() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <Button className="w-full justify-start gap-2" variant="outline">
          <PlusCircle size={16} /> New Booking
        </Button>
        <Button className="w-full justify-start gap-2" variant="outline">
          <FileText size={16} /> New Quotation
        </Button>
        <Button className="w-full justify-start gap-2" variant="outline">
          <MessageSquare size={16} /> New Enquiry
        </Button>
        <Button className="w-full justify-start gap-2" variant="outline">
          <Calendar size={16} /> Calendar View
        </Button>
      </div>
    </div>
  );
}