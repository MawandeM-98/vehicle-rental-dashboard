import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

interface AppUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

const initialUsers: AppUser[] = [
  { id: '1', name: 'John Admin', email: 'john@bushlorehr.com', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Sarah Manager', email: 'sarah@bushlorehr.com', role: 'Manager', status: 'Active' },
  { id: '3', name: 'Mike Staff', email: 'mike@bushlorehr.com', role: 'Staff', status: 'Inactive' },
  { id: '4', name: 'Lisa Operator', email: 'lisa@bushlorehr.com', role: 'Staff', status: 'Active' },
];

export function Users() {
  const [users, setUsers] = useState<AppUser[]>(initialUsers);

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Remove ${name} from users?`)) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Users</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{users.length} team members</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5">
          <Plus size={16} /> Add User
        </Button>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="dark:border-slate-700">
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="dark:border-slate-800">
                <TableCell className="flex items-center gap-3 dark:text-white">
                  <Avatar className="h-8 w-8"><AvatarFallback>{user.name.charAt(0)}</AvatarFallback></Avatar>
                  <span className="font-medium">{user.name}</span>
                </TableCell>
                <TableCell className="dark:text-slate-300">{user.email}</TableCell>
                <TableCell><Badge variant="outline">{user.role}</Badge></TableCell>
                <TableCell>
                  <Badge className={user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon-sm" onClick={() => handleDelete(user.id, user.name)} className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950">
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}