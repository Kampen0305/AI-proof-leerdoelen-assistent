
import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div
        className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-brand-green"
      ></div>
      <p className="text-brand-black">Een ogenblik geduld, de AI is aan het werk...</p>
    </div>
  );
};
