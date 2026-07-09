import { useRef, useState } from 'react';
import { Camera, User as UserIcon, Save, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { useAppContext } from '../context/AppContext';
import { fileToBase64 } from '../utils/file';

function initials(name: string) {
  return name.split(' ').map((p) => p.charAt(0)).join('').slice(0, 2).toUpperCase();
}

export function Profile() {
  const { adminProfile, updateAdminProfile } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(adminProfile.name);
  const [email, setEmail] = useState(adminProfile.email);
  const [phone, setPhone] = useState(adminProfile.phone);
  const [jobTitle, setJobTitle] = useState(adminProfile.jobTitle);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(adminProfile.avatarUrl);
  const [savedMessage, setSavedMessage] = useState(false);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    setAvatarPreview(base64);
  };

  const handleSave = () => {
    updateAdminProfile({ name, email, phone, jobTitle, avatarUrl: avatarPreview });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  const handleReset = () => {
    setName(adminProfile.name);
    setEmail(adminProfile.email);
    setPhone(adminProfile.phone);
    setJobTitle(adminProfile.jobTitle);
    setAvatarPreview(adminProfile.avatarUrl);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">My Profile</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Manage your personal account details</p>
      </div>

      <Card className="dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="dark:text-white">Profile Photo</CardTitle>
          <CardDescription className="dark:text-slate-400">
            Click your photo to upload a new one. Saved to this browser.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative h-20 w-20 rounded-full overflow-hidden group shrink-0 ring-2 ring-slate-200 dark:ring-slate-700"
            >
              {avatarPreview ? (
                <img src={avatarPreview} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-700 dark:text-blue-300 text-xl font-bold">
                  {initials(name || 'AU')}
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera size={20} className="text-white" />
              </div>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{name}</p>
              <p className="text-xs text-slate-400">{jobTitle}</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 gap-1.5"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera size={14} /> Change Photo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="dark:text-white">Personal Details</CardTitle>
          <CardDescription className="dark:text-slate-400">Update your name, contact info, and role</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="profile-name" className="dark:text-slate-200">Full Name</Label>
              <Input id="profile-name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-title" className="dark:text-slate-200">Job Title</Label>
              <Input id="profile-title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-email" className="dark:text-slate-200">Email</Label>
              <Input id="profile-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-phone" className="dark:text-slate-200">Phone</Label>
              <Input id="profile-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
            <Info size={14} className="shrink-0" />
            <span>Profile data is saved locally in this browser — it isn't stored on a server.</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={handleReset}>Reset</Button>
              <Button type="button" onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5">
                <Save size={16} /> Save Changes
              </Button>
            </div>
            {savedMessage && (
              <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                <UserIcon size={14} /> Profile updated
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}