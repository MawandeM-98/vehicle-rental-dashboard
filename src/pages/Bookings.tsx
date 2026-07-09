import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Panel } from '../components/ui/panel';
import { NewBookingModal } from '../components/bookings/NewBookingModal';
import { useAppContext } from '../context/AppContext';
import { Booking } from '../types';

const statusColors: Record<Booking['status'], string> = {
  Confirmed: 'bg-green-100 text-green-800',
  Upcoming: 'bg-blue-100 text-blue-800',
  Completed: 'bg-slate-100 text-slate-800',
  Cancelled: 'bg-red-100 text-red-800',
};

export function Bookings() {
  const { bookings, deleteBooking, canCreate, canDelete } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState<boolean>(
    () => Boolean((location.state as { openModal?: boolean } | null)?.openModal)
  );

  if ((location.state as { openModal?: boolean } | null)?.openModal) {
    navigate(location.pathname, { replace: true, state: null });
  }

  const handleDelete = (id: string, label: string) => {
    if (window.confirm(`Delete booking ${label}? This cannot be undone.`)) {
      deleteBooking(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Bookings</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{bookings.length} total bookings</p>
        </div>
        {canCreate && (
          <Button onClick={() => setModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5">
            <Plus size={16} /> New Booking
          </Button>
        )}
      </div>

      <Panel className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Pickup</TableHead>
              <TableHead>Return</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              {canDelete && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10 text-slate-400">
                  No bookings yet. {canCreate ? 'Click "New Booking" to create one.' : ''}
                </TableCell>
              </TableRow>
            )}
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium text-slate-800 dark:text-white">{booking.bookingId}</TableCell>
                <TableCell>{booking.customer}</TableCell>
                <TableCell>{booking.vehicle}</TableCell>
                <TableCell>{booking.pickupDate}</TableCell>
                <TableCell>{booking.returnDate}</TableCell>
                <TableCell><Badge className={statusColors[booking.status]}>{booking.status}</Badge></TableCell>
                <TableCell className="text-right">${booking.amount.toFixed(2)}</TableCell>
                {canDelete && (
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleDelete(booking.id, booking.bookingId)}
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
      </Panel>

      <NewBookingModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}