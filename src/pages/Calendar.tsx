import { useFetchData } from '../hooks/useFetchData';
import { api } from '../services/api';
import { Booking } from '../types';

export function Calendar() {
  const { data: bookings, loading } = useFetchData<Booking[]>(api.getBookings);

  if (loading) {
    return <div className="text-center py-12">Loading calendar...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Calendar</h2>
        <div className="flex gap-2">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            Confirmed
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            Upcoming
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-slate-500"></span>
            Completed
          </span>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-medium text-slate-600 py-2">
              {day}
            </div>
          ))}
          {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => {
            const hasBooking = (bookings || []).some((b: Booking) => 
              new Date(b.pickupDate).getDate() === date
            );
            return (
              <div
                key={date}
                className={`text-center py-2 rounded-lg ${
                  hasBooking ? 'bg-blue-100 text-blue-800 font-medium' : 'hover:bg-slate-50'
                }`}
              >
                {date}
              </div>
            );
          })}
        </div>
        <div className="mt-6">
          <h3 className="font-medium mb-2">Today's Bookings</h3>
          {(bookings || []).slice(0, 3).map((booking: Booking) => (
            <div key={booking.id} className="flex justify-between py-2 border-b">
              <span>{booking.customer} - {booking.vehicle}</span>
              <span className="text-sm text-slate-500">{booking.pickupDate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}