type FeedItemType = 'quote' | 'post' | 'article';
type Visibility = 'public' | 'private' | 'community';
export type UserRole = 'reader' | 'creator' | 'user' | 'expert' | 'super';

type Statistic = {
    publications_count: number;
    followers_count: number;
    following_count: number;
    likes_received: number;
}

export type Author = {
    id: string;
    username: string;
    email: string;
    phone: string;
    icon_url: string;
    description: string;
    role: UserRole;
    registered_at: string;
    statistic: Statistic;
}

export type Media = {
    id: string;
    owner_id: string;
    filename: string;
    mime: string;
    width: number;
    height: number;
    created_at: string;
}

export interface FeedItem {
    id: string;
    title?: string;
    author_id: string;
    type: FeedItemType;
    content?: string;
    source?: string;
    publication_date: string;
    visibility: Visibility;
    likes_count?: number;
    comments_count?: number;
    saved_count?: number;
    author?: Author;
    media?: Media[];
    is_liked?: boolean,
    is_saved?: boolean,
}

export interface FeedSuccessfulResponse {
    items: FeedItem[];
    total: number;
    limit: number;
    offset: number;
}

export interface FeedErrorResponse {
    error: string;
    message: string;
    details: string;
}

export type FeedResponse = FeedSuccessfulResponse;