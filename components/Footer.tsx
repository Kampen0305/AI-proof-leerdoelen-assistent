
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900/80 text-center py-6 mt-auto">
      <div className="container mx-auto px-4">
        <p className="text-sm text-slate-400">
          &copy; ${new Date().getFullYear()} AI-Proof Leerdoelen Assistent. Gemaakt met ❤️ en AI.
        </p>
      </div>
    </footer>
  );
};
