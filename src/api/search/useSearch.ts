import { useState } from 'react';
import type {
  Publication,
  PublicationResponse,
} from '../publication/types';
import type { User, UserResponse } from '../auth/types';

const API_BASE_URL = 'https://your-api.com'; 

const getAuthToken = (): string | null => localStorage.getItem('authToken');

export const mapUser = (response: UserResponse): User => ({
  id: response.id,
  username: response.username,
  email: response.email,
  phone: response.phone,
  iconUrl: response.icon_url,
  registeredAt: response.registered_at,
  description: response.description,
  role: response.role,
});

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

const mapPublication = (p: PublicationResponse): Publication => ({
  id: p.id,
  authorId: p.authorId,
  type: p.type,
  title: p.title,
  content: p.content,
  source: p.source,
  publicationDate: p.publicationDate,
  likesCount: p.likes_count,
  commentsCount: p.comments_count,
  savedCount: p.saved_count,
  isLiked: p.is_liked,
  isSaved: p.is_saved,
});

export const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPublications = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response: PublicationResponse[] = await request(`/search?q=${encodeURIComponent(query)}`, {
        method: 'GET',
      });
      return response.map(mapPublication);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response: UserResponse[] = await request(`/search/users?q=${encodeURIComponent(query)}`, {
        method: 'GET',
      });
      return response.map(mapUser);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const warmupSearchIndex = async () => {
    setLoading(true);
    setError(null);
    try {
      await request('/search/warmup', {
        method: 'POST',
      });
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
    searchPublications,
    searchUsers,
    warmupSearchIndex,
  };
};