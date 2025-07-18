// Tests for utility functions

import { validateStoryInputs, validateImageInputs, splitStoryIntoSentences, filterSeparatorsFromStory } from '../utils';
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

  describe('validateImageInputs', () => {
    it('should return error when story is missing', () => {
      const result = validateImageInputs('', 'image prompt');
      expect(result).toBe(VALIDATION_MESSAGES.STORY_REQUIRED_FOR_IMAGES);
    });

    it('should return error when image prompt is missing', () => {
      const result = validateImageInputs('story content', '');
      expect(result).toBe(VALIDATION_MESSAGES.IMAGE_PROMPT_REQUIRED);
    });

    it('should return null when all inputs are valid', () => {
      const result = validateImageInputs('story content', 'image prompt');
      expect(result).toBeNull();
    });
  });

  describe('filterSeparatorsFromStory', () => {
    it('should remove sentence separators from story', () => {
      const storyWithSeparators = 'This is the first sentence.[SENTENCE_BREAK] This is the second sentence.[SENTENCE_BREAK] The end.';
      const filtered = filterSeparatorsFromStory(storyWithSeparators);
      expect(filtered).toBe('This is the first sentence. This is the second sentence. The end.');
    });

    it('should handle empty story', () => {
      const result = filterSeparatorsFromStory('');
      expect(result).toBe('');
    });

    it('should handle story without separators', () => {
      const story = 'This is a normal story. Without any separators.';
      const result = filterSeparatorsFromStory(story);
      expect(result).toBe(story);
    });
  });

  describe('splitStoryIntoSentences', () => {
    it('should split story by sentence separators', () => {
      const storyWithSeparators = 'First sentence.[SENTENCE_BREAK] Second sentence.[SENTENCE_BREAK] Third sentence.';
      const sentences = splitStoryIntoSentences(storyWithSeparators);
      expect(sentences).toEqual([
        'First sentence.',
        'Second sentence.',
        'Third sentence.'
      ]);
    });

    it('should handle empty story', () => {
      const result = splitStoryIntoSentences('');
      expect(result).toEqual([]);
    });

    it('should handle story without separators', () => {
      const story = 'Single sentence without separator.';
      const result = splitStoryIntoSentences(story);
      expect(result).toEqual(['Single sentence without separator.']);
    });

    it('should filter out empty sentences', () => {
      const storyWithSeparators = 'First sentence.[SENTENCE_BREAK][SENTENCE_BREAK] Second sentence.[SENTENCE_BREAK]';
      const sentences = splitStoryIntoSentences(storyWithSeparators);
      expect(sentences).toEqual([
        'First sentence.',
        'Second sentence.'
      ]);
    });
  });
});