import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';

const mockVehicles = [
  { id: '1', name: 'Toyota Hiace', type: 'Van', status: 'Available', rate: 120, location: 'Main Branch' },
  { id: '2', name: 'Mitsubishi Pajero', type: 'SUV', status: 'Rented', rate: 95, location: 'Airport' },
  { id: '3', name: 'Honda CR-V', type: 'SUV', status: 'Available', rate: 80, location: 'Main Branch' },
  { id: '4', name: 'Isuzu NQR', type: 'Truck', status: 'Maintenance', rate: 150, location: 'Workshop' },
  { id: '5', name: 'Toyota Vios', type: 'Sedan', status: 'Available', rate: 55, location: 'Airport' },
];

export function Vehicles() {
  const [vehicles] = useState(mockVehicles);

  const statusColors: Record<string, string> = {
    Available: 'bg-green-100 text-green-800',
    Rented: 'bg-blue-100 text-blue-800',
    Maintenance: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Vehicles</h2>
        <Button>+ Add Vehicle</Button>
      </div>
      <div className="bg-white rounded-lg border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Rate/Day</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell className="font-medium">{vehicle.name}</TableCell>
                <TableCell>{vehicle.type}</TableCell>
                <TableCell>
                  <Badge className={statusColors[vehicle.status] || 'bg-slate-100'}>
                    {vehicle.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">${vehicle.rate}</TableCell>
                <TableCell>{vehicle.location}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}