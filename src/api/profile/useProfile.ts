import { useCallback, useState } from 'react';
import type { Profile } from './types';
import { API_BASE_URL } from '../constants';
import type { UserResponse } from '../auth/types';

const getAuthToken = (): string | null => localStorage.getItem('authToken');

const request = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${res.status}`);
  }

  return res.json();
};

const mapProfileResponseToProfile = (res: UserResponse): Profile => ({
  id: res.id,
  email: res.email || '',
  bio: res.description,
  username: res.username,
  avatarUrl: res.icon_url,
  createdAt: res.registered_at,
  role: res.role,
});

const fetchAvatarUrl = async (avatarId: string): Promise<string> => {
  try {
    const res = await request(`/media/${avatarId}/file`, {
      method: 'GET',
    });
    return res.url;
  } catch (error) {
    console.error('Failed to fetch avatar URL:', error);
    return `https://i.pravatar.cc/150?u=${avatarId}`;
  }
};

const enrichProfileWithAvatar = async (profile: Profile): Promise<Profile> => {
  if (profile.avatarUrl && !profile.avatarUrl.startsWith('http')) {
    try {
      const avatarUrl = await fetchAvatarUrl(profile.avatarUrl);
      return {
        ...profile,
        avatarUrl,
      };
    } catch (error) {
      console.error(`Failed to fetch avatar for profile ${profile.id}:`, error);
      return {
        ...profile,
        avatarUrl: `https://i.pravatar.cc/150?u=${profile.id}`,
      };
    }
  }
  return profile;
};

export const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const getMyProfile = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response: UserResponse = await request('/profile/me', {
        method: 'GET',
      });
      const profile = mapProfileResponseToProfile(response);
      return await enrichProfileWithAvatar(profile);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateMyProfile = useCallback(
    async (data: Partial<Omit<Profile, 'id' | 'email' | 'createdAt'>>) => {
      setLoading(true);
      setError(false);
      try {
        const payload = {
          username: data.username,
          full_name: data.fullName,
          bio: data.bio,
          avatar_url: data.avatarUrl,
        };
        const response: UserResponse = await request('/profile/me', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        return mapProfileResponseToProfile(response);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const getUserProfile = useCallback(async (id: string) => {
    setLoading(true);
    setError(false);
    try {
      const response: UserResponse = await request(`/profile/${id}`, {
        method: 'GET',
      });
      const profile = mapProfileResponseToProfile(response);
      return await enrichProfileWithAvatar(profile);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const getAvatarUrl = useCallback(
    async (avatarId: string): Promise<string> => {
      return await fetchAvatarUrl(avatarId);
    },
    [],
  );

  return {
    loading,
    error,
    getMyProfile,
    updateMyProfile,
    getUserProfile,
    getAvatarUrl,
  };
};
