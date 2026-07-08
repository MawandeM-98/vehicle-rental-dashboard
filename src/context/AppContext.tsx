import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Booking, Quotation, Customer, Enquiry, Vehicle, Role, ActivityLogEntry } from '../types';
import { mockBookings, mockQuotations, mockCustomers, mockEnquiries, mockVehicles } from '../data/mockData';

export interface Notification {
  id: string;
  message: string;
  time: string;
  read: boolean;
}

interface AppContextValue {
  bookings: Booking[];
  quotations: Quotation[];
  customers: Customer[];
  enquiries: Enquiry[];
  vehicles: Vehicle[];
  notifications: Notification[];
  unreadCount: number;
  activityLog: ActivityLogEntry[];
  role: Role;
  setRole: (role: Role) => void;
  canCreate: boolean;
  canDelete: boolean;
  addBooking: (data: Omit<Booking, 'id'>) => void;
  deleteBooking: (id: string) => void;
  addQuotation: (data: Omit<Quotation, 'id'>) => void;
  deleteQuotation: (id: string) => void;
  addCustomer: (data: Omit<Customer, 'id'>) => void;
  deleteCustomer: (id: string) => void;
  addEnquiry: (data: Omit<Enquiry, 'id'>) => void;
  deleteEnquiry: (id: string) => void;
  addVehicle: (data: Omit<Vehicle, 'id'>) => void;
  deleteVehicle: (id: string) => void;
  markNotificationsRead: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function nowTimestamp() {
  return new Date().toLocaleString('default', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [quotations, setQuotations] = useState<Quotation[]>(mockQuotations);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(mockEnquiries);
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>([]);
  const [role, setRole] = useState<Role>('Admin');

  const canCreate = role === 'Admin' || role === 'Manager';
  const canDelete = role === 'Admin';

  const pushNotification = useCallback((message: string) => {
    setNotifications(prev => [{ id: genId(), message, time: 'Just now', read: false }, ...prev].slice(0, 30));
  }, []);

  const logActivity = useCallback((action: string, entity: string) => {
    setActivityLog(prev => [
      { id: genId(), timestamp: nowTimestamp(), user: 'Admin User', role, action, entity },
      ...prev,
    ].slice(0, 100));
  }, [role]);

  const addBooking = useCallback((data: Omit<Booking, 'id'>) => {
    setBookings(prev => [{ ...data, id: genId() }, ...prev]);
    pushNotification(`New booking created for ${data.customer} (${data.bookingId})`);
    logActivity('Created booking', `${data.bookingId} — ${data.customer}`);
  }, [pushNotification, logActivity]);

  const deleteBooking = useCallback((id: string) => {
    setBookings(prev => {
      const target = prev.find(b => b.id === id);
      if (target) logActivity('Deleted booking', `${target.bookingId} — ${target.customer}`);
      return prev.filter(b => b.id !== id);
    });
  }, [logActivity]);

  const addQuotation = useCallback((data: Omit<Quotation, 'id'>) => {
    setQuotations(prev => [{ ...data, id: genId() }, ...prev]);
    pushNotification(`New quotation ${data.quoteId} sent to ${data.customer}`);
    logActivity('Created quotation', `${data.quoteId} — ${data.customer}`);
  }, [pushNotification, logActivity]);

  const deleteQuotation = useCallback((id: string) => {
    setQuotations(prev => {
      const target = prev.find(q => q.id === id);
      if (target) logActivity('Deleted quotation', `${target.quoteId} — ${target.customer}`);
      return prev.filter(q => q.id !== id);
    });
  }, [logActivity]);

  const addCustomer = useCallback((data: Omit<Customer, 'id'>) => {
    setCustomers(prev => [{ ...data, id: genId() }, ...prev]);
    pushNotification(`New customer added: ${data.name}`);
    logActivity('Added customer', data.name);
  }, [pushNotification, logActivity]);

  const deleteCustomer = useCallback((id: string) => {
    setCustomers(prev => {
      const target = prev.find(c => c.id === id);
      if (target) logActivity('Deleted customer', target.name);
      return prev.filter(c => c.id !== id);
    });
  }, [logActivity]);

  const addEnquiry = useCallback((data: Omit<Enquiry, 'id'>) => {
    setEnquiries(prev => [{ ...data, id: genId() }, ...prev]);
    pushNotification(`New enquiry from ${data.name}`);
    logActivity('Logged enquiry', data.name);
  }, [pushNotification, logActivity]);

  const deleteEnquiry = useCallback((id: string) => {
    setEnquiries(prev => {
      const target = prev.find(e => e.id === id);
      if (target) logActivity('Deleted enquiry', target.name);
      return prev.filter(e => e.id !== id);
    });
  }, [logActivity]);

  const addVehicle = useCallback((data: Omit<Vehicle, 'id'>) => {
    setVehicles(prev => [{ ...data, id: genId() }, ...prev]);
    pushNotification(`New vehicle added to fleet: ${data.name}`);
    logActivity('Added vehicle', data.name);
  }, [pushNotification, logActivity]);

  const deleteVehicle = useCallback((id: string) => {
    setVehicles(prev => {
      const target = prev.find(v => v.id === id);
      if (target) logActivity('Removed vehicle', target.name);
      return prev.filter(v => v.id !== id);
    });
  }, [logActivity]);

  const markNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        bookings, quotations, customers, enquiries, vehicles, notifications, unreadCount,
        activityLog, role, setRole, canCreate, canDelete,
        addBooking, deleteBooking, addQuotation, deleteQuotation,
        addCustomer, deleteCustomer, addEnquiry, deleteEnquiry,
        addVehicle, deleteVehicle, markNotificationsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

/* eslint-disable-next-line react-refresh/only-export-components */
export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within an AppProvider');
  return ctx;
}