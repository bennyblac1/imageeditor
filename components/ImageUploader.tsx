
import React, { useCallback, useState } from 'react';
import type { ImageFile } from '../types';

interface ImageUploaderProps {
  onImageUpload: (imageFile: ImageFile) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageUpload({ data: result, mimeType: file.type });
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Fix: Changed event type from React.DragEvent<HTMLDivElement> to React.DragEvent<HTMLLabelElement> for drag event handlers on the label.
  const onDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl text-center p-8">
      <h2 className="text-3xl font-bold mb-2 text-white">Upload Your Image</h2>
      <p className="text-gray-400 mb-8">Start by uploading or dropping an image to begin editing.</p>
      
      <label
        htmlFor="image-upload"
        className={`relative block w-full p-10 border-2 ${isDragging ? 'border-indigo-400 bg-gray-800' : 'border-gray-600 border-dashed'} rounded-xl cursor-pointer transition-colors duration-200 hover:border-indigo-400 hover:bg-gray-800/50`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-gray-400">
           <svg className="w-16 h-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3 3m3-3 3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
          </svg>
          <p className="text-lg font-semibold">
            <span className="text-indigo-400">Click to upload</span> or drag and drop
          </p>
          <p className="text-sm">PNG, JPG, GIF, WEBP</p>
        </div>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="opacity-0 absolute inset-0 w-full h-full"
          onChange={onInputChange}
        />
      </label>
    </div>
  );
};
