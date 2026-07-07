import { useLocation } from 'react-router-dom';
import { Bell, Search, Menu, ChevronDown } from 'lucide-react';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { DarkModeToggle } from '../DarkModeToggle';

interface PageMeta {
  title: string;
  subtitle: string;
}

const pageMeta: Record<string, PageMeta> = {
  '/': { title: 'Dashboard', subtitle: 'Welcome back, Admin!' },
  '/bookings': { title: 'Bookings', subtitle: 'Manage all vehicle rental bookings' },
  '/quotations': { title: 'Quotations', subtitle: 'View, create, and track rental quotes' },
  '/customers': { title: 'Customers / Enquiries', subtitle: 'Manage customer relationships and enquiries' },
  '/vehicles': { title: 'Vehicles', subtitle: 'Manage your fleet availability and status' },
  '/calendar': { title: 'Calendar', subtitle: 'View bookings across the month' },
  '/reports': { title: 'Reports', subtitle: 'Business analytics and insights' },
  '/payments': { title: 'Payments', subtitle: 'Track transactions and payment status' },
  '/users': { title: 'Users', subtitle: 'Manage internal operations team access' },
  '/settings': { title: 'Settings', subtitle: 'Configure your account and system preferences' },
};

export function Header() {
  const location = useLocation();
  const meta = pageMeta[location.pathname] ?? { title: 'RentXpress', subtitle: '' };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 h-16 px-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 min-w-0">
        <Button variant="ghost" size="icon" className="dark:text-white shrink-0">
          <Menu size={20} />
        </Button>
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-slate-800 dark:text-white leading-tight truncate">
            {meta.title}
          </h2>
          {meta.subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{meta.subtitle}</p>
          )}
        </div>
      </div>

      <div className="relative hidden md:block w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <Input
          placeholder="Search anything..."
          className="pl-10 h-9 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
        />
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <DarkModeToggle />
        <Button variant="ghost" size="icon" className="relative dark:text-white">
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] font-semibold flex items-center justify-center">
            5
          </span>
        </Button>
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AU</AvatarFallback>
          </Avatar>
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-semibold text-slate-800 dark:text-white">Admin User</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Operations Manager</p>
          </div>
          <ChevronDown size={16} className="text-slate-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}