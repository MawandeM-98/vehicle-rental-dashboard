import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Panel } from '../ui/panel';
import { Booking } from '../../types';

const statusColors: Record<Booking['status'], string> = {
  Confirmed: 'bg-green-100 text-green-800',
  Upcoming: 'bg-blue-100 text-blue-800',
  Completed: 'bg-slate-100 text-slate-800',
  Cancelled: 'bg-red-100 text-red-800',
};

export function UpcomingBookings({ bookings }: { bookings: Booking[] }) {
  const navigate = useNavigate();

  return (
    <Panel className="p-6 h-full flex flex-col">
      <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-4">Upcoming Bookings</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Pickup Date</TableHead>
              <TableHead>Return Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.bookingId}</TableCell>
                <TableCell>{booking.customer}</TableCell>
                <TableCell>{booking.vehicle}</TableCell>
                <TableCell>{booking.pickupDate}</TableCell>
                <TableCell>{booking.returnDate}</TableCell>
                <TableCell>
                  <Badge className={statusColors[booking.status]}>{booking.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="text-center mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => navigate('/bookings')}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          View All Bookings →
        </button>
      </div>
    </Panel>
  );
}