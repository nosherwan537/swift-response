// YouTube API Configuration
export const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Search parameters for emergency safety videos
export const YOUTUBE_SEARCH_PARAMS = {
  part: 'snippet',
  q: 'emergency safety tips disaster preparedness first aid Pakistan',
  type: 'video',
  maxResults: 6,
  order: 'relevance',
  safeSearch: 'strict',
  relevanceLanguage: 'en',
  videoDuration: 'medium', // 4-20 minutes
};

// TypeScript Interfaces for YouTube API Response
export interface YouTubeVideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    high: { url: string; width: number; height: number };
  };
  channelTitle: string;
}

export interface YouTubeVideo {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: YouTubeVideoSnippet;
}

export interface YouTubeApiResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeVideo[];
}
