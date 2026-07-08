import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAppContext } from '../context/AppContext';
import { Role } from '../types';

export function Settings() {
  const { role, setRole } = useAppContext();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Settings</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Configure your company profile and access</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dark:bg-slate-900 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Company Profile</CardTitle>
            <CardDescription className="dark:text-slate-400">Update your company information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name" className="dark:text-slate-200">Company Name</Label>
              <Input id="company-name" defaultValue="Bushlore HR" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-email" className="dark:text-slate-200">Email</Label>
              <Input id="company-email" defaultValue="fleet@bushlorehr.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-phone" className="dark:text-slate-200">Phone</Label>
              <Input id="company-phone" defaultValue="+1 234-567-8900" />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="dark:bg-slate-900 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Access & Permissions</CardTitle>
            <CardDescription className="dark:text-slate-400">
              Your current role determines what you can create or delete
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="dark:text-slate-200">Current Role</Label>
              <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin — full access</SelectItem>
                  <SelectItem value="Manager">Manager — can create, cannot delete</SelectItem>
                  <SelectItem value="Staff">Staff — view only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-4 text-sm text-slate-600 dark:text-slate-300">
              <p><strong>Admin:</strong> create and delete bookings, quotations, customers, vehicles, users.</p>
              <p className="mt-1"><strong>Manager:</strong> can create records but cannot delete them.</p>
              <p className="mt-1"><strong>Staff:</strong> read-only access across the platform.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}