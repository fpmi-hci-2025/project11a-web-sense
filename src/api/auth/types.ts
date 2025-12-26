type RoleResponse = 'user' | 'super' | 'reader' | 'creator' | 'expert';
export type Role = Omit<RoleResponse, 'super' | 'reader'>;

interface StatisticResponse {
  publications_count?: number;
  followers_count?: number;
  following_count?: number;
  likes_received?: number;
}

export interface UserResponse {
  id: string;
  username: string;
  role: RoleResponse;
  registered_at: string;
  phone?: string;
  email?: string;
  icon_url?: string;
  description: string;
  statistic: StatisticResponse;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: UserResponse;
}

export interface LogoutResponse {
  message: string;
}

export type User = {
  id: string;
  username: string;
  role: Role;
  registeredAt: string;
  email?: string;
  phone?: string;
  iconUrl?: string;
  description?: string;
};

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoadingMore: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  check: () => Promise<void>;
  logout: () => Promise<void>;
}
