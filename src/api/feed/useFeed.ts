import { useState } from 'react';
import type { Publication, PublicationResponse } from '../publication/types';

const API_BASE_URL = 'https://your-api.com';

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

const mapPublicationResponseToPublication = (
  response: PublicationResponse
): Publication => ({
  id: response.id,
  authorId: response.authorId,
  type: response.type,
  title: response.title,
  content: response.content,
  source: response.source,
  publicationDate: response.publicationDate,
  likesCount: response.likes_count,
  commentsCount: response.comments_count,
  savedCount: response.saved_count,
  isLiked: response.is_liked,
  isSaved: response.is_saved,
});

const mapPublicationsResponse = (responses: PublicationResponse[]): Publication[] =>
  responses.map(mapPublicationResponseToPublication);

export const useFeed = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFeed = async () => {
    setLoading(true);
    setError(null);
    try {
      const response: PublicationResponse[] = await request('/feed', {
        method: 'GET',
      });
      return mapPublicationsResponse(response);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getMyPublications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response: PublicationResponse[] = await request('/feed/me', {
        method: 'GET',
      });
      return mapPublicationsResponse(response);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getSavedPublications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response: PublicationResponse[] = await request('/feed/me/saved', {
        method: 'GET',
      });
      return mapPublicationsResponse(response);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUserPublications = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response: PublicationResponse[] = await request(`/feed/user/${userId}`, {
        method: 'GET',
      });
      return mapPublicationsResponse(response);
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
    getFeed,
    getMyPublications,
    getSavedPublications,
    getUserPublications,
  };
};