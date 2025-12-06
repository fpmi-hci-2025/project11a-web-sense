import type { UserResponse } from "../auth/types";
import type { Publication } from "../publication/types";

type FeedItemType = 'quote' | 'post' | 'article';
type Visibility = 'public' | 'private' | 'community';


export type MediaResponse = {
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
    author_id: string;
    type: FeedItemType;
    publication_date: string;
    visibility: Visibility;
    title?: string;
    content?: string;
    source?: string;
    likes_count?: number;
    comments_count?: number;
    saved_count?: number;
    author?: UserResponse;
    media?: MediaResponse[];
    is_liked?: boolean,
    is_saved?: boolean,
}

export interface FeedResponse {
    items: FeedItem[];
    total: number;
    limit: number;
    offset: number;
}

export type Feed = {
    items: Publication[];
    total: number;
    limit: number;
    offset: number;
}