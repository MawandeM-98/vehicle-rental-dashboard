import { StatsCards } from '../components/dashboard/StatsCards';
import { BookingsOverviewChart } from '../components/dashboard/BookingsOverviewChart';
import { VehicleAvailabilityChart } from '../components/dashboard/VehicleAvailabilityChart';
import { RecentEnquiries } from '../components/dashboard/RecentEnquiries';
import { UpcomingBookings } from '../components/dashboard/UpcomingBookings';
import { RecentQuotations } from '../components/dashboard/RecentQuotations';
import { QuickActions } from '../components/dashboard/QuickActions';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useFetchData } from '../hooks/useFetchData';
import { api } from '../services/api';
import {
  Booking,
  Quotation,
  DashboardStats,
  Enquiry,
  BookingBreakdown,
  VehicleAvailability,
  BookingsOverviewPoint,
} from '../types';

export function Dashboard() {
  const { data: bookings, loading: bookingsLoading } = useFetchData<Booking[]>(api.getBookings);
  const { data: quotations, loading: quotationsLoading } = useFetchData<Quotation[]>(api.getQuotations);
  const { data: stats, loading: statsLoading } = useFetchData<DashboardStats>(api.getStats);
  const { data: enquiries, loading: enquiriesLoading } = useFetchData<Enquiry[]>(api.getEnquiries);
  const { data: bookingBreakdown, loading: breakdownLoading } = useFetchData<BookingBreakdown>(api.getBookingBreakdown);
  const { data: vehicleAvailability, loading: vehicleLoading } = useFetchData<VehicleAvailability>(api.getVehicleAvailability);
  const { data: overview, loading: overviewLoading } = useFetchData<BookingsOverviewPoint[]>(api.getBookingsOverview);

  const loading =
    bookingsLoading ||
    quotationsLoading ||
    statsLoading ||
    enquiriesLoading ||
    breakdownLoading ||
    vehicleLoading ||
    overviewLoading;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      {stats && <StatsCards stats={stats} />}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-5">
          {overview && bookingBreakdown && (
            <BookingsOverviewChart data={overview} breakdown={bookingBreakdown} />
          )}
        </div>
        <div className="xl:col-span-4">
          {vehicleAvailability && <VehicleAvailabilityChart data={vehicleAvailability} />}
        </div>
        <div className="xl:col-span-3">
          {enquiries && <RecentEnquiries enquiries={enquiries} />}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-7">
          {bookings && <UpcomingBookings bookings={bookings} />}
        </div>
        <div className="xl:col-span-5">
          {quotations && <RecentQuotations quotations={quotations} />}
        </div>
      </div>

      <QuickActions />
    </div>
  );
}