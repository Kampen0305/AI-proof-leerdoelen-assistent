
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-green/10 text-center py-6 mt-auto">
      <div className="container mx-auto px-4">
        <p className="text-sm text-brand-black">
          &copy; ${new Date().getFullYear()} AI-Proof Leerdoelen Assistent. Gemaakt met ❤️ en AI.
        </p>
      </div>
    </footer>
  );
};
