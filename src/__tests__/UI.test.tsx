// Tests for UI components

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button, Input, Textarea, ErrorMessage } from '../components/UI';

describe('UI Components', () => {
  describe('Button', () => {
    it('renders with children', () => {
      render(<Button onClick={() => {}}>Click me</Button>);
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('is disabled when disabled prop is true', () => {
      render(<Button onClick={() => {}} disabled>Click me</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('Input', () => {
    it('renders with value and placeholder', () => {
      render(<Input value="test" onChange={() => {}} placeholder="Enter text" />);
      const input = screen.getByDisplayValue('test');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('placeholder', 'Enter text');
    });

    it('calls onChange when value changes', () => {
      const handleChange = jest.fn();
      render(<Input value="" onChange={handleChange} />);
      
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'new value' } });
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('Textarea', () => {
    it('renders with value and placeholder', () => {
      render(<Textarea value="test content" onChange={() => {}} placeholder="Enter text" />);
      const textarea = screen.getByDisplayValue('test content');
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute('placeholder', 'Enter text');
    });
  });

  describe('ErrorMessage', () => {
    it('renders error message with proper styling', () => {
      render(<ErrorMessage message="Something went wrong" />);
      const errorElement = screen.getByRole('alert');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent('Error: Something went wrong');
    });
  });
});