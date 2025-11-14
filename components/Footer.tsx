
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 mt-8">
      <div className="container mx-auto text-center text-gray-500 text-sm">
        <p>Powered by Gemini 2.5 Flash Image. &copy; {new Date().getFullYear()} All Rights Reserved.</p>
      </div>
    </footer>
  );
};
