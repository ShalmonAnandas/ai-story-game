// Utility functions for the AI Story Game

import { API_ENDPOINTS, VALIDATION_MESSAGES } from '../constants';
import type { GeminiAPIRequest, GeminiAPIResponse, APIError } from '../types';

/**
 * Validates if all required fields are filled for story generation
 */
export const validateStoryInputs = (
  apiKey: string,
  words: string[],
  storyPrompt: string
): string | null => {
  if (!apiKey.trim()) {
    return VALIDATION_MESSAGES.API_KEY_REQUIRED;
  }
  if (words.some(word => word.trim() === '')) {
    return VALIDATION_MESSAGES.WORDS_REQUIRED;
  }
  if (!storyPrompt.trim()) {
    return VALIDATION_MESSAGES.STORY_PROMPT_REQUIRED;
  }
  return null;
};

/**
 * Validates if all required fields are filled for video generation
 */
export const validateVideoInputs = (
  generatedStory: string,
  videoPrompt: string
): string | null => {
  if (!generatedStory) {
    return VALIDATION_MESSAGES.STORY_REQUIRED_FOR_VIDEO;
  }
  if (!videoPrompt.trim()) {
    return VALIDATION_MESSAGES.VIDEO_PROMPT_REQUIRED;
  }
  return null;
};

/**
 * Fetches random words from the API
 */
export const fetchRandomWords = async (): Promise<string[]> => {
  try {
    const response = await fetch(API_ENDPOINTS.RANDOM_WORDS);
    if (!response.ok) {
      throw new Error(VALIDATION_MESSAGES.RANDOM_WORDS_FETCH_ERROR);
    }
    const data = await response.json();
    return data as string[];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(VALIDATION_MESSAGES.UNKNOWN_ERROR);
  }
};

/**
 * Generates a story using the Gemini API
 */
export const generateStory = async (
  apiKey: string,
  words: string[],
  storyPrompt: string,
  temperature: number = 0.8
): Promise<string> => {
  const systemPrompt = `Write a 500-1000 word story using these five words: ${words.join(', ')}. The story should follow this prompt: "${storyPrompt}". Include vivid descriptions and dialogue.`;
  
  const payload: GeminiAPIRequest = {
    contents: [{ role: "user", parts: [{ text: systemPrompt }] }],
    generationConfig: {
      temperature,
    }
  };

  const apiUrl = `${API_ENDPOINTS.GEMINI_BASE}?key=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData: APIError = await response.json();
      throw new Error(errorData.error?.message || VALIDATION_MESSAGES.UNKNOWN_ERROR);
    }

    const result: GeminiAPIResponse = await response.json();

    if (result.candidates && result.candidates.length > 0) {
      return result.candidates[0].content.parts[0].text;
    } else {
      throw new Error(VALIDATION_MESSAGES.UNEXPECTED_API_RESPONSE);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(VALIDATION_MESSAGES.UNKNOWN_ERROR);
  }
};

/**
 * Simulates video generation (placeholder implementation)
 */
export const generateVideo = async (
  story: string,
  videoPrompt: string,
  delay: number = 4000
): Promise<string> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // In a real app, you would call the Veo API here
  // For now, return a placeholder video URL
  return "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
};