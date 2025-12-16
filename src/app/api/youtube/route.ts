import { NextResponse } from 'next/server';
import { YOUTUBE_API_BASE_URL, YOUTUBE_SEARCH_PARAMS } from '@/utils/youtube-config';

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'YouTube API key not configured' },
        { status: 500 }
      );
    }

    // Build query parameters
    const params = new URLSearchParams({
      part: YOUTUBE_SEARCH_PARAMS.part,
      q: YOUTUBE_SEARCH_PARAMS.q,
      type: YOUTUBE_SEARCH_PARAMS.type,
      maxResults: YOUTUBE_SEARCH_PARAMS.maxResults.toString(),
      order: YOUTUBE_SEARCH_PARAMS.order,
      safeSearch: YOUTUBE_SEARCH_PARAMS.safeSearch,
      relevanceLanguage: YOUTUBE_SEARCH_PARAMS.relevanceLanguage,
      videoDuration: YOUTUBE_SEARCH_PARAMS.videoDuration,
      key: apiKey,
    });

    // Fetch from YouTube API
    const response = await fetch(
      `${YOUTUBE_API_BASE_URL}/search?${params.toString()}`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 86400 }, // Cache for 24 hours
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: 'Failed to fetch videos', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('YouTube API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
