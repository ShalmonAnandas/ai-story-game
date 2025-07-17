// Tests for utility functions

import { validateStoryInputs, validateVideoInputs } from '../utils';
import { VALIDATION_MESSAGES } from '../constants';

describe('Utility Functions', () => {
  describe('validateStoryInputs', () => {
    it('should return error when API key is missing', () => {
      const result = validateStoryInputs('', ['word1', 'word2', 'word3', 'word4', 'word5'], 'prompt');
      expect(result).toBe(VALIDATION_MESSAGES.API_KEY_REQUIRED);
    });

    it('should return error when words are incomplete', () => {
      const result = validateStoryInputs('api-key', ['word1', '', 'word3', 'word4', 'word5'], 'prompt');
      expect(result).toBe(VALIDATION_MESSAGES.WORDS_REQUIRED);
    });

    it('should return error when story prompt is missing', () => {
      const result = validateStoryInputs('api-key', ['word1', 'word2', 'word3', 'word4', 'word5'], '');
      expect(result).toBe(VALIDATION_MESSAGES.STORY_PROMPT_REQUIRED);
    });

    it('should return null when all inputs are valid', () => {
      const result = validateStoryInputs('api-key', ['word1', 'word2', 'word3', 'word4', 'word5'], 'prompt');
      expect(result).toBeNull();
    });
  });

  describe('validateVideoInputs', () => {
    it('should return error when story is missing', () => {
      const result = validateVideoInputs('', 'video prompt');
      expect(result).toBe(VALIDATION_MESSAGES.STORY_REQUIRED_FOR_VIDEO);
    });

    it('should return error when video prompt is missing', () => {
      const result = validateVideoInputs('story content', '');
      expect(result).toBe(VALIDATION_MESSAGES.VIDEO_PROMPT_REQUIRED);
    });

    it('should return null when all inputs are valid', () => {
      const result = validateVideoInputs('story content', 'video prompt');
      expect(result).toBeNull();
    });
  });
});