export type Role = 'User' | 'Expert' | 'Creator';

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  phone?: string;
  icon_url: string;
  registered_at: string;
  description: string;
  role: Role;
  statistic: undefined; // контракт
}

export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  iconUrl: string;
  registeredAt: string;
  description: string;
  role: Role;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  check: () => Promise<void>;
  logout: () => Promise<void>;
}