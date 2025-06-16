
import React, { useState } from 'react';
import type { ProcessedLearningObjective } from '../types';

interface ResultsDisplayProps {
  objectives: ProcessedLearningObjective[];
}

const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 4.625v2.625m0 0H19.5m-2.25-2.625h-1.5m1.5 0V15m0 0h2.25m-2.25 0h1.5m0 0l-.15.002c-.11.002-.22.002-.331.002H15m0 0h1.5m0 0c.473 0 .927.024 1.378.068M6.75 7.5V6m0 0L6.96 6.002c.11-.002.22-.002.331-.002H9.375m0 0L6.75 6m2.625 0V7.5m0 0l2.625-1.5m0 0V6m0 0H9.375M3.75 6H2.25A1.125 1.125 0 001.125 7.125v1.5A1.125 1.125 0 002.25 9.75h1.5A1.125 1.125 0 004.875 8.625v-1.5A1.125 1.125 0 003.75 6z" />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${className}`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
);


export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ objectives }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000); // Reset after 2 seconds
      })
      .catch(err => console.error('Failed to copy text: ', err));
  };

  if (!objectives || objectives.length === 0) {
    return null;
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-sky-200">Gegenereerde AI-Proof Leerdoelen:</h2>
      <div className="space-y-4">
        {objectives.map((objective) => (
          <div key={objective.id} className="p-5 bg-slate-700 rounded-lg shadow-lg relative group">
            <p className="text-slate-200 leading-relaxed mr-12">{objective.text}</p>
            <button
              onClick={() => handleCopy(objective.text, objective.id)}
              title={copiedId === objective.id ? "Gekopieerd!" : "Kopieer naar klembord"}
              className="absolute top-3 right-3 p-2 bg-sky-600 hover:bg-sky-500 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              {copiedId === objective.id ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
