export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  avatar?: string;
  companies: string[];
  password: string;
  twoFactorEnabled: boolean;
  language: string;
  timezone: string;
}