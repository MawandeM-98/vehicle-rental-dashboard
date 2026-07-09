import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Panel } from '../components/ui/panel';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { useAppContext } from '../context/AppContext';
import { Booking } from '../types';

const statusColors: Record<Booking['status'], string> = {
  Confirmed: 'bg-green-100 text-green-800',
  Upcoming: 'bg-blue-100 text-blue-800',
  Completed: 'bg-slate-100 text-slate-800',
  Cancelled: 'bg-red-100 text-red-800',
};

const chipColors: Record<Booking['status'], string> = {
  Confirmed: 'bg-green-100 text-green-700',
  Upcoming: 'bg-blue-100 text-blue-700',
  Completed: 'bg-slate-200 text-slate-600',
  Cancelled: 'bg-red-100 text-red-700',
};

export function Calendar() {
  const { bookings } = useAppContext();
  const [cursor, setCursor] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  const bookingsByDay = useMemo(() => {
    const map = new Map<string, Booking[]>();
    bookings.forEach((b) => {
      const key = b.pickupDate;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(b);
    });
    return map;
  }, [bookings]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();
  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const dateKey = (day: number) => new Date(year, month, day).toISOString().slice(0, 10);

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const selectedBookings = selectedDate ? bookingsByDay.get(selectedDate.toISOString().slice(0, 10)) || [] : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Calendar</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Visual overview of pickups this month</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-green-500" /> Confirmed</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-blue-500" /> Upcoming</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-slate-400" /> Completed</span>
        </div>
      </div>

      <Panel className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" size="icon" onClick={() => setCursor(new Date(year, month - 1, 1))}>
            <ChevronLeft size={18} />
          </Button>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            {cursor.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h3>
          <Button variant="outline" size="icon" onClick={() => setCursor(new Date(year, month + 1, 1))}>
            <ChevronRight size={18} />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-slate-400 py-2">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {cells.map((day, i) => {
            if (day === null) return <div key={`empty-${i}`} className="min-h-[84px] sm:min-h-[96px]" />;
            const key = dateKey(day);
            const dayBookings = bookingsByDay.get(key) || [];
            const visibleChips = dayBookings.slice(0, 2);
            const overflowCount = dayBookings.length - visibleChips.length;

            return (
              <button
                key={key}
                onClick={() => setSelectedDate(new Date(year, month, day))}
                className={`min-h-[84px] sm:min-h-[96px] rounded-xl border p-1.5 flex flex-col items-stretch gap-1 text-left transition-colors ${
                  isToday(day)
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40'
                    : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isToday(day) ? 'font-bold text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300'}`}>
                    {day}
                  </span>
                  {dayBookings.length > 0 && (
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-full px-1.5 py-0.5">
                      {dayBookings.length}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1 overflow-hidden">
                  {visibleChips.map((b) => (
                    <span
                      key={b.id}
                      className={`text-[10px] font-medium px-1.5 py-0.5 rounded truncate ${chipColors[b.status]}`}
                      title={`${b.customer} — ${b.vehicle}`}
                    >
                      {b.customer.split(' ')[0]}
                    </span>
                  ))}
                  {overflowCount > 0 && (
                    <span className="text-[10px] text-slate-400 px-1.5">+{overflowCount} more</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </Panel>

      <Panel className="p-6">
        <h3 className="font-semibold text-slate-800 dark:text-white mb-3">Upcoming Pickups</h3>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {bookings.slice(0, 5).map((booking) => (
            <div key={booking.id} className="flex justify-between items-center py-3">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{booking.customer} — {booking.vehicle}</p>
                <p className="text-xs text-slate-400">{booking.pickupDate}</p>
              </div>
              <Badge className={statusColors[booking.status]}>{booking.status}</Badge>
            </div>
          ))}
          {bookings.length === 0 && <p className="text-sm text-slate-400 py-4 text-center">No bookings scheduled.</p>}
        </div>
      </Panel>

      <Dialog open={!!selectedDate} onOpenChange={(v) => !v && setSelectedDate(null)}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 dark:text-white rounded-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <CalendarDays size={18} className="text-blue-600" />
              <DialogTitle>
                {selectedDate?.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </DialogTitle>
            </div>
            <DialogDescription>
              {selectedBookings.length} pickup{selectedBookings.length !== 1 ? 's' : ''} scheduled
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-2 max-h-80 overflow-y-auto">
            {selectedBookings.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-6">No bookings on this date.</p>
            )}
            {selectedBookings.map((b) => (
              <div key={b.id} className="border border-slate-100 dark:border-slate-800 rounded-lg p-3 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">{b.customer}</p>
                  <p className="text-xs text-slate-400">{b.vehicle} · {b.bookingId}</p>
                </div>
                <Badge className={statusColors[b.status]}>{b.status}</Badge>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}