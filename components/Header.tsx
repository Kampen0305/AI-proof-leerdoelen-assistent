
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-brand-green shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-brand-black flex items-center justify-center space-x-3">
          <span role="img" aria-label="graduation cap" className="text-4xl">🎓</span>
          <span>AI-Proof Leerdoelen Assistent</span>
        </h1>
      </div>
    </header>
  );
};
