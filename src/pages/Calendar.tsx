import { useState, useEffect, useCallback } from 'react';
import { Calendar as BigCalendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { api } from '../services/api';
import { Booking } from '../types';

const localizer = momentLocalizer(moment);

// Fixed: Properly typed event interface
interface CalendarEvent extends Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: string;
}

export function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Fixed: Used useCallback
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const bookings: Booking[] = await api.getBookings();
      const calendarEvents = bookings.map((booking) => ({
        id: booking.id,
        title: `${booking.customer} - ${booking.vehicle}`,
        start: new Date(booking.pickupDate),
        end: new Date(booking.returnDate),
        status: booking.status,
      }));
      setEvents(calendarEvents);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Fixed: Properly typed event prop getter
  const eventPropGetter = (event: CalendarEvent) => {
    const colors = {
      Confirmed: '#22c55e',
      Upcoming: '#3b82f6',
      Completed: '#94a3b8',
      Cancelled: '#ef4444',
    };
    return {
      style: {
        backgroundColor: colors[event.status as keyof typeof colors] || '#94a3b8',
        color: 'white',
        borderRadius: '4px',
        padding: '2px 6px',
      }
    };
  };

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
      <div className="bg-white rounded-lg border border-slate-200 p-6 h-[600px]">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          eventPropGetter={eventPropGetter}
        />
      </div>
    </div>
  );
}