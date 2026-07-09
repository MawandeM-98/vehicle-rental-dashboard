import { AdminProfile } from '../types';

const PROFILE_KEY = 'bushlore_admin_profile';

const defaultProfile: AdminProfile = {
  name: 'Admin User',
  email: 'admin@bushlorehr.com',
  phone: '+1 234-567-8900',
  jobTitle: 'Operations Manager',
  avatarUrl: null,
};

export function loadAdminProfile(): AdminProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...defaultProfile, ...parsed };
    }
  } catch {
    // corrupted or inaccessible storage — fall back silently
  }
  return defaultProfile;
}

export function saveAdminProfile(profile: AdminProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {
    // storage full or unavailable — ignore, in-memory state still works for this session
  }
}