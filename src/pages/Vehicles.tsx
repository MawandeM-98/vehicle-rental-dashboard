import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Trash2, Truck, MapPin, AlertTriangle, Gauge } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAppContext } from '../context/AppContext';
import { Vehicle } from '../types';

const statusColors: Record<Vehicle['status'], string> = {
  Available: 'bg-green-100 text-green-800',
  Rented: 'bg-blue-100 text-blue-800',
  Maintenance: 'bg-yellow-100 text-yellow-800',
};

interface VehicleFormValues {
  name: string;
  type: string;
  status: Vehicle['status'];
  rate: number;
  location: string;
}

function isServiceDueSoon(dateStr: string) {
  const due = new Date(dateStr);
  const in7Days = new Date();
  in7Days.setDate(in7Days.getDate() + 7);
  return due <= in7Days;
}

export function Vehicles() {
  const { vehicles, addVehicle, deleteVehicle, canCreate, canDelete } = useAppContext();
  const [modalOpen, setModalOpen] = useState(false);

  const form = useForm<VehicleFormValues>({
    defaultValues: { name: '', type: '', status: 'Available', rate: 0, location: '' },
  });

  const handleSubmit = (data: VehicleFormValues) => {
    addVehicle({
      ...data,
      rentedDays: 0,
      availableDays: 300,
      nextServiceDate: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().slice(0, 10),
      lastLocationNote: `${data.location} · Just added`,
    });
    form.reset({ name: '', type: '', status: 'Available', rate: 0, location: '' });
    setModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Remove ${name} from the fleet?`)) {
      deleteVehicle(id);
    }
  };

  const fleetUtilization = vehicles.length
    ? Math.round(
        (vehicles.reduce((sum, v) => sum + v.rentedDays / v.availableDays, 0) / vehicles.length) * 100
      )
    : 0;

  const dueForServiceCount = vehicles.filter(v => isServiceDueSoon(v.nextServiceDate)).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Vehicles</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{vehicles.length} vehicles in fleet</p>
        </div>
        {canCreate && (
          <Button onClick={() => setModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5">
            <Plus size={16} /> Add Vehicle
          </Button>
        )}
      </div>

      {/* Fleet health summary strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center shrink-0">
            <Gauge size={20} className="text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Fleet Utilization</p>
            <p className="text-xl font-bold text-blue-700 dark:text-white">{fleetUtilization}%</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-yellow-50 dark:bg-yellow-950 flex items-center justify-center shrink-0">
            <AlertTriangle size={20} className="text-yellow-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Due for Service (7 days)</p>
            <p className="text-xl font-bold text-blue-700 dark:text-white">{dueForServiceCount}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-green-50 dark:bg-green-950 flex items-center justify-center shrink-0">
            <Truck size={20} className="text-green-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Available Now</p>
            <p className="text-xl font-bold text-blue-700 dark:text-white">
              {vehicles.filter(v => v.status === 'Available').length}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="dark:border-slate-700">
              <TableHead>Vehicle</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Rate/Day</TableHead>
              <TableHead>Utilization</TableHead>
              <TableHead>Next Service</TableHead>
              <TableHead>Live Location</TableHead>
              {canDelete && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10 text-slate-400">
                  No vehicles in fleet yet.
                </TableCell>
              </TableRow>
            )}
            {vehicles.map((vehicle) => {
              const utilization = Math.round((vehicle.rentedDays / vehicle.availableDays) * 100);
              const dueSoon = isServiceDueSoon(vehicle.nextServiceDate);
              return (
                <TableRow key={vehicle.id} className="dark:border-slate-800">
                  <TableCell className="font-medium dark:text-white">{vehicle.name}</TableCell>
                  <TableCell className="dark:text-slate-300">{vehicle.type}</TableCell>
                  <TableCell><Badge className={statusColors[vehicle.status]}>{vehicle.status}</Badge></TableCell>
                  <TableCell className="text-right dark:text-slate-300">${vehicle.rate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${utilization >= 80 ? 'bg-red-500' : utilization >= 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${Math.min(utilization, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{utilization}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${dueSoon ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
                      {dueSoon && <AlertTriangle size={11} className="inline mr-1 -mt-0.5" />}
                      {vehicle.nextServiceDate}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin size={13} className="text-blue-500 shrink-0" />
                      <span className="truncate max-w-[160px]">{vehicle.lastLocationNote}</span>
                    </div>
                  </TableCell>
                  {canDelete && (
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleDelete(vehicle.id, vehicle.name)}
                        className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent showCloseButton className="sm:max-w-lg w-[calc(100%-2rem)] max-h-[88vh] overflow-y-auto bg-white dark:bg-slate-900 dark:text-white p-0 rounded-2xl gap-0">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                  <Truck size={22} className="text-white" />
                </div>
                <div>
                  <DialogTitle className="text-white text-lg">Add Vehicle</DialogTitle>
                  <DialogDescription className="text-blue-100 text-sm">Register a new vehicle to the fleet</DialogDescription>
                </div>
              </div>
            </DialogHeader>
          </div>
          <Form form={form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem className="space-y-1.5 sm:col-span-2">
                    <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Vehicle Name</FormLabel>
                    <FormControl><Input placeholder="e.g. Toyota Hiace" {...field} required /></FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )} />
                <FormField control={form.control} name="type" render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Type</FormLabel>
                    <FormControl><Input placeholder="Van, SUV, Sedan..." {...field} required /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="status" render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger className="w-full"><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Rented">Rented</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />
                <FormField control={form.control} name="rate" render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Rate/Day ($)</FormLabel>
                    <FormControl>
                      <Input type="number" value={field.value} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                    </FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="location" render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Branch / Location</FormLabel>
                    <FormControl><Input placeholder="Main Branch" {...field} required /></FormControl>
                  </FormItem>
                )} />
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Add Vehicle</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}