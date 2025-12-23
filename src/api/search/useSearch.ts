import { useState } from 'react';
import type { Publication } from '../publication/types';
import type { UserResponse } from '../auth/types';
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

const fetchMediaUrl = async (mediaId: string): Promise<string> => {
  const res = await request(`/media/${mediaId}/file`, {
    method: 'GET',
  });
  return res.url;
};

const fetchAuthorData = async (userId: string) => {
  const authorResponse = await request(`/profile/${userId}`, { method: 'GET' });
  return mapUserResponse(authorResponse);
};

const parsePublication = (response: FeedItem): Publication => ({
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
  author: response.author ? mapUserResponse(response.author) : undefined,
});

const enrichFeedItem = async (publication: FeedItem) => {
  const parsedPublication = parsePublication(publication);

  if (parsedPublication.authorId) {
    try {
      const authorData = await fetchAuthorData(parsedPublication.authorId);
      parsedPublication.author = authorData;
    } catch (error) {
      console.error(
        `Failed to fetch author data for userId: ${parsedPublication.authorId}`,
        error,
      );
    }
  }

  if (publication.media && publication.media[0]) {
    try {
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

export const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchPublications = async (query: string) => {
    setLoading(true);
    setError(false);
    try {
      const response: { items: FeedItem[] } = await request(
        `/search?q=${encodeURIComponent(query)}`,
        {
          method: 'GET',
        },
      );
      const enriched =
        response.items && response.items.length > 0
          ? await Promise.all(response.items.map(enrichFeedItem))
          : [];
      return enriched;
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async (query: string) => {
    setLoading(true);
    setError(false);
    try {
      const response: UserResponse[] = await request(
        `/search/users?q=${encodeURIComponent(query)}`,
        {
          method: 'GET',
        },
      );
      return response.map(mapUserResponse);
    } catch {
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
    } catch {
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
