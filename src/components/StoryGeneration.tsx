// Story generation section component

import React from 'react';
import { Button, Textarea, Spinner } from './UI';
import { WordsInput } from './WordsInput';

interface StoryGenerationProps {
  words: string[];
  storyPrompt: string;
  isGeneratingStory: boolean;
  onWordChange: (index: number, value: string) => void;
  onStoryPromptChange: (value: string) => void;
  onFetchRandomWords: () => void;
  onGenerateStory: () => void;
}

/**
 * Component for the story generation section
 */
export const StoryGeneration: React.FC<StoryGenerationProps> = ({
  words,
  storyPrompt,
  isGeneratingStory,
  onWordChange,
  onStoryPromptChange,
  onFetchRandomWords,
  onGenerateStory,
}) => (
  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
    <div className="flex items-center mb-8">
      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mr-4">
        <span className="text-white font-bold text-lg">1</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Create Your Story</h2>
    </div>
    
    <WordsInput 
      words={words}
      onWordChange={onWordChange}
      onFetchRandomWords={onFetchRandomWords}
    />

    <div className="mb-8">
      <label htmlFor="story-prompt" className="flex items-center font-semibold text-gray-700 mb-4">
        <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Story Prompt
      </label>
      <Textarea 
        value={storyPrompt}
        onChange={(e) => onStoryPromptChange(e.target.value)}
        placeholder="e.g., A sci-fi thriller involving these words with unexpected plot twists..."
        className="min-h-[120px]"
      />
    </div>

    <Button 
      onClick={onGenerateStory} 
      disabled={isGeneratingStory} 
      className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
    >
      {isGeneratingStory ? (
        <div className="flex items-center justify-center">
          <Spinner />
          <span className="ml-2">Generating Story...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Generate Story
        </div>
      )}
    </Button>
  </div>
);