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
  <>
    <div className="mb-6">
      <label htmlFor="video-prompt" className="font-semibold text-gray-700 mb-3 block">
        Video Prompt
      </label>
      <Textarea 
        value={videoPrompt}
        onChange={(e) => onVideoPromptChange(e.target.value)}
        placeholder="e.g., Cyberpunk style, fast cuts, suspenseful mood."
      />
    </div>
    
    <Button 
      onClick={onGenerateVideo} 
      disabled={isGeneratingVideo} 
      className="w-full mb-4"
    >
      {isGeneratingVideo ? <Spinner /> : 'Generate Video'}
    </Button>

    {isGeneratingVideo && (
      <div className="mb-4">
        <Spinner />
      </div>
    )}
    
    {generatedVideoUrl && (
      <div className="mt-4">
        <video 
          className="w-full rounded-lg" 
          controls 
          autoPlay 
          aria-label="Generated video based on story"
        >
          <source src={generatedVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    )}
  </>
);