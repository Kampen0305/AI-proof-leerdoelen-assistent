
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Spinner } from './components/Spinner';
import { Footer } from './components/Footer';
import { generateAIProofObjectives } from './services/geminiService';
import type { FormData, ProcessedLearningObjective } from './types';
import { DUTCH_SYSTEM_INSTRUCTION, DUTCH_USER_PROMPT_TEMPLATE } from './constants';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [aiProofObjectives, setAiProofObjectives] = useState<ProcessedLearningObjective[]>([]);

  const handleSubmit = useCallback(async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setAiProofObjectives([]);

    const levelDisplay = formData.level === 'Anders' ? formData.customLevel : formData.level;
    const contextTypeDisplay = formData.contextType === 'Anders' ? formData.customContextType : formData.contextType;
    
    const userPrompt = DUTCH_USER_PROMPT_TEMPLATE(
        levelDisplay || "Niet gespecificeerd",
        formData.originalObjective,
        contextTypeDisplay || "Niet gespecificeerd",
        formData.additionalDetails
    );

    const result = await generateAIProofObjectives(
        DUTCH_SYSTEM_INSTRUCTION,
        userPrompt
    );

    if (result.success && result.data) {
      setAiProofObjectives(result.data.map((text, index) => ({ id: `obj-${index}-${Date.now()}`, text })));
    } else {
      setError(result.error || "Er is een onbekende fout opgetreden.");
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 text-slate-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-slate-800 shadow-2xl rounded-lg p-6 md:p-10">
          <p className="mb-6 text-lg text-slate-300">
            Deze tool helpt u traditionele leerdoelen om te vormen naar toekomstbestendige, 'AI-proof' versies. 
            Voer de details van uw huidige leerdoel in en de AI genereert suggesties die studenten aanmoedigen 
            AI-tools op een verantwoorde en effectieve manier te gebruiken.
          </p>
          
          <InputForm onSubmit={handleSubmit} isLoading={isLoading} />

          {isLoading && (
            <div className="mt-8 flex justify-center">
              <Spinner />
            </div>
          )}

          {error && (
            <div className="mt-8 p-4 bg-red-700/50 text-red-100 border border-red-500 rounded-md">
              <h3 className="font-semibold text-lg mb-2">Fout opgetreden</h3>
              <p>{error}</p>
            </div>
          )}

          {!isLoading && !error && aiProofObjectives.length > 0 && (
            <ResultsDisplay objectives={aiProofObjectives} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
