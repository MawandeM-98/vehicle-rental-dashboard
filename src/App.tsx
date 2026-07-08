import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Bookings } from './pages/Bookings';
import { Quotations } from './pages/Quotations';
import { Customers } from './pages/Customers';
import { Vehicles } from './pages/Vehicles';
import { Calendar } from './pages/Calendar';
import { Reports } from './pages/Reports';
import { Payments } from './pages/Payments';
import { Users } from './pages/Users';
import { Settings } from './pages/Settings';
import { AuditLog } from './pages/AuditLog.tsx';
import { BookingRequest } from './pages/BookingRequest.tsx';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public self-service page — no sidebar/header, standalone branded layout */}
          <Route path="/request" element={<BookingRequest />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="quotations" element={<Quotations />} />
            <Route path="customers" element={<Customers />} />
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="reports" element={<Reports />} />
            <Route path="payments" element={<Payments />} />
            <Route path="users" element={<Users />} />
            <Route path="audit-log" element={<AuditLog />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;