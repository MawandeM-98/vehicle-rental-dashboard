import { Bell, User, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

export function Header() {
  return (
    <header className="bg-white border-b border-slate-200 h-16 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <h2 className="text-lg font-semibold text-slate-800">Dashboard</h2>
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input placeholder="Search..." className="pl-10" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell size={20} />
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Admin</span>
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}