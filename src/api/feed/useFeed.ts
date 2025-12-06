import { useState } from 'react';
import type { FeedItem, UserRole } from './types';
import { API_BASE_URL } from '../constants';
import type { Publication } from '../publication/types';

const mockPublications: Publication[] = [
  {
    id: '1',
    authorId: '101',
    type: 'post',
    title: 'Mock Post Title',
    content: 'This is a mock post content.',
    publicationDate: '2025-12-05T10:00:00Z',
    likesCount: 10,
    commentsCount: 5,
    savedCount: 2,
    isLiked: false,
    isSaved: false,
    author: {
      id: '101',
      username: 'mockuser',
      role: 'User',
      iconUrl: '',
    },
    media: { url: 'https://st3.depositphotos.com/1005145/15351/i/450/depositphotos_153516954-stock-photo-summer-landscape-with-flowers-in.jpg' },
  },
  {
    id: '2',
    authorId: '102',
    type: 'quote',
    content: 'This is a mock quote.',
    source: 'https://example.com',
    publicationDate: '2025-12-04T15:00:00Z',
    likesCount: 20,
    commentsCount: 10,
    savedCount: 5,
    isLiked: true,
    isSaved: true,
    author: {
      id: '102',
      username: 'mockcreator',
      role: 'Expert',
      iconUrl: '',
    },
    media: undefined,
  },
  {
    id: '3',
    authorId: '102',
    type: 'article',
    title: 'Mock Article Title',
    content: 'Such a long article content to demonstrate the article type in the feed. It can span multiple lines and include various sections to provide in-depth information on a topic.',
    source: 'https://example.com',
    publicationDate: '2025-12-04T15:00:00Z',
    likesCount: 20,
    commentsCount: 10,
    savedCount: 5,
    isLiked: true,
    isSaved: true,
    author: {
      id: '102',
      username: 'mockcreator',
      role: 'Creator',
      iconUrl: '',
    },
    media: undefined,
  },
];

const getAuthToken = (): string | null => localStorage.getItem('authToken');

const request = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  // Mock request function for development
  // const token = getAuthToken();
  // const headers = {
  //   'Content-Type': 'application/json',
  //   ...(token ? { Authorization: `Bearer ${token}` } : {}),
  //   ...options.headers,
  // };

  // const res = await fetch(`${API_BASE_URL}${endpoint}`, {
  //   ...options,
  //   headers,
  // });

  // if (!res.ok) {
  //   const errorData = await res.json().catch(() => ({}));
  //   throw new Error(errorData.message || `HTTP ${res.status}`);
  // }

  // return res.json();

  // Return mock data for development
  return {};
};

const fetchMediaUrl = async (mediaId: string): Promise<string> => {
  // Mock media URL fetching for development
  // const res = await request(`/media/${mediaId}/file`, {
  //   method: 'GET',
  // });

  // return res.url;

  // Return mock media URL for development
  return `https://picsum.photos/400/300?random=${mediaId}`;
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
  author: response.author ? {
    id: response.author.id,
    username: response.author.username,
    iconUrl: response.author.icon_url,
    role: getRole(response.author.role),
  } : { id: '', username: '', iconUrl: '', role: 'User' },
});

const enrichPublication = async (publication: FeedItem) => {
  if (publication.media && publication.media[0]) {
    const mediaUrl = await fetchMediaUrl(publication.media[0].id);
    const parsedPublication = parsePublication(publication);
    return {
      ...parsedPublication,
      media: { url: mediaUrl },
    };
  }

  const parsedPublication = parsePublication(publication);

  return {
    ...parsedPublication,
  };
};

const fetchFeedWithMedia = async (endpoint: string) => {
  // Mock feed fetching for development
  // const feedResponse: FeedResponse = await request(endpoint, { method: 'GET' });

  // const enrichedPublications = await Promise.all(
  //   feedResponse.items.map((publication: FeedItem) => enrichPublication(publication))
  // );

  // return {
  //   ...feedResponse,
  //   items: enrichedPublications,
  // };

  // Return mock feed data for development
  return {
    items: mockPublications,
    total: mockPublications.length,
    limit: 10,
    offset: 0,
  };
};

export const useFeed = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFeed = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchFeedWithMedia('/feed');
      return response;
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
      return await fetchFeedWithMedia('/feed/me');
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
      return await fetchFeedWithMedia('/feed/me/saved');
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
      return await fetchFeedWithMedia(`/feed/user/${userId}`);
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