// Story display and video section component

import React from 'react';
import { Spinner } from './UI';
import { VideoGeneration } from './VideoGeneration';

interface StoryDisplayProps {
  generatedStory: string;
  videoPrompt: string;
  generatedVideoUrl: string;
  isGeneratingStory: boolean;
  isGeneratingVideo: boolean;
  onVideoPromptChange: (value: string) => void;
  onGenerateVideo: () => void;
}

/**
 * Component for displaying generated story and video controls
 */
export const StoryDisplay: React.FC<StoryDisplayProps> = ({
  generatedStory,
  videoPrompt,
  generatedVideoUrl,
  isGeneratingStory,
  isGeneratingVideo,
  onVideoPromptChange,
  onGenerateVideo,
}) => (
  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
    <div className="flex items-center mb-8">
      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
        <span className="text-white font-bold text-lg">2</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Review and Visualize</h2>
    </div>
    
    <div className="mb-8">
      <label className="flex items-center font-semibold text-gray-700 mb-4">
        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        Generated Story
      </label>
      <div className="w-full min-h-[300px] p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl overflow-y-auto shadow-inner">
        {isGeneratingStory ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Spinner />
            <p className="mt-4 text-lg">✨ Crafting your story...</p>
          </div>
        ) : generatedStory ? (
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{generatedStory}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="text-lg">Your generated story will appear here...</p>
            <p className="text-sm mt-2">Fill in the words and prompt to get started! ✨</p>
          </div>
        )}
      </div>
    </div>
    
    {generatedStory && (
      <VideoGeneration
        videoPrompt={videoPrompt}
        generatedVideoUrl={generatedVideoUrl}
        isGeneratingVideo={isGeneratingVideo}
        onVideoPromptChange={onVideoPromptChange}
        onGenerateVideo={onGenerateVideo}
      />
    )}
  </div>
);