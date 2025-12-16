'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { type YouTubeApiResponse } from '@/utils/youtube-config';
import { Play, X, AlertCircle, RefreshCw } from 'lucide-react';

export default function SafetyVideosSection() {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  // Fetch YouTube videos
  const { data, isLoading, isError, error, refetch } = useQuery<YouTubeApiResponse>({
    queryKey: ['safety-videos'],
    queryFn: async () => {
      const response = await fetch('/api/youtube');
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      return response.json();
    },
    staleTime: 86400000, // 24 hours
  });

  // Close video modal
  const closeModal = () => {
    setSelectedVideoId(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="py-20 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 w-96 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 w-full max-w-2xl bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-5 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (isError) {
    return (
      <section className="py-20 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to Load Videos</h3>
            <p className="text-gray-600 mb-6">
              {error instanceof Error ? error.message : 'An error occurred'}
            </p>
            <button
              onClick={() => refetch()}
              className="bg-[#008C5A] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#006B47] transition-colors duration-300 inline-flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  const videos = data?.items || [];

  return (
    <>
      <section className="py-20 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Guidance for Public
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Safety tips and how to respond in emergency situations
            </p>
          </div>

          {/* Videos Grid */}
          {videos.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Videos Available</h3>
              <p className="text-gray-500">Check back later for safety guidance videos</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {videos.map((video) => (
                <div
                  key={video.id.videoId}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-[#008C5A]/20 cursor-pointer"
                  onClick={() => setSelectedVideoId(video.id.videoId)}
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={video.snippet.thumbnails.medium.url}
                      alt={video.snippet.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-[#008C5A] ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-4">
                    <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#008C5A] transition-colors">
                      {video.snippet.title}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {video.snippet.channelTitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideoId && (
        <div
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Close video"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* YouTube Embed */}
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
