export type PublicationType = 'Post' | 'Article' | 'Creator';

export interface PublicationResponse {
  id: string;
  authorId: string;
  type: PublicationType;
  title?: string;
  content?: string;
  source?: string;
  publicationDate: string;
  likes_count: number;
  comments_count: number;
  saved_count: number;
  is_liked: boolean;
  is_saved: boolean;
}

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
}