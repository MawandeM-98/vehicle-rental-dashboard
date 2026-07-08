import {
  Booking,
  Quotation,
  Customer,
  DashboardStats,
  Enquiry,
  BookingBreakdown,
  VehicleAvailability,
  BookingsOverviewPoint,
  SparklinePoint,
  Vehicle,
} from '../types';

export const mockBookings: Booking[] = [
  {
    id: '1',
    bookingId: 'BK-1025',
    customer: 'Acme Corporation',
    vehicle: 'Toyota Hiace',
    pickupDate: '2025-05-20',
    returnDate: '2025-05-22',
    status: 'Confirmed',
    quoteId: 'QT-2050',
    amount: 2450.00,
  },
  {
    id: '2',
    bookingId: 'BK-1026',
    customer: 'Global Solutions',
    vehicle: 'Mitsubishi Pajero',
    pickupDate: '2025-05-21',
    returnDate: '2025-05-25',
    status: 'Upcoming',
    quoteId: 'QT-2049',
    amount: 980.00,
  },
  {
    id: '3',
    bookingId: 'BK-1027',
    customer: 'Tech Innovators',
    vehicle: 'Honda CR-V',
    pickupDate: '2025-05-22',
    returnDate: '2025-05-23',
    status: 'Upcoming',
    quoteId: 'QT-2048',
    amount: 5600.00,
  },
  {
    id: '4',
    bookingId: 'BK-1028',
    customer: 'City Logistics',
    vehicle: 'Isuzu NQR',
    pickupDate: '2025-05-23',
    returnDate: '2025-05-24',
    status: 'Confirmed',
    quoteId: 'QT-2047',
    amount: 760.00,
  },
  {
    id: '5',
    bookingId: 'BK-1029',
    customer: 'Jane Smith',
    vehicle: 'Toyota Vios',
    pickupDate: '2025-05-24',
    returnDate: '2025-05-24',
    status: 'Upcoming',
    quoteId: 'QT-2046',
    amount: 1320.00,
  },
];

export const mockQuotations: Quotation[] = [
  {
    id: '1',
    quoteId: 'QT-2050',
    customer: 'Acme Corporation',
    amount: 2450.00,
    validUntil: '2025-05-25',
    status: 'Sent',
  },
  {
    id: '2',
    quoteId: 'QT-2049',
    customer: 'John Doe',
    amount: 980.00,
    validUntil: '2025-05-24',
    status: 'Draft',
  },
  {
    id: '3',
    quoteId: 'QT-2048',
    customer: 'Global Solutions',
    amount: 5600.00,
    validUntil: '2025-05-26',
    status: 'Sent',
  },
  {
    id: '4',
    quoteId: 'QT-2047',
    customer: 'Sarah Mitchell',
    amount: 760.00,
    validUntil: '2025-05-23',
    status: 'Viewed',
  },
  {
    id: '5',
    quoteId: 'QT-2046',
    customer: 'City Logistics',
    amount: 1320.00,
    validUntil: '2025-05-22',
    status: 'Sent',
  },
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    company: 'Acme Corp',
    email: 'info@acme.com',
    phone: '+1 234-567-8900',
    totalBookings: 12,
    totalSpent: 28450,
  },
  {
    id: '2',
    name: 'Global Solutions',
    company: 'Global Inc',
    email: 'contact@global.com',
    phone: '+1 234-567-8901',
    totalBookings: 8,
    totalSpent: 19320,
  },
  {
    id: '3',
    name: 'John Doe',
    company: 'Freelance',
    email: 'john@doe.com',
    phone: '+1 234-567-8902',
    totalBookings: 3,
    totalSpent: 2840,
  },
];

export const mockStats: DashboardStats = {
  totalBookings: 128,
  totalRevenue: 48750,
  activeQuotations: 36,
  newEnquiries: 24,
  bookingGrowth: 12,
  revenueGrowth: 18,
  quotationGrowth: 5,
  enquiryGrowth: -8,
};

