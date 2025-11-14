
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PromptInput } from './components/PromptInput';
import { ImageDisplay } from './components/ImageDisplay';
import { Loader } from './components/Loader';
import { Footer } from './components/Footer';
import type { ImageFile } from './types';
import { SURPRISE_ME_PROMPTS } from './constants';
import { editImageWithPrompt } from './services/geminiService';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (imageFile: ImageFile) => {
    setOriginalImage(imageFile);
    setEditedImage(null);
    setError(null);
  };
  
  const handleClear = () => {
    setOriginalImage(null);
    setEditedImage(null);
    setPrompt('');
    setError(null);
  }

  const handleGenerate = useCallback(async () => {
    if (!originalImage || !prompt) {
      setError('Please upload an image and enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const result = await editImageWithPrompt(originalImage.data, originalImage.mimeType, prompt);
      if (result) {
        setEditedImage(`data:image/png;base64,${result}`);
      } else {
        setError('Failed to generate image. The model might not have returned an image.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);
  
  const handleSurpriseMe = () => {
    const randomPrompt = SURPRISE_ME_PROMPTS[Math.floor(Math.random() * SURPRISE_ME_PROMPTS.length)];
    setPrompt(randomPrompt);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        {!originalImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <div className="w-full max-w-6xl flex flex-col gap-8">
            <ImageDisplay 
              originalImage={originalImage.data} 
              editedImage={editedImage}
              isLoading={isLoading}
            />
            
            {error && (
              <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative text-center" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <PromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              onSubmit={handleGenerate}
              isLoading={isLoading}
              onSurpriseMe={handleSurpriseMe}
            />

            <div className="text-center">
              <button
                onClick={handleClear}
                className="text-gray-400 hover:text-white transition-colors duration-200 underline"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
