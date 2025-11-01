import { useState } from 'react';
import type { Publication, PublicationResponse } from './types';
import type { User } from '../auth/types';
import type { Comment } from '../comment/types';

const API_BASE_URL = 'api-url';

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

export const usePublication = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPublication = async (data: { title: string; content: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response: PublicationResponse = await request('/publication/create', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return mapPublicationResponseToPublication(response);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getPublication = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response: PublicationResponse = await request(`/publication/${id}`, {
        method: 'GET',
      });
      return mapPublicationResponseToPublication(response);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePublication = async (
    id: string,
    data: { title: string; content: string }
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response: PublicationResponse = await request(`/publication/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      return mapPublicationResponseToPublication(response);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePublication = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await request(`/publication/${id}`, {
        method: 'DELETE',
      });
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const likePublication = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response: PublicationResponse = await request(`/publication/${id}/like`, {
        method: 'POST',
      });
      return mapPublicationResponseToPublication(response);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getLikes = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const likes: User[] = await request(`/publication/${id}/likes`, {
        method: 'GET',
      });
      return likes;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const savePublication = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response: PublicationResponse = await request(`/publication/${id}/save`, {
        method: 'POST',
      });
      return mapPublicationResponseToPublication(response);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const unsavePublication = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response: PublicationResponse = await request(`/publication/${id}/save`, {
        method: 'DELETE',
      });
      return mapPublicationResponseToPublication(response);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getComments = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const comments: Comment[] = await request(`/publication/${id}/comments`, {
        method: 'GET',
      });
      return comments;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createComment = async (id: string, content: string) => {
    setLoading(true);
    setError(null);
    try {
      const comment: Comment = await request(`/publication/${id}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content }),
      });
      return comment;
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
    createPublication,
    getPublication,
    updatePublication,
    deletePublication,
    likePublication,
    getLikes,
    savePublication,
    unsavePublication,
    getComments,
    createComment,
  };
};