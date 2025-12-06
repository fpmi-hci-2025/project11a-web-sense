import { useState } from 'react';
import type { Profile, ProfileResponse, ProfileStats } from './types';
import { API_BASE_URL } from '../constants';

const getAuthToken = (): string | null => localStorage.getItem('authToken');

const request = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
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

const mapProfileResponseToProfile = (res: ProfileResponse): Profile => ({
  id: res.id,
  email: res.email,
  username: res.username,
  fullName: res.full_name,
  bio: res.bio,
  avatarUrl: res.avatar_url,
  createdAt: res.created_at,
  publicationsCount: res.publications_count,
  followersCount: res.followers_count,
  followingCount: res.following_count,
});

const mapStatsResponseToStats = (res: any): ProfileStats => ({
  publicationsCount: res.publications_count ?? 0,
  followersCount: res.followers_count ?? 0,
  followingCount: res.following_count ?? 0,
  likesGiven: res.likes_given ?? 0,
  likesReceived: res.likes_received ?? 0,
});

export const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMyProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response: ProfileResponse = await request('/profile/me', {
        method: 'GET',
      });
      return mapProfileResponseToProfile(response);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateMyProfile = async (data: Partial<Omit<Profile, 'id' | 'email' | 'createdAt'>>) => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        username: data.username,
        full_name: data.fullName,
        bio: data.bio,
        avatar_url: data.avatarUrl,
      };
      const response: ProfileResponse = await request('/profile/me', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      return mapProfileResponseToProfile(response);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUserProfile = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response: ProfileResponse = await request(`/profile/${id}`, {
        method: 'GET',
      });
      return mapProfileResponseToProfile(response);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUserStats = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await request(`/profile/${id}/stats`, {
        method: 'GET',
      });
      return mapStatsResponseToStats(response);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getMyProfile,
    updateMyProfile,
    getUserProfile,
    getUserStats,
  };
};