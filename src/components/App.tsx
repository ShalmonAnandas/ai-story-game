// Main App component

import React from 'react';
import { useStoryGame } from '../hooks/useStoryGame';
import { APIKeyConfig } from './APIKeyConfig';
import { StoryGeneration } from './StoryGeneration';
import { StoryDisplay } from './StoryDisplay';
import { ErrorMessage } from './UI';

/**
 * Main application component for the AI Story Game
 */
export const App: React.FC = () => {
  const {
    apiKey,
    words,
    storyPrompt,
    videoPrompt,
    generatedStory,
    generatedVideoUrl,
    isGeneratingStory,
    isGeneratingVideo,
    error,
    setApiKey,
    setStoryPrompt,
    setVideoPrompt,
    handleWordChange,
    fetchRandomWords,
    handleGenerateStory,
    handleGenerateVideo,
  } = useStoryGame();

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <div className="container mx-auto p-4 md:p-8">
        
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
            Prompt Engineering Game
          </h1>
          <p className="text-lg text-gray-600">
            Craft prompts to generate unique stories and videos.
          </p>
        </header>

        {/* API Key Configuration */}
        <APIKeyConfig 
          apiKey={apiKey}
          onApiKeyChange={setApiKey}
        />

        {/* Error Display */}
        {error && <ErrorMessage message={error} />}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Story Generation Section */}
          <StoryGeneration
            words={words}
            storyPrompt={storyPrompt}
            isGeneratingStory={isGeneratingStory}
            onWordChange={handleWordChange}
            onStoryPromptChange={setStoryPrompt}
            onFetchRandomWords={fetchRandomWords}
            onGenerateStory={handleGenerateStory}
          />

          {/* Story Display and Video Section */}
          <StoryDisplay
            generatedStory={generatedStory}
            videoPrompt={videoPrompt}
            generatedVideoUrl={generatedVideoUrl}
            isGeneratingStory={isGeneratingStory}
            isGeneratingVideo={isGeneratingVideo}
            onVideoPromptChange={setVideoPrompt}
            onGenerateVideo={handleGenerateVideo}
          />
        </div>
      </div>
    </div>
  );
};

export default App;