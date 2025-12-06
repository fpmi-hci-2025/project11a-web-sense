import { useState } from 'react';
import type { Publication } from './types';
import type { User } from '../auth/types';
import type { Comment } from '../comment/types';
import { API_BASE_URL } from '../constants';
import type { FeedItem, UserRole } from '../feed/types';

// Mock comments data for development
const mockComments: Comment[] = [
  {
    id: 'comment-1',
    publicationId: '1',
    parentId: null,
    authorId: 'user-101',
    text: 'This is a great publication! Really insightful content.',
    createdAt: '2025-12-06T10:30:00Z',
    likesCount: 5,
  },
  {
    id: 'comment-2',
    publicationId: '1',
    parentId: null,
    authorId: 'user-102',
    text: 'I completely agree with your perspective. Well written!',
    createdAt: '2025-12-06T11:15:00Z',
    likesCount: 3,
  },
  {
    id: 'comment-3',
    publicationId: '2',
    parentId: null,
    authorId: 'user-103',
    text: 'Interesting take on this topic. Thanks for sharing!',
    createdAt: '2025-12-05T14:20:00Z',
    likesCount: 2,
  },
];

const mockPublication: Publication = {
  id: '1',
  authorId: 'mock-author-id',
  type: 'article',
  title: 'Mock Publication Title',
  content: 'This is mock content for development purposes. The actual API call is commented out below.',
  source: 'Mock Source',
  publicationDate: new Date().toISOString(),
  likesCount: 42,
  commentsCount: 15,
  savedCount: 8,
  isLiked: false,
  isSaved: false,
  author: {
    id: 'mock-author-id',
    username: 'MockAuthor',
    iconUrl: '',
    role: 'Creator'
  }
};

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

const getRole = (role: UserRole) => {
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
  response: FeedItem
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
  author: response.author ? {
    id: response.author.id,
    username: response.author.username,
    iconUrl: response.author.icon_url,
    role: getRole(response.author.role),
  } : { id: '', username: '', iconUrl: '', role: 'User' },
});

export const usePublication = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPublication = async (data: { title: string; content: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response: FeedItem = await request('/publication/create', {
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
    // setLoading(true);
    // setError(null);
    // try {
    //   const response: FeedItem = await request(`/publication/${id}`, {
    //     method: 'GET',
    //   });
    //   return mapPublicationResponseToPublication(response);
    // } catch (err: any) {
    //   setError(err.message);
    //   throw err;
    // } finally {
    //   setLoading(false);
    // }

    // Mock publication data for development

    // Mock response for development
    return mockPublication;
  };

  const updatePublication = async (
    id: string,
    data: { title: string; content: string }
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response: FeedItem = await request(`/publication/${id}`, {
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
    // setLoading(true);
    // setError(null);
    try {
      const response: FeedItem = await request(`/publication/${id}/like`, {
        method: 'POST',
      });
      return mapPublicationResponseToPublication(response);
    } catch (err: any) {
      // setError(err.message);
      throw err;
    } finally {
      // setLoading(false);
    }
  };

  const getLikes = async (id: string) => {
    // setLoading(true);
    // setError(null);
    try {
      const likes: User[] = await request(`/publication/${id}/likes`, {
        method: 'GET',
      });
      return likes;
    } catch (err: any) {
      // setError(err.message);
      throw err;
    } finally {
      // setLoading(false);
    }
  };

  const savePublication = async (id: string) => {
    // setLoading(true);
    // setError(null);
    try {
      const response: FeedItem = await request(`/publication/${id}/save`, {
        method: 'POST',
      });
      return mapPublicationResponseToPublication(response);
    } catch (err: any) {
      // setError(err.message);
      throw err;
    } finally {
      // setLoading(false);
    }
  };

  const getComments = async (id: string) => {
    // setLoading(true);
    // setError(null);
    // try {
    //   const comments: Comment[] = await request(`/publication/${id}/comments`, {
    //     method: 'GET',
    //   });
    //   return comments;
    // } catch (err: any) {
    //   setError(err.message);
    //   throw err;
    // } finally {
    //   setLoading(false);
    // }

    // Mock comments for development - return comments for the specific publication
    return mockComments;
  };

  const createComment = async (id: string, content: string) => {
    // setLoading(true);
    // setError(null);
    // try {
    //   const comment: Comment = await request(`/publication/${id}/comments`, {
    //     method: 'POST',
    //     body: JSON.stringify({ content }),
    //   });
    //   return comment;
    // } catch (err: any) {
    //   setError(err.message);
    //   throw err;
    // } finally {
    //   setLoading(false);
    // }

    // Mock comment creation for development
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      publicationId: id,
      parentId: null,
      authorId: 'mock-user-id', // Use the mock user ID from auth
      text: content,
      createdAt: new Date().toISOString(),
      likesCount: 0,
    };

    return newComment;
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