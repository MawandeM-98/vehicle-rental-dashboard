import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { NewCustomerModal } from '../components/customers/NewCustomerModal.tsx';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useFetchData } from '../hooks/useFetchData';
import { api } from '../services/api';
import { Customer } from '../types';

export function Customers() {
  // FIXED: Use custom hook instead of direct useEffect with setState
  const { data: customers, loading, error } = useFetchData<Customer[]>(api.getCustomers);

  const refreshData = async () => {
    window.location.reload();
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customers</h2>
        <NewCustomerModal onSuccess={refreshData} />
      </div>
      <div className="bg-white rounded-lg border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Bookings</TableHead>
              <TableHead className="text-right">Total Spent</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(customers || []).map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{customer.name}</span>
                </TableCell>
                <TableCell>{customer.company}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell className="text-right">{customer.totalBookings}</TableCell>
                <TableCell className="text-right">${customer.totalSpent.toFixed(2)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}