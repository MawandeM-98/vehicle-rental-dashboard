import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  growth: number;
  prefix?: string;
}

function StatsCard({ title, value, growth, prefix = '' }: StatsCardProps) {
  const isPositive = growth >= 0;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {prefix}{value}
        </div>
        <div className="flex items-center gap-1 mt-1">
          {isPositive ? (
            <TrendingUp className="text-green-500" size={16} />
          ) : (
            <TrendingDown className="text-red-500" size={16} />
          )}
          <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {growth}%
          </span>
          <span className="text-sm text-slate-400">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsCards({ stats }: { stats: any }) {
  return (
    <div className="grid grid-cols-4 gap-6">
      <StatsCard 
        title="Total Bookings" 
        value={stats.totalBookings} 
        growth={stats.bookingGrowth} 
      />
      <StatsCard 
        title="Total Revenue" 
        value={stats.totalRevenue} 
        growth={stats.revenueGrowth} 
        prefix="$" 
      />
      <StatsCard 
        title="Active Quotations" 
        value={stats.activeQuotations} 
        growth={stats.quotationGrowth} 
      />
      <StatsCard 
        title="New Enquiries" 
        value={stats.newEnquiries} 
        growth={stats.enquiryGrowth} 
      />
    </div>
  );
}