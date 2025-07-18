// Custom hook for managing story game state and logic

import { useState, useCallback } from 'react';
import { 
  validateStoryInputs, 
  validateImageInputs, 
  fetchRandomWords as fetchRandomWordsUtil, 
  generateStory as generateStoryUtil,
  generateImagesForStory as generateImagesForStoryUtil
} from '../utils';
import { UI_CONFIG } from '../constants';
import type { GeneratedImage } from '../types';

/**
 * Custom hook that manages all the state and logic for the story game
 */
export const useStoryGame = () => {
  // State management
  const [apiKey, setApiKey] = useState<string>('');
  const [words, setWords] = useState<string[]>(['', '', '', '', '']);
  const [storyPrompt, setStoryPrompt] = useState<string>('');
  const [imagePrompt, setImagePrompt] = useState<string>('');
  const [generatedStory, setGeneratedStory] = useState<string>('');
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isGeneratingStory, setIsGeneratingStory] = useState<boolean>(false);
  const [isGeneratingImages, setIsGeneratingImages] = useState<boolean>(false);
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
    setGeneratedImages([]); // Clear any existing images

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
   * Generates images based on the story sentences
   */
  const handleGenerateImages = useCallback(async (): Promise<void> => {
    const validationError = validateImageInputs(generatedStory, imagePrompt);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsGeneratingImages(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const images = await generateImagesForStoryUtil(
        apiKey,
        generatedStory, 
        imagePrompt
      );
      setGeneratedImages(images);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsGeneratingImages(false);
    }
  }, [apiKey, generatedStory, imagePrompt]);

  return {
    // State
    apiKey,
    words,
    storyPrompt,
    imagePrompt,
    generatedStory,
    generatedImages,
    isGeneratingStory,
    isGeneratingImages,
    error,
    
    // Actions
    setApiKey,
    setStoryPrompt,
    setImagePrompt,
    handleWordChange,
    fetchRandomWords,
    handleGenerateStory,
    handleGenerateImages,
  };
};