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
  <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-200">
    <h2 className="text-2xl font-bold mb-4 text-gray-800">API Configuration</h2>
    <p className="text-gray-600 mb-4">Please enter your Gemini API key to use the app.</p>
    <Input 
      value={apiKey}
      onChange={(e) => onApiKeyChange(e.target.value)}
      placeholder="Enter your Gemini API Key"
    />
  </div>
);