export const mockEnquiries: Enquiry[] = [
  {
    id: '1',
    name: 'John Doe',
    description: 'Corporate Rental - 5 Cars',
    timeAgo: '2h ago',
    status: 'New',
  },
  {
    id: '2',
    name: 'Sarah Mitchell',
    description: 'Airport Transfer - 1 Van',
    timeAgo: '4h ago',
    status: 'New',
  },
  {
    id: '3',
    name: 'Robert King',
    description: 'Long Term Rental - 2 SUVs',
    timeAgo: '1d ago',
    status: 'Contacted',
  },
  {
    id: '4',
    name: 'Alice Lee',
    description: 'Event Transport - 3 Cars',
    timeAgo: '1d ago',
    status: 'New',
  },
  {
    id: '5',
    name: 'Michael Tan',
    description: 'Daily Rental - 1 Car',
    timeAgo: '2d ago',
    status: 'Quotation Sent',
  },
];

export const mockBookingBreakdown: BookingBreakdown = {
  confirmed: 78,
  upcoming: 32,
  ongoing: 10,
  completed: 54,
};

export const mockVehicleAvailability: VehicleAvailability = {
  available: 32,
  onRent: 28,
  maintenance: 6,
  unavailable: 6,
  total: 72,
};

export const mockBookingsOverview: BookingsOverviewPoint[] = [
  { date: 'May 1', bookings: 20 },
  { date: 'May 4', bookings: 15 },
  { date: 'May 8', bookings: 22 },
  { date: 'May 11', bookings: 28 },
  { date: 'May 15', bookings: 24 },
  { date: 'May 18', bookings: 32 },
  { date: 'May 22', bookings: 38 },
  { date: 'May 25', bookings: 30 },
  { date: 'May 29', bookings: 40 },
];

export const mockBookingsSparkline: SparklinePoint[] = [
  { value: 8 }, { value: 12 }, { value: 9 }, { value: 15 }, { value: 13 }, { value: 18 }, { value: 20 },
];

export const mockRevenueSparkline: SparklinePoint[] = [
  { value: 20 }, { value: 24 }, { value: 22 }, { value: 30 }, { value: 28 }, { value: 34 }, { value: 38 },
];

export const mockQuotationsSparkline: SparklinePoint[] = [
  { value: 14 }, { value: 16 }, { value: 15 }, { value: 18 }, { value: 17 }, { value: 19 }, { value: 20 },
];

export const mockEnquiriesSparkline: SparklinePoint[] = [
  { value: 18 }, { value: 16 }, { value: 19 }, { value: 15 }, { value: 13 }, { value: 12 }, { value: 10 },
];

export const mockVehicles: Vehicle[] = [
  {
    id: '1', name: 'Toyota Hiace', type: 'Van', status: 'Available', rate: 120,
    location: 'Main Branch', rentedDays: 210, availableDays: 300,
    nextServiceDate: '2025-06-15', lastLocationNote: 'Main Branch Lot · 2 mins ago',
  },
  {
    id: '2', name: 'Mitsubishi Pajero', type: 'SUV', status: 'Rented', rate: 95,
    location: 'Airport Branch', rentedDays: 260, availableDays: 300,
    nextServiceDate: '2025-05-18', lastLocationNote: 'En route to Airport · 12 mins ago',
  },
  {
    id: '3', name: 'Honda CR-V', type: 'SUV', status: 'Available', rate: 80,
    location: 'Main Branch', rentedDays: 140, availableDays: 300,
    nextServiceDate: '2025-07-02', lastLocationNote: 'Main Branch Lot · 5 mins ago',
  },
  {
    id: '4', name: 'Isuzu NQR', type: 'Truck', status: 'Maintenance', rate: 150,
    location: 'Workshop', rentedDays: 190, availableDays: 300,
    nextServiceDate: '2025-05-14', lastLocationNote: 'Workshop Bay 3 · 1 hr ago',
  },
  {
    id: '5', name: 'Toyota Vios', type: 'Sedan', status: 'Available', rate: 55,
    location: 'Airport Branch', rentedDays: 95, availableDays: 300,
    nextServiceDate: '2025-08-01', lastLocationNote: 'Airport Branch Lot · 8 mins ago',
  },
];