import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Panel } from '../components/ui/panel';
import { NewCustomerModal } from '../components/customers/NewCustomerModal';
import { NewEnquiryModal } from '../components/enquiries/NewEnquiryModal';
import { useAppContext } from '../context/AppContext';
import { Enquiry } from '../types';

const enquiryStatusColors: Record<Enquiry['status'], string> = {
  New: 'bg-green-100 text-green-800',
  Contacted: 'bg-slate-100 text-slate-800',
  'Quotation Sent': 'bg-blue-100 text-blue-800',
};

interface CustomersNavState {
  openEnquiryModal?: boolean;
  openModal?: boolean;
}

export function Customers() {
  const { customers, deleteCustomer, enquiries, deleteEnquiry, canCreate, canDelete } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const navState = location.state as CustomersNavState | null;

  const initialTab = searchParams.get('tab') === 'enquiries' ? 'enquiries' : 'customers';

  const [customerModalOpen, setCustomerModalOpen] = useState<boolean>(() => Boolean(navState?.openModal));
  const [enquiryModalOpen, setEnquiryModalOpen] = useState<boolean>(() => Boolean(navState?.openEnquiryModal));

  if (navState?.openEnquiryModal || navState?.openModal) {
    navigate(location.pathname + location.search, { replace: true, state: null });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Customers / Enquiries</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {customers.length} customers · {enquiries.length} enquiries
        </p>
      </div>

      <Tabs defaultValue={initialTab}>
        <TabsList>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="enquiries">Enquiries</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="mt-4 space-y-4">
          {canCreate && (
            <div className="flex justify-end">
              <Button onClick={() => setCustomerModalOpen(true)} className="bg-green-600 hover:bg-green-700 text-white gap-1.5">
                <Plus size={16} /> Add Customer
              </Button>
            </div>
          )}
          <Panel className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="text-right">Bookings</TableHead>
                  <TableHead className="text-right">Total Spent</TableHead>
                  {canDelete && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.length === 0 && (
                  <TableRow><TableCell colSpan={7} className="text-center py-10 text-slate-400">No customers yet.</TableCell></TableRow>
                )}
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="flex items-center gap-3">
                      <Avatar className="h-8 w-8"><AvatarFallback>{customer.name.charAt(0)}</AvatarFallback></Avatar>
                      <span className="font-medium text-slate-800 dark:text-white">{customer.name}</span>
                    </TableCell>
                    <TableCell>{customer.company}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell className="text-right">{customer.totalBookings}</TableCell>
                    <TableCell className="text-right">${customer.totalSpent.toFixed(2)}</TableCell>
                    {canDelete && (
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => window.confirm(`Delete customer ${customer.name}?`) && deleteCustomer(customer.id)}
                          className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Panel>
        </TabsContent>

        <TabsContent value="enquiries" className="mt-4 space-y-4">
          {canCreate && (
            <div className="flex justify-end">
              <Button onClick={() => setEnquiryModalOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white gap-1.5">
                <Plus size={16} /> Log Enquiry
              </Button>
            </div>
          )}
          <Panel className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Logged</TableHead>
                  <TableHead>Status</TableHead>
                  {canDelete && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {enquiries.length === 0 && (
                  <TableRow><TableCell colSpan={5} className="text-center py-10 text-slate-400">No enquiries yet.</TableCell></TableRow>
                )}
                {enquiries.map((enquiry) => (
                  <TableRow key={enquiry.id}>
                    <TableCell className="font-medium text-slate-800 dark:text-white">{enquiry.name}</TableCell>
                    <TableCell>{enquiry.description}</TableCell>
                    <TableCell>{enquiry.timeAgo}</TableCell>
                    <TableCell><Badge className={enquiryStatusColors[enquiry.status]}>{enquiry.status}</Badge></TableCell>
                    {canDelete && (
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => window.confirm(`Delete enquiry from ${enquiry.name}?`) && deleteEnquiry(enquiry.id)}
                          className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Panel>
        </TabsContent>
      </Tabs>

      <NewCustomerModal open={customerModalOpen} onOpenChange={setCustomerModalOpen} />
      <NewEnquiryModal open={enquiryModalOpen} onOpenChange={setEnquiryModalOpen} />
    </div>
  );
}