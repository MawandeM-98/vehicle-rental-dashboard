import { Button } from '../ui/button';
import { PlusCircle, FileText, MessageSquare, CalendarDays } from 'lucide-react';

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <h3 className="text-base font-semibold text-slate-800 shrink-0">Quick Actions</h3>
      <div className="flex flex-wrap gap-3">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5">
          <PlusCircle size={16} /> New Booking
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-1.5">
          <FileText size={16} /> New Quotation
        </Button>
        <Button className="bg-green-600 hover:bg-green-700 text-white gap-1.5">
          <MessageSquare size={16} /> New Enquiry
        </Button>
        <Button variant="outline" className="gap-1.5">
          <CalendarDays size={16} /> Calendar View
        </Button>
      </div>
    </div>
  );
}