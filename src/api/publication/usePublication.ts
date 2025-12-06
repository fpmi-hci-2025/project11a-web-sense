import { useState } from 'react';
import type { Publication } from './types';
import type { Role } from '../auth/types';
import type { Comment } from '../comment/types';
import { API_BASE_URL } from '../constants';
import type { FeedItem } from '../feed/types';
import { mapUserResponse } from '../auth/useAuth';

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

const getRole = (role: Role) => {
  switch (role) {
    case 'creator':
      return 'Creator';
    case 'user':
      return 'User';
    case 'expert':
      return 'Expert';
    default:
      return 'User';
  }
};

const mapPublicationResponseToPublication = (
  response: FeedItem,
): Publication => ({
  id: response.id,
  authorId: response.author_id,
  type: response.type,
  title: response.title,
  content: response.content,
  source: response.source,
  publicationDate: response.publication_date,
  likesCount: response.likes_count || 0,
  commentsCount: response.comments_count || 0,
  savedCount: response.saved_count || 0,
  isLiked: response.is_liked || false,
  isSaved: response.is_saved || false,
  author: response.author
    ? {
        id: response.author.id,
        username: response.author.username,
        iconUrl: response.author.icon_url,
        role: getRole(response.author.role),
      }
    : { id: '', username: '', iconUrl: '', role: 'User' },
});

const fetchMediaUrl = async (mediaId: string): Promise<string> => {
  console.log('Fetching media URL for mediaId:', mediaId);
  const res = await request(`/media/${mediaId}/file`, {
    method: 'GET',
  });

  return res.url;
};

const fetchAuthorData = async (userId: string) => {
  const authorResponse = await request(`/profile/${userId}`, { method: 'GET' });
  return mapUserResponse(authorResponse);
};

const enrichPublication = async (
  publication: FeedItem,
): Promise<Publication> => {
  console.log('Enriching publication:', publication.id);
  const parsedPublication = mapPublicationResponseToPublication(publication);

  // Enrich author data
  if (parsedPublication.authorId) {
    try {
      console.log('Fetching author data for:', parsedPublication.authorId);
      const authorData = await fetchAuthorData(parsedPublication.authorId);
      parsedPublication.author = authorData;
    } catch (error) {
      console.error(
        `Failed to fetch author data for userId: ${parsedPublication.authorId}`,
        error,
      );
    }
  }

  // Enrich media data
  if (publication.media && publication.media[0]) {
    try {
      console.log('Enriching media for publication:', publication.id);
      const mediaUrl = await fetchMediaUrl(publication.media[0].id);
      return {
        ...parsedPublication,
        media: { url: mediaUrl },
      };
    } catch (error) {
      console.error(
        `Failed to fetch media for mediaId: ${publication.media[0].id}`,
        error,
      );
    }
  }

  return parsedPublication;
};

export const usePublication = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const createPublication = async (data: {
    title: string;
    content: string;
  }) => {
    setLoading(true);
    setError(false);
    try {
      const response: FeedItem = await request('/publication/create', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return await enrichPublication(response);
    } catch (err) {
      setError(true);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getPublication = async (id: string) => {
    setLoading(true);
    setError(false);
    try {
      console.log('getPublication called for id:', id);
      const response: FeedItem = await request(`/publication/${id}`, {
        method: 'GET',
      });
      console.log('Got response, enriching publication...');
      const enriched = await enrichPublication(response);
      console.log('Publication enriched successfully');
      return enriched;
    } catch (err) {
      console.error('Error in getPublication:', err);
      setError(true);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePublication = async (
    id: string,
    data: { title: string; content: string },
  ) => {
    setLoading(true);
    setError(false);
    try {
      const response: FeedItem = await request(`/publication/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      return await enrichPublication(response);
    } catch (err) {
      setError(true);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePublication = async (id: string) => {
    setLoading(true);
    setError(false);
    try {
      await request(`/publication/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      setError(true);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const likePublication = async (id: string) => {
    await request(`/publication/${id}/like`, {
      method: 'POST',
    });
  };

  const getLikes = async (id: string) => {
    await request(`/publication/${id}/likes`, {
      method: 'GET',
    });
  };

  const savePublication = async (id: string) => {
    await request(`/publication/${id}/save`, {
      method: 'POST',
    });
  };

  const getComments = async (id: string) => {
    setLoading(true);
    setError(false);

    try {
      const comments: Comment[] = await request(`/publication/${id}/comments`, {
        method: 'GET',
      });
      return comments;
    } catch (err) {
      setError(true);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createComment = async (id: string, content: string) => {
    setLoading(true);
    setError(false);

    try {
      const comment: Comment = await request(`/publication/${id}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content }),
      });

      return comment;
    } catch (err) {
      setError(true);
      console.log('Error creating comment:', err);
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
    getComments,
    createComment,
  };
};
