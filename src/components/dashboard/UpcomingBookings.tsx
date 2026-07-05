import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Booking } from '../../types';

const statusColors = {
  Confirmed: 'bg-green-100 text-green-800',
  Upcoming: 'bg-blue-100 text-blue-800',
  Completed: 'bg-slate-100 text-slate-800',
  Cancelled: 'bg-red-100 text-red-800',
};

export function UpcomingBookings({ bookings }: { bookings: Booking[] }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Upcoming Bookings</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All Bookings →
        </button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Vehicle</TableHead>
            <TableHead>Pickup Date</TableHead>
            <TableHead>Return Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Quote ID</TableHead>
            <TableHead className="text-right">Amount</TableHead>
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
                <Badge className={statusColors[booking.status]}>
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>{booking.quoteId}</TableCell>
              <TableCell className="text-right">${booking.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}