import { BookingsOverviewChart } from '../components/dashboard/BookingsOverviewChart';
import { VehicleAvailabilityChart } from '../components/dashboard/VehicleAvailabilityChart';
import { RecentEnquiries } from '../components/dashboard/RecentEnquiries';
import { UpcomingBookings } from '../components/dashboard/UpcomingBookings';
import { RecentQuotations } from '../components/dashboard/RecentQuotations';
import { QuickActions } from '../components/dashboard/QuickActions';
import { StatsCards } from '../components/dashboard/StatsCards';
import { useAppContext } from '../context/AppContext';
import { mockBookingsOverview } from '../data/mockData';
import { DashboardStats, BookingBreakdown, VehicleAvailability } from '../types';

export function Dashboard() {
  const { bookings, quotations, enquiries } = useAppContext();

  const totalRevenue = bookings.reduce((sum, b) => sum + b.amount, 0);
  const stats: DashboardStats = {
    totalBookings: bookings.length,
    totalRevenue,
    activeQuotations: quotations.filter(q => q.status !== 'Expired').length,
    newEnquiries: enquiries.filter(e => e.status === 'New').length,
    bookingGrowth: 12,
    revenueGrowth: 18,
    quotationGrowth: 5,
    enquiryGrowth: -8,
  };

  const breakdown: BookingBreakdown = {
    confirmed: bookings.filter(b => b.status === 'Confirmed').length,
    upcoming: bookings.filter(b => b.status === 'Upcoming').length,
    ongoing: bookings.filter(b => b.status === 'Confirmed' && new Date(b.pickupDate) <= new Date()).length,
    completed: bookings.filter(b => b.status === 'Completed').length,
  };

  const vehicleAvailability: VehicleAvailability = {
    available: 32,
    onRent: 28,
    maintenance: 6,
    unavailable: 6,
    total: 72,
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-5">
          <BookingsOverviewChart data={mockBookingsOverview} breakdown={breakdown} />
        </div>
        <div className="xl:col-span-4">
          <VehicleAvailabilityChart data={vehicleAvailability} />
        </div>
        <div className="xl:col-span-3">
          <RecentEnquiries enquiries={enquiries.slice(0, 5)} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-7">
          <UpcomingBookings bookings={bookings.slice(0, 5)} />
        </div>
        <div className="xl:col-span-5">
          <RecentQuotations quotations={quotations.slice(0, 5)} />
        </div>
      </div>

      <QuickActions />
    </div>
  );
}