import { useState } from 'react';
import type { Publication } from '../publication/types';
import type { User, UserResponse } from '../auth/types';
import { API_BASE_URL } from '../constants'; 
import type { FeedItem } from '../feed/types';

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
) => {
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

const mapPublication = (p: FeedItem): Publication => ({
  id: p.id,
  authorId: p.author_id,
  type: p.type,
  title: p.title,
  content: p.content,
  source: p.source,
  publicationDate: p.publication_date,
  likesCount: p.likes_count || 0,
  commentsCount: p.comments_count || 0,
  savedCount: p.saved_count || 0,
  isLiked: p.is_liked || false,
  isSaved: p.is_saved || false,
});

export const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchPublications = async (query: string) => {
    setLoading(true);
    setError(false);
    try {
      const response: FeedItem[] = await request(`/search?q=${encodeURIComponent(query)}`, {
        method: 'GET',
      });
      return response.map(mapPublication);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async (query: string) => {
    setLoading(true);
    setError(false);
    try {
      const response: UserResponse[] = await request(`/search/users?q=${encodeURIComponent(query)}`, {
        method: 'GET',
      });
      return response.map(mapUser);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const warmupSearchIndex = async () => {
    setLoading(true);
    setError(false);
    try {
      await request('/search/warmup', {
        method: 'POST',
      });
    } catch (err) {
      setError(true);
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