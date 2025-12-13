import type { Role, User } from '../auth/types';
import type { UserResponse } from '../auth/types';

type Media = {
  url: string;
};

type Author = {
  id: string;
  username?: string;
  iconUrl?: string;
  role: Role;
};

export type PublicationType = 'post' | 'article' | 'quote';

export interface Publication {
  id: string;
  authorId: string;
  type: PublicationType;
  title?: string;
  content?: string;
  source?: string;
  publicationDate: string;
  likesCount: number;
  commentsCount: number;
  savedCount: number;
  isLiked: boolean;
  isSaved: boolean;
  author?: Author;
  media?: Media;
}

export type CreatePublicationData = {
  type: PublicationType;
  title?: string;
  content?: string;
  description?: string;
  source?: string;
  image?: File | null;
};

export interface Comment {
  id: string;
  publicationId: string;
  parentId?: string | null;
  authorId: string;
  text: string;
  createdAt: string;
  likesCount: number;
  author?: User;
  isLiked?: boolean;
}

export interface CommentResponse {
  id: string;
  publication_id: string;
  parent_id?: string | null;
  author_id: string;
  text: string;
  created_at: string;
  likes_count: number;
  author?: UserResponse;
  is_liked?: boolean;
}

export type CommentsResponse = {
  items: CommentResponse[];
  total: number;
  limit: number;
  offset: number;
};
