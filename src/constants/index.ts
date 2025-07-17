// Application constants

export const API_ENDPOINTS = {
  RANDOM_WORDS: 'https://random-word-api.herokuapp.com/word?number=5',
  GEMINI_BASE: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent',
} as const;

export const VALIDATION_MESSAGES = {
  API_KEY_REQUIRED: 'Please enter your Gemini API key.',
  WORDS_REQUIRED: 'Please fill in all 5 words.',
  STORY_PROMPT_REQUIRED: 'Please provide a story prompt.',
  VIDEO_PROMPT_REQUIRED: 'Please provide a video prompt.',
  STORY_REQUIRED_FOR_VIDEO: 'Please generate a story first.',
  RANDOM_WORDS_FETCH_ERROR: 'Failed to fetch random words.',
  UNKNOWN_ERROR: 'An unknown error occurred.',
  UNEXPECTED_API_RESPONSE: 'The API returned an unexpected response.',
} as const;

export const UI_CONFIG = {
  STORY_LENGTH: {
    MIN: 500,
    MAX: 1000,
  },
  WORDS_COUNT: 5,
  TEMPERATURE: 0.8,
  VIDEO_GENERATION_DELAY: 4000,
  PLACEHOLDER_VIDEO_URL: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
} as const;

export const CSS_CLASSES = {
  BUTTON_BASE: 'px-6 py-3 font-bold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed',
  INPUT_BASE: 'w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200',
  TEXTAREA_BASE: 'w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 resize-y',
} as const;