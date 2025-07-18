// Type definitions for the AI Story Game

import React from 'react';

export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
}

export interface ErrorMessageProps {
  message: string;
}

// API related types
export interface GeminiAPIResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export interface GeminiAPIRequest {
  contents: Array<{
    role: string;
    parts: Array<{
      text: string;
    }>;
  }>;
  generationConfig: {
    temperature: number;
  };
}

export interface APIError {
  error?: {
    message: string;
  };
}

// Image related types
export interface GeneratedImage {
  id: string;
  sentence: string;
  imageData: string; // base64 encoded image data
  imageUrl?: string; // optional blob URL for display
}

// App state types
export interface AppState {
  apiKey: string;
  words: string[];
  storyPrompt: string;
  imagePrompt: string;
  generatedStory: string;
  generatedImages: GeneratedImage[];
  isGeneratingStory: boolean;
  isGeneratingImages: boolean;
  error: string | null;
}