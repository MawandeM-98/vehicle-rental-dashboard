import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, bookings: 24 },
  { name: 'Feb', revenue: 3000, bookings: 18 },
  { name: 'Mar', revenue: 5000, bookings: 32 },
  { name: 'Apr', revenue: 4500, bookings: 28 },
  { name: 'May', revenue: 6000, bookings: 42 },
  { name: 'Jun', revenue: 5500, bookings: 36 },
];

export function RevenueChart() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" name="Revenue ($)" />
            <Bar yAxisId="right" dataKey="bookings" fill="#10b981" name="Bookings" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}