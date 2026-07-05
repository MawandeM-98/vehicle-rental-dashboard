import { Booking, Quotation, Customer, DashboardStats } from '../types';
import { mockBookings, mockCustomers, mockQuotations, mockStats } from '../data/mockData';

const API_BASE = 'http://localhost:3001';

// Define types for the data we're working with


// Generic request function with proper typing
async function request<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${API_BASE}${path}`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

// Type for create/update operations
type CreateData<T> = Omit<T, 'id'>;

export const api = {
  // Bookings
  getBookings: (): Promise<Booking[]> => request('/bookings', mockBookings),
  getBooking: (id: string): Promise<Booking | null> => 
    request(`/bookings/${id}`, mockBookings.find(booking => booking.id === id) ?? null),
  createBooking: async (data: CreateData<Booking>): Promise<Booking> => {
    const response = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.ok ? response.json() : { ...data, id: Date.now().toString() } as Booking;
  },
  updateBooking: async (id: string, data: Partial<Booking>): Promise<Booking> => {
    const response = await fetch(`${API_BASE}/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return response.json();
    }
    // Fallback: return merged data
    const existing = mockBookings.find(b => b.id === id);
    return { ...existing, ...data } as Booking;
  },
  deleteBooking: async (id: string): Promise<{ id: string }> => {
    const response = await fetch(`${API_BASE}/bookings/${id}`, {
      method: 'DELETE',
    });
    return response.ok ? { id } : { id };
  },

  // Quotations
  getQuotations: (): Promise<Quotation[]> => request('/quotations', mockQuotations),
  getQuotation: (id: string): Promise<Quotation | null> =>
    request(`/quotations/${id}`, mockQuotations.find(quote => quote.id === id) ?? null),
  createQuotation: async (data: CreateData<Quotation>): Promise<Quotation> => {
    const response = await fetch(`${API_BASE}/quotations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.ok ? response.json() : { ...data, id: Date.now().toString() } as Quotation;
  },
  updateQuotation: async (id: string, data: Partial<Quotation>): Promise<Quotation> => {
    const response = await fetch(`${API_BASE}/quotations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return response.json();
    }
    const existing = mockQuotations.find(q => q.id === id);
    return { ...existing, ...data } as Quotation;
  },
  deleteQuotation: async (id: string): Promise<{ id: string }> => {
    const response = await fetch(`${API_BASE}/quotations/${id}`, {
      method: 'DELETE',
    });
    return response.ok ? { id } : { id };
  },

  // Customers
  getCustomers: (): Promise<Customer[]> => request('/customers', mockCustomers),
  getCustomer: (id: string): Promise<Customer | null> =>
    request(`/customers/${id}`, mockCustomers.find(customer => customer.id === id) ?? null),
  createCustomer: async (data: CreateData<Customer>): Promise<Customer> => {
    const response = await fetch(`${API_BASE}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.ok ? response.json() : { ...data, id: Date.now().toString() } as Customer;
  },
  updateCustomer: async (id: string, data: Partial<Customer>): Promise<Customer> => {
    const response = await fetch(`${API_BASE}/customers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return response.json();
    }
    const existing = mockCustomers.find(c => c.id === id);
    return { ...existing, ...data } as Customer;
  },
  deleteCustomer: async (id: string): Promise<{ id: string }> => {
    const response = await fetch(`${API_BASE}/customers/${id}`, {
      method: 'DELETE',
    });
    return response.ok ? { id } : { id };
  },

  // Stats
  getStats: (): Promise<DashboardStats> => request('/stats', mockStats),
};