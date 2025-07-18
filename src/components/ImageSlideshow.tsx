// Image slideshow component for displaying generated images

import React, { useState, useEffect } from 'react';
import { Button, Textarea, Spinner } from './UI';
import type { GeneratedImage } from '../types';

interface ImageSlideshowProps {
  imagePrompt: string;
  generatedImages: GeneratedImage[];
  isGeneratingImages: boolean;
  onImagePromptChange: (value: string) => void;
  onGenerateImages: () => void;
}

/**
 * Component for image generation and slideshow display
 */
export const ImageSlideshow: React.FC<ImageSlideshowProps> = ({
  imagePrompt,
  generatedImages,
  isGeneratingImages,
  onImagePromptChange,
  onGenerateImages,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying || generatedImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % generatedImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, generatedImages.length]);

  // Reset to first image when new images are generated
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [generatedImages]);

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % generatedImages.length);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + generatedImages.length) % generatedImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(prev => !prev);
  };

  return (
    <div className="pt-8 border-t border-gray-200">
      <div className="flex items-center mb-6">
        <svg className="w-6 h-6 mr-3 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="text-xl font-bold text-gray-800">Image Slideshow</h3>
      </div>
      
      <div className="mb-6">
        <label htmlFor="image-prompt" className="flex items-center font-semibold text-gray-700 mb-4">
          <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H5a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3" />
          </svg>
          Image Style Prompt
        </label>
        <Textarea 
          value={imagePrompt}
          onChange={(e) => onImagePromptChange(e.target.value)}
          placeholder="e.g., Cinematic style with dramatic lighting, fantasy art style, detailed illustrations..."
          className="min-h-[100px]"
        />
      </div>
      
      <Button 
        onClick={onGenerateImages} 
        disabled={isGeneratingImages} 
        className="w-full mb-6 py-4 text-lg font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200"
      >
        {isGeneratingImages ? (
          <div className="flex items-center justify-center">
            <Spinner />
            <span className="ml-2">Creating Images...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Generate Images
          </div>
        )}
      </Button>
      
      {generatedImages.length > 0 && (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-lg">
          {/* Main Image Display */}
          <div className="relative mb-4">
            <img 
              src={generatedImages[currentImageIndex]?.imageUrl} 
              alt={`Scene: ${generatedImages[currentImageIndex]?.sentence}`}
              className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
            />
            
            {/* Navigation Arrows */}
            {generatedImages.length > 1 && (
              <>
                <button
                  onClick={goToPrevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goToNextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            
            {/* Image Counter */}
            <div className="absolute top-2 right-2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {generatedImages.length}
            </div>
          </div>
          
          {/* Current Sentence */}
          <div className="mb-4 p-4 bg-black/30 rounded-lg">
            <p className="text-white text-center leading-relaxed">
              {generatedImages[currentImageIndex]?.sentence}
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-center space-x-4 mb-4">
            <button
              onClick={toggleAutoPlay}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isAutoPlaying 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isAutoPlaying ? (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                  </svg>
                  Pause
                </div>
              ) : (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1" />
                  </svg>
                  Auto Play
                </div>
              )}
            </button>
          </div>
          
          {/* Thumbnail Navigation */}
          {generatedImages.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {generatedImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => goToImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === currentImageIndex 
                      ? 'border-cyan-400 scale-110' 
                      : 'border-gray-500 hover:border-gray-300'
                  }`}
                >
                  <img 
                    src={image.imageUrl} 
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};