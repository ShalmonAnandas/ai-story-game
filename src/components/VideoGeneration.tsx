// Video generation section component

import React from 'react';
import { Button, Textarea, Spinner } from './UI';

interface VideoGenerationProps {
  videoPrompt: string;
  generatedVideoUrl: string;
  isGeneratingVideo: boolean;
  onVideoPromptChange: (value: string) => void;
  onGenerateVideo: () => void;
}

/**
 * Component for video generation and display
 */
export const VideoGeneration: React.FC<VideoGenerationProps> = ({
  videoPrompt,
  generatedVideoUrl,
  isGeneratingVideo,
  onVideoPromptChange,
  onGenerateVideo,
}) => (
  <div className="pt-8 border-t border-gray-200">
    <div className="flex items-center mb-6">
      <svg className="w-6 h-6 mr-3 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      <h3 className="text-xl font-bold text-gray-800">Video Generation</h3>
    </div>
    
    <div className="mb-6">
      <label htmlFor="video-prompt" className="flex items-center font-semibold text-gray-700 mb-4">
        <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H5a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3" />
        </svg>
        Video Style Prompt
      </label>
      <Textarea 
        value={videoPrompt}
        onChange={(e) => onVideoPromptChange(e.target.value)}
        placeholder="e.g., Cinematic style with dramatic lighting, fast cuts, and suspenseful music..."
        className="min-h-[100px]"
      />
    </div>
    
    <Button 
      onClick={onGenerateVideo} 
      disabled={isGeneratingVideo} 
      className="w-full mb-6 py-4 text-lg font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200"
    >
      {isGeneratingVideo ? (
        <div className="flex items-center justify-center">
          <Spinner />
          <span className="ml-2">Creating Video...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Generate Video
        </div>
      )}
    </Button>
    
    {generatedVideoUrl && (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-xl shadow-lg">
        <video 
          className="w-full rounded-lg shadow-lg" 
          controls 
          autoPlay 
          aria-label="Generated video based on story"
        >
          <source src={generatedVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    )}
  </div>
);