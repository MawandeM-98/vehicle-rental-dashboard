import { useState } from 'react';
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
  ClipboardList,
  Phone,
  Copy,
  Check,
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
  { icon: ClipboardList, label: 'Audit Log', path: '/audit-log' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const SUPPORT_NUMBER = '+1 (555) 010-2938';

export function Sidebar() {
  const [showNumber, setShowNumber] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(SUPPORT_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API unavailable — silently ignore
    }
  };

  return (
    <aside className="w-64 bg-[#0b1324] text-white h-screen fixed left-0 top-0 flex flex-col z-40">
      <div className="px-6 py-6 flex items-center gap-2.5 border-b border-white/5">
        <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <Car size={20} className="text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight leading-tight">
          <span className="text-white">Bushlore</span>
          <span className="text-blue-500">_Fleet</span>
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
        <button
          onClick={() => setShowNumber((v) => !v)}
          className="w-full text-left rounded-xl bg-white/5 border border-white/10 p-4 flex items-center gap-3 hover:bg-white/10 transition-colors"
        >
          <div className="h-9 w-9 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0">
            {showNumber ? <Phone size={18} className="text-blue-400" /> : <Headset size={18} className="text-blue-400" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white truncate">Need Help?</p>
            {showNumber ? (
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs text-blue-300 font-medium truncate">{SUPPORT_NUMBER}</span>
                <span onClick={handleCopy} className="text-slate-400 hover:text-white shrink-0" title="Copy number">
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                </span>
              </div>
            ) : (
              <p className="text-xs text-slate-400 truncate">Contact Support</p>
            )}
          </div>
        </button>
      </div>
    </aside>
  );
}