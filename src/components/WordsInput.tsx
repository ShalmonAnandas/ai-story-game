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
  <div className="mb-6">
    <div className="flex justify-between items-center mb-3">
      <label className="font-semibold text-gray-700">
        Enter {UI_CONFIG.WORDS_COUNT} Random Words
      </label>
      <button 
        onClick={onFetchRandomWords} 
        className="text-sm text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
        type="button"
        aria-label="Fetch random words from API"
      >
        Fetch Random
      </button>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {words.map((word, index) => (
        <Input 
          key={index}
          value={word}
          onChange={(e) => onWordChange(index, e.target.value)}
          placeholder={`Word ${index + 1}`}
        />
      ))}
    </div>
  </div>
);