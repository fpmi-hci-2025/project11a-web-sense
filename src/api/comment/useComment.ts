import { useState } from 'react';
import type { CommentResponse, Comment } from './types';

const API_BASE_URL = 'https://your-api.com'; // ← убран пробел в конце

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

const mapCommentResponseToComment = (response: CommentResponse): Comment => ({
  id: response.id,
  publicationId: response.publication_id,
  parentId: response.parent_id,
  authorId: response.author_id,
  text: response.text,
  createdAt: response.created_at,
  likesCount: response.likes_count,
});

export const useComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getComment = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response: CommentResponse = await request(`/comment/${id}`, {
        method: 'GET',
      });
      return mapCommentResponseToComment(response);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateComment = async (id: string, content: string) => {
    setLoading(true);
    setError(null);
    try {
      const response: CommentResponse = await request(`/comment/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ content }),
      });
      return mapCommentResponseToComment(response);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await request(`/comment/${id}`, {
        method: 'DELETE',
      });
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const replyToComment = async (id: string, content: string) => {
    setLoading(true);
    setError(null);
    try {
      const response: CommentResponse = await request(`/comment/${id}/reply`, {
        method: 'POST',
        body: JSON.stringify({ content }),
      });
      return mapCommentResponseToComment(response);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const likeComment = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response: CommentResponse = await request(`/comment/${id}/like`, {
        method: 'POST',
      });
      return mapCommentResponseToComment(response);
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
    getComment,
    updateComment,
    deleteComment,
    replyToComment,
    likeComment,
  };
};