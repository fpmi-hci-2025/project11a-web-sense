export interface CommentResponse {
  id: string;
  publication_id: string;
  parent_id: string | null;
  author_id: string;
  text: string;
  created_at: string;
  likes_count: number;
}

export interface Comment {
  id: string;
  publicationId: string;
  parentId: string | null;
  authorId: string;
  text: string;
  createdAt: string;
  likesCount: number;
}