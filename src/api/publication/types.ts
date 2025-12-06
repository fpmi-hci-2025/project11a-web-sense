type UserRole = 'Creator' | 'User' | 'Expert';

type Media = {
  url: string;
}

type Author = {
  id: string;
  username?: string;
  iconUrl?: string;
  role: UserRole;
}

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
  author: Author;
  media?: Media;
}