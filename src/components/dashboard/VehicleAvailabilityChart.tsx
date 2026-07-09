import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Panel } from '../ui/panel';
import { VehicleAvailability } from '../../types';

interface VehicleAvailabilityChartProps {
  data: VehicleAvailability;
}

export function VehicleAvailabilityChart({ data }: VehicleAvailabilityChartProps) {
  const pct = (n: number) => Math.round((n / data.total) * 100);

  const chartData = [
    { name: 'Available', value: data.available, color: '#16a34a' },
    { name: 'On Rent', value: data.onRent, color: '#2563eb' },
    { name: 'Maintenance', value: data.maintenance, color: '#f97316' },
    { name: 'Unavailable', value: data.unavailable, color: '#94a3b8' },
  ];

  return (
    <Panel className="p-6 h-full">
      <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-4">Vehicle Availability</h3>

      <div className="relative h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={70} paddingAngle={2} stroke="none">
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs text-slate-500 dark:text-slate-400">Total</span>
          <span className="text-2xl font-bold text-slate-900 dark:text-white">{data.total}</span>
        </div>
      </div>

      <div className="space-y-2.5 mt-5">
        {chartData.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 min-w-0">
              <span className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ backgroundColor: entry.color }} />
              <span className="text-slate-600 dark:text-slate-300 truncate">{entry.name}</span>
            </div>
            <span className="font-medium text-slate-700 dark:text-slate-200 shrink-0">
              {entry.value} ({pct(entry.value)}%)
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}