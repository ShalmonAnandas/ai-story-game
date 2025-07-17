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
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">2. Review and Visualize</h2>
    
    <div className="mb-6">
      <label className="font-semibold text-gray-700 mb-3 block">
        Generated Story
      </label>
      <div className="w-full h-64 p-4 bg-gray-100 border border-gray-200 rounded-lg overflow-y-auto">
        {isGeneratingStory ? (
          <Spinner />
        ) : generatedStory ? (
          <p className="text-gray-800 whitespace-pre-wrap">{generatedStory}</p>
        ) : (
          <p className="text-gray-500">Your generated story will appear here...</p>
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