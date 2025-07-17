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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 font-sans text-gray-800">
      <div className="container mx-auto p-4 md:p-8">
        
        {/* Header */}
        <header className="text-center mb-12">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mb-4 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">
            AI Story Game
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            ✨ Craft creative prompts to generate unique stories and videos with AI magic
          </p>
        </header>

        {/* API Key Configuration */}
        <div className="max-w-2xl mx-auto mb-12">
          <APIKeyConfig 
            apiKey={apiKey}
            onApiKeyChange={setApiKey}
          />
        </div>

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