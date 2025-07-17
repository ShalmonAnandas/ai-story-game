// API Key configuration component

import React from 'react';
import { Input } from './UI';

interface APIKeyConfigProps {
  apiKey: string;
  onApiKeyChange: (value: string) => void;
}

/**
 * Component for API key configuration
 */
export const APIKeyConfig: React.FC<APIKeyConfigProps> = ({ 
  apiKey, 
  onApiKeyChange 
}) => (
  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
    <div className="flex items-center mb-6">
      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3.586l6.586-6.586A6 6 0 0121 9z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-800">API Configuration</h2>
    </div>
    <p className="text-gray-600 mb-6">Enter your Gemini API key to unlock the AI-powered story generation.</p>
    <div className="relative">
      <Input 
        value={apiKey}
        onChange={(e) => onApiKeyChange(e.target.value)}
        placeholder="Enter your Gemini API Key"
        className="pl-12"
      />
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3.586l6.586-6.586A6 6 0 0121 9z" />
        </svg>
      </div>
    </div>
  </div>
);