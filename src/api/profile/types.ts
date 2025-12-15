import type { Role } from '../auth/types';

export interface Profile {
  id: string;
  email: string;
  username?: string;
  fullName?: string;
  bio?: string;
  avatarUrl?: string;
  createdAt: string;
  role: Role;
}
