
import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onSurpriseMe: () => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  setPrompt,
  onSubmit,
  isLoading,
  onSurpriseMe,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !isLoading) {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="w-full bg-gray-800/50 rounded-xl p-4 shadow-lg border border-gray-700">
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., Add a retro filter, make it a watercolor painting..."
          className="w-full bg-gray-900 border border-gray-600 rounded-lg p-4 pr-32 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none"
          rows={2}
          disabled={isLoading}
        />
        <button
          onClick={onSurpriseMe}
          disabled={isLoading}
          className="absolute top-1/2 right-4 -translate-y-1/2 text-sm text-gray-400 hover:text-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Surprise me with a random prompt"
        >
          ✨ Surprise Me
        </button>
      </div>
      <button
        onClick={onSubmit}
        disabled={isLoading || !prompt.trim()}
        className="mt-4 w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 text-lg"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate'
        )}
      </button>
    </div>
  );
};
