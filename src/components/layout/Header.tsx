import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, Search, Menu, ChevronDown, CalendarDays, FileText, Users as UsersIcon, X } from 'lucide-react';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { DarkModeToggle } from '../DarkModeToggle';
import { useAppContext } from '../../context/AppContext';

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
  '/audit-log': { title: 'Audit Log', subtitle: 'A complete trail of who did what, and when' },
  '/settings': { title: 'Settings', subtitle: 'Configure your account and system preferences' },
  '/profile': { title: 'My Profile', subtitle: 'Manage your personal account details' },
};

function initials(name: string) {
  return name.split(' ').map((p) => p.charAt(0)).join('').slice(0, 2).toUpperCase();
}

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const meta = pageMeta[location.pathname] ?? { title: 'Bushlore_Fleet', subtitle: '' };
  const { bookings, quotations, customers, notifications, unreadCount, markNotificationsRead, adminProfile } = useAppContext();

  const [query, setQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { bookings: [], quotations: [], customers: [] };
    return {
      bookings: bookings.filter(b =>
        b.bookingId.toLowerCase().includes(q) || b.customer.toLowerCase().includes(q) || b.vehicle.toLowerCase().includes(q)
      ).slice(0, 4),
      quotations: quotations.filter(qt =>
        qt.quoteId.toLowerCase().includes(q) || qt.customer.toLowerCase().includes(q)
      ).slice(0, 4),
      customers: customers.filter(c =>
        c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
      ).slice(0, 4),
    };
  }, [query, bookings, quotations, customers]);

  const hasResults = results.bookings.length + results.quotations.length + results.customers.length > 0;
  const showDropdown = searchFocused && query.trim().length > 0;

  const goTo = (path: string) => {
    setQuery('');
    setSearchFocused(false);
    navigate(path);
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 h-16 px-6 flex items-center justify-between gap-4 relative z-30">
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
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setTimeout(() => setSearchFocused(false), 120)}
          placeholder="Search bookings, quotations, customers..."
          className="pl-10 pr-8 h-9 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
        />
        {query && (
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X size={16} />
          </button>
        )}

        {showDropdown && (
          <div
            onMouseDown={(e) => e.preventDefault()}
            className="absolute top-full mt-2 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg max-h-96 overflow-y-auto z-50"
          >
            {!hasResults && (
              <p className="text-sm text-slate-400 p-4 text-center">No matches for "{query}"</p>
            )}
            {results.bookings.length > 0 && (
              <div className="p-2">
                <p className="text-xs font-semibold text-slate-400 px-2 py-1 uppercase tracking-wide">Bookings</p>
                {results.bookings.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => goTo('/bookings')}
                    className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-left"
                  >
                    <CalendarDays size={15} className="text-blue-600 shrink-0" />
                    <span className="text-sm text-slate-700 dark:text-slate-200 truncate">
                      {b.bookingId} — {b.customer} ({b.vehicle})
                    </span>
                  </button>
                ))}
              </div>
            )}
            {results.quotations.length > 0 && (
              <div className="p-2 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-400 px-2 py-1 uppercase tracking-wide">Quotations</p>
                {results.quotations.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => goTo('/quotations')}
                    className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-left"
                  >
                    <FileText size={15} className="text-purple-600 shrink-0" />
                    <span className="text-sm text-slate-700 dark:text-slate-200 truncate">
                      {q.quoteId} — {q.customer}
                    </span>
                  </button>
                ))}
              </div>
            )}
            {results.customers.length > 0 && (
              <div className="p-2 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-400 px-2 py-1 uppercase tracking-wide">Customers</p>
                {results.customers.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => goTo('/customers')}
                    className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-left"
                  >
                    <UsersIcon size={15} className="text-green-600 shrink-0" />
                    <span className="text-sm text-slate-700 dark:text-slate-200 truncate">
                      {c.name} — {c.company}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <DarkModeToggle />

        <Popover onOpenChange={(o) => { if (o) markNotificationsRead(); }}>
          <PopoverTrigger>
            <Button variant="ghost" size="icon" className="relative dark:text-white" aria-label="Notifications">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] font-semibold flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0 bg-white dark:bg-slate-900 dark:border-slate-700">
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
              <p className="text-sm font-semibold text-slate-800 dark:text-white">Notifications</p>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {notifications.length === 0 && (
                <p className="text-sm text-slate-400 p-6 text-center">You're all caught up.</p>
              )}
              {notifications.map((n) => (
                <div key={n.id} className="px-4 py-3 border-b border-slate-50 dark:border-slate-800 last:border-0">
                  <p className="text-sm text-slate-700 dark:text-slate-200">{n.message}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg pr-2 py-1 transition-colors"
        >
          <Avatar className="h-9 w-9">
            {adminProfile.avatarUrl && <AvatarImage src={adminProfile.avatarUrl} />}
            <AvatarFallback>{initials(adminProfile.name)}</AvatarFallback>
          </Avatar>
          <div className="hidden sm:block leading-tight text-left">
            <p className="text-sm font-semibold text-slate-800 dark:text-white">{adminProfile.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{adminProfile.jobTitle}</p>
          </div>
          <ChevronDown size={16} className="text-slate-400 hidden sm:block" />
        </button>
      </div>
    </header>
  );
}