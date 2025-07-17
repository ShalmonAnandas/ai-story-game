// Words input component

import React from 'react';
import { Input } from './UI';
import { UI_CONFIG } from '../constants';

interface WordsInputProps {
  words: string[];
  onWordChange: (index: number, value: string) => void;
  onFetchRandomWords: () => void;
}

/**
 * Component for inputting the five words
 */
export const WordsInput: React.FC<WordsInputProps> = ({ 
  words, 
  onWordChange, 
  onFetchRandomWords 
}) => (
  <div className="mb-8">
    <div className="flex justify-between items-center mb-4">
      <label className="flex items-center font-semibold text-gray-700">
        <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        Enter {UI_CONFIG.WORDS_COUNT} Creative Words
      </label>
      <button 
        onClick={onFetchRandomWords} 
        className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 font-medium hover:bg-indigo-50 px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        type="button"
        aria-label="Fetch random words from API"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Fetch Random
      </button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {words.map((word, index) => (
        <div key={index} className="relative group">
          <Input 
            value={word}
            onChange={(e) => onWordChange(index, e.target.value)}
            placeholder={`Word ${index + 1}`}
            className="group-hover:shadow-md transition-shadow duration-200"
          />
          <div className="absolute top-2 right-2 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </div>
      ))}
    </div>
  </div>
);