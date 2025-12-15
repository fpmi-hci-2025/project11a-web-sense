import { useCallback, useState } from 'react';
import type {
  CreatePublicationData,
  Publication,
  Comment,
  CommentsResponse,
} from './types';
import type { Role, UserResponse } from '../auth/types';
import { API_BASE_URL } from '../constants';
import type { FeedItem } from '../feed/types';
import { mapUserResponse } from '../auth/useAuth';

const getAuthToken = (): string | null => localStorage.getItem('authToken');

const request = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();

  const headers: Record<string, string> = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
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

const enrichCommentWithAuthor = async (comment: Comment): Promise<Comment> => {
  if (comment.author) {
    if (comment.author.iconUrl && !comment.author.iconUrl.startsWith('http')) {
      try {
        const mediaResponse = await request(
          `/media/${comment.author.iconUrl}/file`,
          { method: 'GET' },
        );
        return {
          ...comment,
          author: {
            ...comment.author,
            iconUrl: mediaResponse.url,
          },
        };
      } catch (error) {
        console.error(
          `Failed to fetch avatar for comment author ${comment.authorId}`,
          error,
        );
        return comment;
      }
    }
    return comment;
  }

  try {
    const authorData = await fetchAuthorData(comment.authorId);
    return {
      ...comment,
      author: authorData,
    };
  } catch (error) {
    console.error(
      `Failed to fetch author data for comment ${comment.id}`,
      error,
    );
    return comment;
  }
};

const enrichCommentsWithAuthors = async (
  comments: Comment[],
): Promise<Comment[]> => {
  if (!comments || comments.length === 0) return [];
  return await Promise.all(comments.map(enrichCommentWithAuthor));
};

const mapComments = (response: CommentsResponse): Comment[] => {
  return response.items.map((item) => ({
    id: item.id,
    publicationId: item.publication_id,
    parentId: item.parent_id || null,
    authorId: item.author_id,
    text: item.text,
    createdAt: item.created_at,
    likesCount: item.likes_count,
    isLiked: item.is_liked,
    author: item.author
      ? {
          id: item.author.id,
          username: item.author.username,
          email: item.author.email,
          phone: item.author.phone,
          iconUrl: item.author.icon_url,
          description: item.author.description,
          role: item.author.role as UserResponse['role'],
          registeredAt: item.author.registered_at,
          statistic: item.author.statistic,
        }
      : undefined,
  }));
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

const enrichPublication = async (
  publication: FeedItem,
): Promise<Publication> => {
  console.log('Enriching publication:', publication.id);
  const parsedPublication = mapPublicationResponseToPublication(publication);

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

  const uploadMedia = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      throw new Error('Invalid file type');
    }

    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File is too large (max 10MB)');
    }

    const formData = new FormData();
    formData.append('file', file);

    return request('/media/upload', {
      method: 'POST',
      body: formData,
    });
  };

  const createPublication = useCallback(async (data: CreatePublicationData) => {
    setLoading(true);
    setError(false);

    try {
      let mediaId: string | undefined;

      if (data.type === 'post' && data.image) {
        mediaId = await uploadMedia(data.image);
      }

      const payload = {
        type: data.type,
        title: data.title,
        content: data.content,
        description: data.description,
        source: data.source,
        mediaId: data.type === 'post' ? mediaId : undefined,
        visibility: 'public',
      };

      const response: FeedItem = await request('/publication/create', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      return await enrichPublication(response);
    } catch (err) {
      setError(true);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPublication = useCallback(async (id: string) => {
    setLoading(true);
    setError(false);
    try {
      const response: FeedItem = await request(`/publication/${id}`, {
        method: 'GET',
      });
      const enriched = await enrichPublication(response);
      return enriched;
    } catch (err) {
      setError(true);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePublication = useCallback(
    async (id: string, data: { title: string; content: string }) => {
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
    },
    [],
  );

  const deletePublication = useCallback(async (id: string) => {
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
  }, []);

  const likePublication = useCallback(async (id: string) => {
    await request(`/publication/${id}/like`, {
      method: 'POST',
    });
  }, []);

  const getLikes = useCallback(async (id: string) => {
    await request(`/publication/${id}/likes`, {
      method: 'GET',
    });
  }, []);

  const savePublication = useCallback(async (id: string) => {
    await request(`/publication/${id}/save`, {
      method: 'POST',
    });
  }, []);

  const getComments = useCallback(async (id: string) => {
    setLoading(true);
    setError(false);

    try {
      const response: CommentsResponse = await request(
        `/publication/${id}/comments`,
        {
          method: 'GET',
        },
      );

      if (response.items === null) return null;

      const comments = mapComments(response);
      return await enrichCommentsWithAuthors(comments);
    } catch (err) {
      setError(true);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createComment = useCallback(async (id: string, content: string) => {
    setLoading(true);
    setError(false);

    try {
      const commentResponse = await request(`/publication/${id}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content }),
      });

      const comment: Comment = {
        id: commentResponse.id,
        publicationId: commentResponse.publication_id,
        parentId: commentResponse.parent_id || null,
        authorId: commentResponse.author_id,
        text: commentResponse.text,
        createdAt: commentResponse.created_at,
        likesCount: commentResponse.likes_count,
        isLiked: commentResponse.is_liked,
        author: commentResponse.author
          ? {
              id: commentResponse.author.id,
              username: commentResponse.author.username,
              email: commentResponse.author.email,
              phone: commentResponse.author.phone,
              iconUrl: commentResponse.author.icon_url,
              description: commentResponse.author.description,
              role: commentResponse.author.role as UserResponse['role'],
              registeredAt: commentResponse.author.registered_at,
            }
          : undefined,
      };

      const enrichedComment = await enrichCommentWithAuthor(comment);
      return enrichedComment;
    } catch (err) {
      setError(true);
      console.log('Error creating comment:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

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
