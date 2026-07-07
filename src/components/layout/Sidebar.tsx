import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  Users,
  Truck,
  CalendarRange,
  BarChart3,
  Receipt,
  UserCog,
  Settings,
  Car,
  Headset,
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: CalendarDays, label: 'Bookings', path: '/bookings' },
  { icon: FileText, label: 'Quotations', path: '/quotations' },
  { icon: Users, label: 'Customers / Enquiries', path: '/customers' },
  { icon: Truck, label: 'Vehicles', path: '/vehicles' },
  { icon: CalendarRange, label: 'Calendar', path: '/calendar' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
  { icon: Receipt, label: 'Payments', path: '/payments' },
  { icon: UserCog, label: 'Users', path: '/users' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-[#0b1324] text-white h-screen fixed left-0 top-0 flex flex-col z-40">
      <div className="px-6 py-6 flex items-center gap-2.5 border-b border-white/5">
        <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <Car size={20} className="text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight">
          <span className="text-white">Rent</span>
          <span className="text-blue-500">Xpress</span>
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-900/40'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <item.icon size={18} className="shrink-0" />
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3">
        <div className="rounded-xl bg-white/5 border border-white/10 p-4 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0">
            <Headset size={18} className="text-blue-400" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">Need Help?</p>
            <p className="text-xs text-slate-400 truncate">Contact Support</p>
          </div>
        </div>
      </div>
    </aside>
  );
}