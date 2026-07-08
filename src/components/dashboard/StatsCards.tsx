import { Card, CardContent } from '../ui/card';
import { TrendingUp, TrendingDown, Calendar, DollarSign, FileText, Users } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { DashboardStats, SparklinePoint } from '../../types';
import {
  mockBookingsSparkline,
  mockRevenueSparkline,
  mockQuotationsSparkline,
  mockEnquiriesSparkline,
} from '../../data/mockData';

interface StatsCardProps {
  title: string;
  value: string | number;
  growth: number;
  prefix?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconBg: string;
  iconColor: string;
  sparkline: SparklinePoint[];
  sparklineColor: string;
}

function StatsCard({ title, value, growth, prefix = '', icon: Icon, iconBg, iconColor, sparkline, sparklineColor }: StatsCardProps) {
  const isPositive = growth >= 0;
  return (
    <Card className="dark:bg-slate-900 dark:border-slate-700">
      <CardContent className="pt-4">
        <div className="flex items-start justify-between">
          <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${iconBg}`}>
            <Icon size={20} className={iconColor} />
          </div>
          <div className="w-20 h-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparkline}>
                <Line type="monotone" dataKey="value" stroke={sparklineColor} strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-3">{title}</p>
        {/* Contrast fix: blue text on light (white) theme, pure white text on navy (dark) theme */}
        <div className="text-2xl font-bold text-blue-700 dark:text-white mt-0.5">
          {prefix}{value.toLocaleString()}
        </div>
        <div className="flex items-center gap-1 mt-1.5">
          {isPositive ? <TrendingUp className="text-green-500" size={15} /> : <TrendingDown className="text-red-500" size={15} />}
          <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '+' : ''}{growth}%
          </span>
          <span className="text-sm text-slate-400">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsCards({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      <StatsCard title="Total Bookings" value={stats.totalBookings} growth={stats.bookingGrowth} icon={Calendar} iconBg="bg-blue-50" iconColor="text-blue-600" sparkline={mockBookingsSparkline} sparklineColor="#2563eb" />
      <StatsCard title="Total Revenue" value={stats.totalRevenue} growth={stats.revenueGrowth} prefix="$" icon={DollarSign} iconBg="bg-green-50" iconColor="text-green-600" sparkline={mockRevenueSparkline} sparklineColor="#16a34a" />
      <StatsCard title="Active Quotations" value={stats.activeQuotations} growth={stats.quotationGrowth} icon={FileText} iconBg="bg-purple-50" iconColor="text-purple-600" sparkline={mockQuotationsSparkline} sparklineColor="#9333ea" />
      <StatsCard title="New Enquiries" value={stats.newEnquiries} growth={stats.enquiryGrowth} icon={Users} iconBg="bg-orange-50" iconColor="text-orange-600" sparkline={mockEnquiriesSparkline} sparklineColor="#ea580c" />
    </div>
  );
}