// Application constants

export const API_ENDPOINTS = {
  RANDOM_WORDS: 'https://random-word-api.herokuapp.com/word?number=5',
  GEMINI_BASE: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent',
} as const;

export const VALIDATION_MESSAGES = {
  API_KEY_REQUIRED: 'Please enter your Gemini API key.',
  WORDS_REQUIRED: 'Please fill in all 5 words.',
  STORY_PROMPT_REQUIRED: 'Please provide a story prompt.',
  IMAGE_PROMPT_REQUIRED: 'Please provide an image style prompt.',
  STORY_REQUIRED_FOR_IMAGES: 'Please generate a story first.',
  RANDOM_WORDS_FETCH_ERROR: 'Failed to fetch random words.',
  UNKNOWN_ERROR: 'An unknown error occurred.',
  UNEXPECTED_API_RESPONSE: 'The API returned an unexpected response.',
  IMAGE_GENERATION_ERROR: 'Failed to generate images.',
} as const;

export const UI_CONFIG = {
  STORY_LENGTH: {
    MIN: 500,
    MAX: 1000,
  },
  WORDS_COUNT: 5,
  TEMPERATURE: 0.8,
  IMAGE_GENERATION_DELAY: 2000,
  IMAGEN_MODEL: 'models/imagen-4.0-generate-preview-06-06',
} as const;

export const CSS_CLASSES = {
  BUTTON_BASE: 'px-6 py-3 font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none hover:transform hover:scale-105',
  INPUT_BASE: 'w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:shadow-md',
  TEXTAREA_BASE: 'w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-y hover:shadow-md',
} as const;