import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookingBreakdown, BookingsOverviewPoint } from '../../types';

interface BookingsOverviewChartProps {
  data: BookingsOverviewPoint[];
  breakdown: BookingBreakdown;
}

export function BookingsOverviewChart({ data, breakdown }: BookingsOverviewChartProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-800">Bookings Overview</h3>
        <select
          className="text-sm border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-600 bg-white outline-none focus:ring-2 focus:ring-blue-500/30"
          defaultValue="month"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="bookingsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }}
              labelStyle={{ color: '#334155', fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="bookings"
              stroke="#2563eb"
              strokeWidth={2.5}
              fill="url(#bookingsFill)"
              dot={{ r: 3, fill: '#2563eb', strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-5 pt-5 border-t border-slate-100">
        <div>
          <p className="text-xs text-slate-500">Confirmed</p>
          <p className="text-xl font-bold text-blue-600 mt-0.5">{breakdown.confirmed}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Upcoming</p>
          <p className="text-xl font-bold text-orange-500 mt-0.5">{breakdown.upcoming}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Ongoing</p>
          <p className="text-xl font-bold text-green-600 mt-0.5">{breakdown.ongoing}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Completed</p>
          <p className="text-xl font-bold text-purple-600 mt-0.5">{breakdown.completed}</p>
        </div>
      </div>
    </div>
  );
}