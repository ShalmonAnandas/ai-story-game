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
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
  </div>
);

/**
 * An error message component with consistent styling
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="p-4 my-4 text-sm text-red-800 bg-red-100 rounded-lg" role="alert">
    <span className="font-medium">Error:</span> {message}
  </div>
);