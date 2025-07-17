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

// App state types
export interface AppState {
  apiKey: string;
  words: string[];
  storyPrompt: string;
  videoPrompt: string;
  generatedStory: string;
  generatedVideoUrl: string;
  isGeneratingStory: boolean;
  isGeneratingVideo: boolean;
  error: string | null;
}