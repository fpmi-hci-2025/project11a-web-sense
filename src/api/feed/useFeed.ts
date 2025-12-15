import { useCallback, useState } from 'react';
import type { Feed, FeedItem, FeedResponse } from './types';
import { API_BASE_URL } from '../constants';
import type { Publication } from '../publication/types';
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

const enrichFeed = async (feed: FeedResponse): Promise<Feed> => {
  const items =
    feed.items && feed.items.length > 0
      ? await Promise.all(feed.items.map(enrichFeedItem))
      : [];
  return { ...feed, items };
};

export const useFeed = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getFeed = useCallback(
    async (limit?: number, offset?: number): Promise<Feed> => {
      setLoading(true);
      setError(false);
      try {
        const params = new URLSearchParams();
        if (limit !== undefined) params.append('limit', limit.toString());
        if (offset !== undefined) params.append('offset', offset.toString());

        const queryString = params.toString();
        const endpoint = queryString ? `/feed?${queryString}` : '/feed';

        console.log('getFeed request:', { endpoint, limit, offset });
        const feedResponse = await request(endpoint, { method: 'GET' });
        console.log('getFeed response:', {
          itemsCount: feedResponse.items?.length || 0,
          total: feedResponse.total,
          limit,
          offset,
        });

        const enrichedFeed = await enrichFeed(feedResponse);
        console.log('getFeed enriched:', {
          itemsCount: enrichedFeed.items?.length || 0,
          total: enrichedFeed.total,
        });

        return enrichedFeed;
      } catch (err) {
        console.error('getFeed error:', err);
        setError(true);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const getMyPublications = useCallback(
    async (limit?: number, offset?: number): Promise<Feed> => {
      setLoading(true);
      setError(false);
      try {
        const params = new URLSearchParams();
        if (limit !== undefined) params.append('limit', limit.toString());
        if (offset !== undefined) params.append('offset', offset.toString());

        const queryString = params.toString();
        const endpoint = queryString ? `/feed/me?${queryString}` : '/feed/me';

        const response = await request(endpoint, { method: 'GET' });
        return enrichFeed(response);
      } catch (err) {
        setError(true);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const getSavedPublications = useCallback(
    async (limit?: number, offset?: number): Promise<Feed> => {
      setLoading(true);
      setError(false);
      try {
        const params = new URLSearchParams();
        if (limit !== undefined) params.append('limit', limit.toString());
        if (offset !== undefined) params.append('offset', offset.toString());

        const queryString = params.toString();
        const endpoint = queryString
          ? `/feed/me/saved?${queryString}`
          : '/feed/me/saved';

        const response = await request(endpoint, { method: 'GET' });
        return enrichFeed(response);
      } catch (err) {
        setError(true);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const getUserPublications = useCallback(
    async (userId: string, limit?: number, offset?: number): Promise<Feed> => {
      setLoading(true);
      setError(false);
      try {
        const params = new URLSearchParams();
        if (limit !== undefined) params.append('limit', limit.toString());
        if (offset !== undefined) params.append('offset', offset.toString());

        const queryString = params.toString();
        const endpoint = queryString
          ? `/feed/user/${userId}?${queryString}`
          : `/feed/user/${userId}`;

        const response = await request(endpoint, { method: 'GET' });
        return enrichFeed(response);
      } catch (err) {
        setError(true);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    loading,
    error,
    getFeed,
    getMyPublications,
    getSavedPublications,
    getUserPublications,
  };
};
