
import React from 'react';
import { Loader } from './Loader';

interface ImageDisplayProps {
  originalImage: string | null;
  editedImage: string | null;
  isLoading: boolean;
}

const ImagePanel: React.FC<{ title: string; imageUrl: string | null; children?: React.ReactNode }> = ({ title, imageUrl, children }) => (
  <div className="flex-1 flex flex-col items-center gap-4">
    <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
    <div className="w-full aspect-square bg-gray-800 rounded-xl border border-gray-700 flex items-center justify-center overflow-hidden">
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="w-full h-full object-contain" />
      ) : (
        children
      )}
    </div>
  </div>
);


export const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImage, editedImage, isLoading }) => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-8">
      <ImagePanel title="Original" imageUrl={originalImage} />
      <ImagePanel title="Edited" imageUrl={editedImage}>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="text-gray-500 text-center p-4">
            <svg className="w-16 h-16 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            Your generated image will appear here.
          </div>
        )}
      </ImagePanel>
    </div>
  );
};
