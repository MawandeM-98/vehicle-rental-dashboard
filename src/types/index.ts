export interface Booking {
  id: string;
  bookingId: string;
  customer: string;
  vehicle: string;
  pickupDate: string;
  returnDate: string;
  status: 'Confirmed' | 'Upcoming' | 'Completed' | 'Cancelled';
  quoteId: string;
  amount: number;
}

export interface Quotation {
  id: string;
  quoteId: string;
  customer: string;
  amount: number;
  validUntil: string;
  status: 'Draft' | 'Sent' | 'Viewed' | 'Accepted' | 'Expired';
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  totalBookings: number;
  totalSpent: number;
}

export interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  activeQuotations: number;
  newEnquiries: number;
  bookingGrowth: number;
  revenueGrowth: number;
  quotationGrowth: number;
  enquiryGrowth: number;
}

export interface Enquiry {
  id: string;
  name: string;
  description: string;
  timeAgo: string;
  status: 'New' | 'Contacted' | 'Quotation Sent';
}

export interface BookingBreakdown {
  confirmed: number;
  upcoming: number;
  ongoing: number;
  completed: number;
}

export interface VehicleAvailability {
  available: number;
  onRent: number;
  maintenance: number;
  unavailable: number;
  total: number;
}

export interface BookingsOverviewPoint {
  date: string;
  bookings: number;
}

export interface SparklinePoint {
  value: number;
}