import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Building2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { exportToCSV } from '../utils/csv';

const data = [
  { month: 'Jan', revenue: 4000, bookings: 24 },
  { month: 'Feb', revenue: 3000, bookings: 18 },
  { month: 'Mar', revenue: 5000, bookings: 32 },
  { month: 'Apr', revenue: 4500, bookings: 28 },
  { month: 'May', revenue: 6000, bookings: 42 },
  { month: 'Jun', revenue: 5500, bookings: 36 },
];

export function Reports() {
  const { bookings, customers, vehicles } = useAppContext();
  const totalRevenue = bookings.reduce((sum, b) => sum + b.amount, 0);

  const branchMap = new Map<string, { count: number; utilizationSum: number }>();
  vehicles.forEach((v) => {
    const entry = branchMap.get(v.location) ?? { count: 0, utilizationSum: 0 };
    entry.count += 1;
    entry.utilizationSum += v.rentedDays / v.availableDays;
    branchMap.set(v.location, entry);
  });
  const branches = Array.from(branchMap.entries()).map(([location, stats]) => ({
    location,
    vehicleCount: stats.count,
    avgUtilization: Math.round((stats.utilizationSum / stats.count) * 100),
  }));

  const handleExportBookings = () => {
    exportToCSV(
      'bookings_report.csv',
      bookings.map(b => ({
        BookingID: b.bookingId,
        Customer: b.customer,
        Vehicle: b.vehicle,
        Pickup: b.pickupDate,
        Return: b.returnDate,
        Status: b.status,
        Amount: b.amount,
      }))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Reports</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Business performance at a glance</p>
        </div>
        <Button onClick={handleExportBookings} variant="outline" className="gap-1.5 dark:border-slate-600 dark:text-white">
          <Download size={16} /> Export Bookings (CSV)
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="dark:bg-slate-900 dark:border-slate-700">
          <CardHeader><CardTitle className="dark:text-white">Total Revenue</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700 dark:text-white">${totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-green-500 mt-1">+18% from last month</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-slate-900 dark:border-slate-700">
          <CardHeader><CardTitle className="dark:text-white">Total Bookings</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700 dark:text-white">{bookings.length}</div>
            <p className="text-sm text-green-500 mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-slate-900 dark:border-slate-700">
          <CardHeader><CardTitle className="dark:text-white">Active Customers</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700 dark:text-white">{customers.length}</div>
            <p className="text-sm text-green-500 mt-1">+8% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-4">Monthly Performance</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} />
              <Bar yAxisId="left" dataKey="revenue" fill="#2563eb" name="Revenue ($)" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="bookings" fill="#16a34a" name="Bookings" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Building2 size={18} className="text-blue-600" />
          <h3 className="text-base font-semibold text-slate-800 dark:text-white">Branch Performance</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {branches.map((b) => (
            <div key={b.location} className="border border-slate-100 dark:border-slate-800 rounded-lg p-4">
              <p className="text-sm font-semibold text-slate-800 dark:text-white">{b.location}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{b.vehicleCount} vehicles</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${b.avgUtilization >= 80 ? 'bg-red-500' : b.avgUtilization >= 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${Math.min(b.avgUtilization, 100)}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{b.avgUtilization}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}