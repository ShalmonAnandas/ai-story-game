// Custom hook for managing story game state and logic

import { useState, useCallback } from 'react';
import { 
  validateStoryInputs, 
  validateVideoInputs, 
  fetchRandomWords as fetchRandomWordsUtil, 
  generateStory as generateStoryUtil,
  generateVideo as generateVideoUtil
} from '../utils';
import { UI_CONFIG } from '../constants';

/**
 * Custom hook that manages all the state and logic for the story game
 */
export const useStoryGame = () => {
  // State management
  const [apiKey, setApiKey] = useState<string>('');
  const [words, setWords] = useState<string[]>(['', '', '', '', '']);
  const [storyPrompt, setStoryPrompt] = useState<string>('');
  const [videoPrompt, setVideoPrompt] = useState<string>('');
  const [generatedStory, setGeneratedStory] = useState<string>('');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string>('');
  const [isGeneratingStory, setIsGeneratingStory] = useState<boolean>(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles changes to individual word inputs
   */
  const handleWordChange = useCallback((index: number, value: string): void => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);
  }, [words]);

  /**
   * Fetches random words from the API
   */
  const fetchRandomWords = useCallback(async (): Promise<void> => {
    try {
      const randomWords = await fetchRandomWordsUtil();
      setWords(randomWords);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }, []);

  /**
   * Generates a story using the Gemini API
   */
  const handleGenerateStory = useCallback(async (): Promise<void> => {
    const validationError = validateStoryInputs(apiKey, words, storyPrompt);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsGeneratingStory(true);
    setError(null);
    setGeneratedStory('');

    try {
      const story = await generateStoryUtil(apiKey, words, storyPrompt, UI_CONFIG.TEMPERATURE);
      setGeneratedStory(story);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsGeneratingStory(false);
    }
  }, [apiKey, words, storyPrompt]);

  /**
   * Generates a video based on the story
   */
  const handleGenerateVideo = useCallback(async (): Promise<void> => {
    const validationError = validateVideoInputs(generatedStory, videoPrompt);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsGeneratingVideo(true);
    setError(null);
    setGeneratedVideoUrl('');

    try {
      const videoUrl = await generateVideoUtil(
        generatedStory, 
        videoPrompt, 
        UI_CONFIG.VIDEO_GENERATION_DELAY
      );
      setGeneratedVideoUrl(videoUrl);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsGeneratingVideo(false);
    }
  }, [generatedStory, videoPrompt]);

  return {
    // State
    apiKey,
    words,
    storyPrompt,
    videoPrompt,
    generatedStory,
    generatedVideoUrl,
    isGeneratingStory,
    isGeneratingVideo,
    error,
    
    // Actions
    setApiKey,
    setStoryPrompt,
    setVideoPrompt,
    handleWordChange,
    fetchRandomWords,
    handleGenerateStory,
    handleGenerateVideo,
  };
};