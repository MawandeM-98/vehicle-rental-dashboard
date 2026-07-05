import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  Users, 
  Truck, 
  Receipt, 
  BarChart3, 
  Settings, 
  UserCog 
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Calendar, label: 'Bookings', path: '/bookings' },
  { icon: FileText, label: 'Quotations', path: '/quotations' },
  { icon: Users, label: 'Customers', path: '/customers' },
  { icon: Truck, label: 'Vehicles', path: '/vehicles' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
  { icon: Receipt, label: 'Payments', path: '/payments' },
  { icon: UserCog, label: 'Users', path: '/users' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold">RentalHub</h1>
        <p className="text-slate-400 text-sm">Vehicle Rental Platform</p>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                isActive 
                  ? 'bg-slate-800 text-white border-r-4 border-blue-500' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}