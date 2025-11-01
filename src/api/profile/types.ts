export interface ProfileResponse {
  id: string;
  email: string;
  username?: string;
  full_name?: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
  publications_count: number;
  followers_count: number;
  following_count: number;
}

export interface Profile {
  id: string;
  email: string;
  username?: string;
  fullName?: string;
  bio?: string;
  avatarUrl?: string;
  createdAt: string;
  publicationsCount: number;
  followersCount: number;
  followingCount: number;
}

export interface ProfileStats {
  publicationsCount: number;
  followersCount: number;
  followingCount: number;
  likesGiven: number;
  likesReceived: number;
}