import { Button } from '../components/ui/button';
import { CustomerList } from '../components/customers/CustomerList';

export function Customers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customers</h2>
        <Button>+ Add Customer</Button>
      </div>
      <CustomerList />
    </div>
  );
}