import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Panel } from '../ui/panel';
import { PlusCircle, FileText, MessageSquare, CalendarDays } from 'lucide-react';

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <Panel className="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <h3 className="text-base font-semibold text-slate-800 dark:text-white shrink-0">Quick Actions</h3>
      <div className="flex flex-wrap gap-3">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5" onClick={() => navigate('/bookings', { state: { openModal: true } })}>
          <PlusCircle size={16} /> New Booking
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-1.5" onClick={() => navigate('/quotations', { state: { openModal: true } })}>
          <FileText size={16} /> New Quotation
        </Button>
        <Button className="bg-green-600 hover:bg-green-700 text-white gap-1.5" onClick={() => navigate('/customers', { state: { openEnquiryModal: true } })}>
          <MessageSquare size={16} /> New Enquiry
        </Button>
        <Button variant="outline" className="gap-1.5 dark:border-slate-600 dark:text-white" onClick={() => navigate('/calendar')}>
          <CalendarDays size={16} /> Calendar View
        </Button>
      </div>
    </Panel>
  );
}