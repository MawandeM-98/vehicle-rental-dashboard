import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { api } from '../services/api';
import { Booking } from '../types';

const statusColors = {
  Confirmed: 'bg-green-100 text-green-800',
  Upcoming: 'bg-blue-100 text-blue-800',
  Completed: 'bg-slate-100 text-slate-800',
  Cancelled: 'bg-red-100 text-red-800',
};

export function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // FIXED: Move fetch inside useEffect, remove useCallback
  useEffect(() => {
    let isMounted = true;
    
    const fetchBookings = async () => {
      try {
        const data = await api.getBookings();
        if (isMounted) {
          setBookings(data);
        }
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchBookings();
    
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Bookings</h2>
        <Button>+ New Booking</Button>
      </div>
      <div className="bg-white rounded-lg border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Pickup</TableHead>
              <TableHead>Return</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Actions</TableHead>
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
                <TableCell>${booking.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}