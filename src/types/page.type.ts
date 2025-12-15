/* eslint-disable @typescript-eslint/no-explicit-any */
// Facebook Page API Response Types

export interface PageUser {
  id: string;
  userId: string;
  email: string;
  image: string;
  name: string;
  nidFont: string;
  nidBack: string;
  accessToken: string;
  status: 'PENDING' | 'ACCEPT' | 'REJECT';
  tokenExpiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryItem {
  id: string;
  name: string;
}

export interface Location {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
}

export interface Cover {
  cover_id: string;
  offset_x: number;
  offset_y: number;
  source: string;
  id: string;
}

export interface PictureData {
  height: number;
  is_silhouette: boolean;
  url: string;
  width: number;
}

export interface Picture {
  data: PictureData;
}

export interface FacebookPageData {
  id: string;
  name: string;
  about?: string;
  category: string;
  category_list: CategoryItem[];
  fan_count: number;
  followers_count: number;
  phone?: string;
  website?: string;
  emails?: string[];
  location?: Location;
  cover?: Cover;
  picture?: Picture;
  link: string;
  verification_status: string;
  is_published: boolean;
  is_verified: boolean;
  can_post: boolean;
  talking_about_count: number;
  rating_count: number;
  overall_star_rating: number;
  is_permanently_closed: boolean;
  is_always_open: boolean;
  temporary_status: string;
  single_line_address?: string;
  checkins: number;
  were_here_count: number;
}

export interface FacebookError {
  status: number;
  message: string;
  code: number;
  type: string;
}

export interface InsightValue {
  value: number | string | Record<string, any>;
  end_time: string;
}

export interface InsightMetric {
  name: string;
  period: 'day' | 'week' | 'days_28' | 'lifetime';
  values: InsightValue[];
  title: string;
  description: string;
  id: string;
}

export interface PagingInfo {
  previous?: string;
  next?: string;
}

export interface FacebookInsightsData {
  data: InsightMetric[];
  paging?: PagingInfo;
}

export interface TPage {
  id: string;
  name: string;
  category: string;
  pageId: string;
  accessToken: string;
  status: 'PENDING' | 'ACCEPT' | 'REJECT';
  tokenExpiresAt: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: PageUser;
  facebookData: FacebookPageData | null;
  facebookError: FacebookError | null;
  facebookInsightsData: FacebookInsightsData | null;
  facebookInsightsError: FacebookError | null;
}

export interface PaginationMeta {
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

export interface PageListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  meta: PaginationMeta;
  data: TPage[];
}

export interface SinglePageResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: TPage;
}

// Facebook Post Types
export interface PostImage {
  height: number;
  src: string;
  width: number;
}

export interface PostMedia {
  image: PostImage;
}

export interface PostTarget {
  id: string;
  url: string;
}

export interface PostSubAttachment {
  media: PostMedia;
  target: PostTarget;
  type: string;
  url: string;
}

export interface PostSubAttachments {
  data: PostSubAttachment[];
}

export interface PostAttachment {
  media?: PostMedia;
  subattachments?: PostSubAttachments;
  target: PostTarget;
  title?: string;
  type: string;
  url: string;
}

export interface PostAttachments {
  data: PostAttachment[];
}

export interface PostCommentsSummary {
  order: string;
  total_count: number;
  can_comment: boolean;
}

export interface PostComments {
  data: any[];
  summary: PostCommentsSummary;
}

export interface PostLikesSummary {
  total_count: number;
  can_like: boolean;
  has_liked: boolean;
}

export interface PostLikes {
  data: any[];
  summary: PostLikesSummary;
}

export interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  permalink_url: string;
  full_picture?: string;
  attachments?: PostAttachments;
  comments: PostComments;
  likes: PostLikes;
}

// Specific Insights Metric Types for easier access
export interface PageFansCountry {
  [countryCode: string]: number;
}

export interface PageFansCity {
  [cityName: string]: number;
}

export interface PageFansLocale {
  [localeCode: string]: number;
}

export interface PageReactions {
  like: number;
  love: number;
  wow: number;
  haha: number;
  sorry: number;
  anger: number;
}

// Helper type for extracting specific metric values
export type InsightMetricValue<T = any> = {
  value: T;
  end_time: string;
};

// Example usage helper types
export type PageImpressionsMetric = InsightMetric & {
  name: 'page_impressions' | 'page_impressions_unique' | 'page_impressions_paid' | 'page_impressions_organic';
  values: InsightMetricValue<number>[];
};

export type PageFansCountryMetric = InsightMetric & {
  name: 'page_fans_country';
  values: InsightMetricValue<PageFansCountry>[];
};

export type PageFansCityMetric = InsightMetric & {
  name: 'page_fans_city';
  values: InsightMetricValue<PageFansCity>[];
};

export type PageReactionsMetric = InsightMetric & {
  name: 'page_actions_post_reactions_total';
  values: InsightMetricValue<PageReactions>[];
};