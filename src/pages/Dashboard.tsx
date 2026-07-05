import { useState, useEffect, useCallback } from 'react';
import { StatsCards } from '../components/dashboard/StatsCards';
import { UpcomingBookings } from '../components/dashboard/UpcomingBookings';
import { RecentQuotations } from '../components/dashboard/RecentQuotations';
import { QuickActions } from '../components/dashboard/QuickActions';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { api } from '../services/api';
import { Booking, Quotation, DashboardStats } from '../types';

export function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Fixed: Used useCallback for data fetching
  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const [bookingsData, quotationsData, statsData] = await Promise.all([
        api.getBookings(),
        api.getQuotations(),
        api.getStats(),
      ]);
      setBookings(bookingsData.slice(0, 5));
      setQuotations(quotationsData.slice(0, 5));
      setStats(statsData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Welcome back, Admin!</h1>
        <p className="text-slate-500">Here's what's happening with your rental business today.</p>
      </div>

      {/* Stats Cards */}
      {stats && <StatsCards stats={stats} />}

      {/* Revenue Chart */}
      <RevenueChart />

      {/* Quick Actions + Calendar Preview */}
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1">
          <QuickActions />
        </div>
        <div className="col-span-3 bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold mb-2">Today's Overview</h3>
          <p className="text-sm text-slate-500">5 bookings today • 3 pickups • 2 returns</p>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <UpcomingBookings bookings={bookings} />

      {/* Recent Quotations */}
      <RecentQuotations quotations={quotations} />
    </div>
  );
}