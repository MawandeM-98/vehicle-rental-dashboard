import { Bell, Search } from 'lucide-react'; // Removed unused 'User'
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { DarkModeToggle } from '../DarkModeToggle';

export function Header() {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 h-16 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Dashboard</h2>
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input placeholder="Search..." className="pl-10 dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <DarkModeToggle />
        <Button variant="ghost" size="icon" className="dark:text-white">
          <Bell size={20} />
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium dark:text-white">Admin</span>
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}