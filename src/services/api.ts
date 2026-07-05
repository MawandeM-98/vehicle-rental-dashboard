const API_BASE = 'http://localhost:3001';

export const api = {
  // Bookings
  getBookings: () => fetch(`${API_BASE}/bookings`).then(res => res.json()),
  getBooking: (id: string) => fetch(`${API_BASE}/bookings/${id}`).then(res => res.json()),
  createBooking: (data: any) => fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json()),
  updateBooking: (id: string, data: any) => fetch(`${API_BASE}/bookings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json()),
  deleteBooking: (id: string) => fetch(`${API_BASE}/bookings/${id}`, {
    method: 'DELETE',
  }).then(res => res.json()),

  // Quotations
  getQuotations: () => fetch(`${API_BASE}/quotations`).then(res => res.json()),
  getQuotation: (id: string) => fetch(`${API_BASE}/quotations/${id}`).then(res => res.json()),
  createQuotation: (data: any) => fetch(`${API_BASE}/quotations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json()),
  updateQuotation: (id: string, data: any) => fetch(`${API_BASE}/quotations/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json()),
  deleteQuotation: (id: string) => fetch(`${API_BASE}/quotations/${id}`, {
    method: 'DELETE',
  }).then(res => res.json()),

  // Customers
  getCustomers: () => fetch(`${API_BASE}/customers`).then(res => res.json()),
  getCustomer: (id: string) => fetch(`${API_BASE}/customers/${id}`).then(res => res.json()),
  createCustomer: (data: any) => fetch(`${API_BASE}/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json()),
  updateCustomer: (id: string, data: any) => fetch(`${API_BASE}/customers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json()),
  deleteCustomer: (id: string) => fetch(`${API_BASE}/customers/${id}`, {
    method: 'DELETE',
  }).then(res => res.json()),

  // Stats
  getStats: () => fetch(`${API_BASE}/stats`).then(res => res.json()),
};