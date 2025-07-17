// Common UI components

import React from 'react';
import type { ButtonProps, InputProps, TextareaProps, ErrorMessageProps } from '../types';
import { CSS_CLASSES } from '../constants';

/**
 * A reusable button component with consistent styling
 */
export const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  className = '', 
  disabled = false 
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${CSS_CLASSES.BUTTON_BASE} ${className}`}
    type="button"
  >
    {children}
  </button>
);

/**
 * A reusable input field component with consistent styling
 */
export const Input: React.FC<InputProps> = ({ 
  value, 
  onChange, 
  placeholder, 
  className = '' 
}) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`${CSS_CLASSES.INPUT_BASE} ${className}`}
  />
);

/**
 * A reusable textarea component with consistent styling
 */
export const Textarea: React.FC<TextareaProps> = ({ 
  value, 
  onChange, 
  placeholder, 
  className = '' 
}) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`${CSS_CLASSES.TEXTAREA_BASE} ${className}`}
    rows={5}
  />
);

/**
 * A loading spinner component
 */
export const Spinner: React.FC = () => (
  <div className="flex justify-center items-center" role="status" aria-label="Loading">
    <div className="relative">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      <div className="animate-ping absolute top-0 left-0 rounded-full h-8 w-8 border border-white opacity-20"></div>
    </div>
  </div>
);

/**
 * An error message component with consistent styling
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="p-6 my-6 text-sm text-red-800 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl shadow-lg" role="alert">
    <div className="flex items-center">
      <svg className="w-5 h-5 mr-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div>
        <span className="font-semibold">Oops! Something went wrong:</span>
        <p className="mt-1">{message}</p>
      </div>
    </div>
  </div>
);