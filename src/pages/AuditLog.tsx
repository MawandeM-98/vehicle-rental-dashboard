import { ClipboardList } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { useAppContext } from '../context/AppContext';
import { Role } from '../types';

const roleColors: Record<Role, string> = {
  Admin: 'bg-purple-100 text-purple-800',
  Manager: 'bg-blue-100 text-blue-800',
  Staff: 'bg-slate-100 text-slate-800',
};

export function AuditLog() {
  const { activityLog } = useAppContext();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ClipboardList size={22} className="text-blue-600" />
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Audit Log</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">A complete trail of who did what, and when</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="dark:border-slate-700">
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Entity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activityLog.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-slate-400">
                  No activity recorded yet — actions like creating bookings, quotations, or customers will show up here.
                </TableCell>
              </TableRow>
            )}
            {activityLog.map((entry) => (
              <TableRow key={entry.id} className="dark:border-slate-800">
                <TableCell className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{entry.timestamp}</TableCell>
                <TableCell className="font-medium dark:text-white">{entry.user}</TableCell>
                <TableCell><Badge className={roleColors[entry.role]}>{entry.role}</Badge></TableCell>
                <TableCell className="dark:text-slate-300">{entry.action}</TableCell>
                <TableCell className="dark:text-slate-300">{entry.entity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}