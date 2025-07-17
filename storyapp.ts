import React, { useState, useCallback } from 'react';

// --- Helper Components ---

// A simple, reusable button component
const Button = ({ onClick, children, className = '', disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-6 py-3 font-bold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

// A reusable input field component
const Input = ({ value, onChange, placeholder, className = '' }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 ${className}`}
  />
);

// A reusable text area component
const Textarea = ({ value, onChange, placeholder, className = '' }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 resize-y ${className}`}
    rows="5"
  />
);

// A component for displaying loading spinners
const Spinner = () => (
    <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
);

// A component for displaying error messages
const ErrorMessage = ({ message }) => (
    <div className="p-4 my-4 text-sm text-red-800 bg-red-100 rounded-lg" role="alert">
        <span className="font-medium">Error:</span> {message}
    </div>
);


// --- Main App Component ---

export default function App() {
  // State for API Key
  const [apiKey, setApiKey] = useState('');

  // State for game inputs
  const [words, setWords] = useState(['', '', '', '', '']);
  const [storyPrompt, setStoryPrompt] = useState('');
  const [videoPrompt, setVideoPrompt] = useState('');

  // State for generated content
  const [generatedStory, setGeneratedStory] = useState('');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState('');
  
  // State for UI status
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [error, setError] = useState(null);

  // --- Handlers ---

  // Handles changes to the word input fields
  const handleWordChange = (index, value) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);
  };

  // Fetches random words from an API
  const fetchRandomWords = useCallback(async () => {
    try {
        const response = await fetch('https://random-word-api.herokuapp.com/word?number=5');
        if (!response.ok) {
            throw new Error('Failed to fetch random words.');
        }
        const data = await response.json();
        setWords(data);
    } catch (err) {
        setError(err.message);
    }
  }, []);

  // Generates the story using the Gemini API
  const handleGenerateStory = useCallback(async () => {
    if (!apiKey) {
        setError("Please enter your Gemini API key.");
        return;
    }
    if (words.some(word => word.trim() === '')) {
        setError("Please fill in all 5 words.");
        return;
    }
    if (!storyPrompt.trim()) {
        setError("Please provide a story prompt.");
        return;
    }

    setIsGeneratingStory(true);
    setError(null);
    setGeneratedStory('');

    const systemPrompt = `Write a 500-1000 word story using these five words: ${words.join(', ')}. The story should follow this prompt: "${storyPrompt}". Include vivid descriptions and dialogue.`;
    
    try {
        const payload = {
            contents: [{ role: "user", parts: [{ text: systemPrompt }] }],
            generationConfig: {
                temperature: 0.8,
            }
        };

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'An unknown error occurred.');
        }

        const result = await response.json();

        if (result.candidates && result.candidates.length > 0) {
            const storyText = result.candidates[0].content.parts[0].text;
            setGeneratedStory(storyText);
        } else {
            throw new Error("The API returned an unexpected response.");
        }

    } catch (err) {
        setError(err.message);
    } finally {
        setIsGeneratingStory(false);
    }
  }, [apiKey, words, storyPrompt]);
  
  // Simulates video generation
  const handleGenerateVideo = () => {
      if (!generatedStory) {
          setError("Please generate a story first.");
          return;
      }
      if (!videoPrompt.trim()) {
          setError("Please provide a video prompt.");
          return;
      }
      
      setIsGeneratingVideo(true);
      setError(null);
      setGeneratedVideoUrl('');

      // Simulate API call delay
      setTimeout(() => {
          // In a real app, you would get this URL from the Veo API
          const placeholderVideoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
          setGeneratedVideoUrl(placeholderVideoUrl);
          setIsGeneratingVideo(false);
      }, 4000);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <div className="container mx-auto p-4 md:p-8">
        
        {/* --- Header --- */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">Prompt Engineering Game</h1>
          <p className="text-lg text-gray-600">Craft prompts to generate unique stories and videos.</p>
        </header>

        {/* --- API Key Section --- */}
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">API Configuration</h2>
            <p className="text-gray-600 mb-4">Please enter your Gemini API key to use the app.</p>
            <Input 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Gemini API Key"
            />
        </div>

        {error && <ErrorMessage message={error} />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* --- Input Section --- */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">1. Create Your Story</h2>
            
            {/* Words Input */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="font-semibold text-gray-700">Enter 5 Random Words</label>
                <button onClick={fetchRandomWords} className="text-sm text-indigo-600 hover:underline">Fetch Random</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {words.map((word, index) => (
                  <Input 
                    key={index}
                    value={word}
                    onChange={(e) => handleWordChange(index, e.target.value)}
                    placeholder={`Word ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Story Prompt */}
            <div className="mb-6">
              <label className="font-semibold text-gray-700 mb-3 block">Story Prompt</label>
              <Textarea 
                value={storyPrompt}
                onChange={(e) => setStoryPrompt(e.target.value)}
                placeholder="e.g., A sci-fi thriller involving these words."
              />
            </div>

            <Button onClick={handleGenerateStory} disabled={isGeneratingStory} className="w-full">
              {isGeneratingStory ? <Spinner /> : 'Generate Story'}
            </Button>
          </div>

          {/* --- Output Section --- */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">2. Review and Visualize</h2>
            
            {/* Generated Story Display */}
            <div className="mb-6">
                <label className="font-semibold text-gray-700 mb-3 block">Generated Story</label>
                <div className="w-full h-64 p-4 bg-gray-100 border border-gray-200 rounded-lg overflow-y-auto">
                    {isGeneratingStory ? <Spinner/> : (generatedStory || <p className="text-gray-500">Your generated story will appear here...</p>)}
                </div>
            </div>
            
            {/* Video Section */}
            {generatedStory && (
                <>
                    {/* Video Prompt */}
                    <div className="mb-6">
                      <label className="font-semibold text-gray-700 mb-3 block">Video Prompt</label>
                      <Textarea 
                        value={videoPrompt}
                        onChange={(e) => setVideoPrompt(e.target.value)}
                        placeholder="e.g., Cyberpunk style, fast cuts, suspenseful mood."
                      />
                    </div>
                    
                    <Button onClick={handleGenerateVideo} disabled={isGeneratingVideo} className="w-full mb-4">
                      {isGeneratingVideo ? <Spinner /> : 'Generate Video'}
                    </Button>

                    {/* Video Player */}
                    {isGeneratingVideo && <Spinner />}
                    {generatedVideoUrl && (
                        <div className="mt-4">
                            <video className="w-full rounded-lg" controls autoPlay>
                                <source src={generatedVideoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )}
                </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
