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
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">1. Create Your Story</h2>
    
    <WordsInput 
      words={words}
      onWordChange={onWordChange}
      onFetchRandomWords={onFetchRandomWords}
    />

    <div className="mb-6">
      <label htmlFor="story-prompt" className="font-semibold text-gray-700 mb-3 block">
        Story Prompt
      </label>
      <Textarea 
        value={storyPrompt}
        onChange={(e) => onStoryPromptChange(e.target.value)}
        placeholder="e.g., A sci-fi thriller involving these words."
      />
    </div>

    <Button 
      onClick={onGenerateStory} 
      disabled={isGeneratingStory} 
      className="w-full"
    >
      {isGeneratingStory ? <Spinner /> : 'Generate Story'}
    </Button>
  </div>
);