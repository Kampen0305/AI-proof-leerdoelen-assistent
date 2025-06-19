
import React, { useState } from 'react';
import type { FormData } from '../types';
import { EducationalLevel, LearningContextType } from '../types';
import { EDUCATIONAL_LEVELS_OPTIONS, LEARNING_CONTEXT_TYPE_OPTIONS } from '../constants';

interface InputFormProps {
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [level, setLevel] = useState<EducationalLevel | string>(EDUCATIONAL_LEVELS_OPTIONS[0].value);
  const [customLevel, setCustomLevel] = useState<string>('');
  const [originalObjective, setOriginalObjective] = useState<string>('');
  const [contextType, setContextType] = useState<LearningContextType | string>(LEARNING_CONTEXT_TYPE_OPTIONS[0].value);
  const [customContextType, setCustomContextType] = useState<string>('');
  const [additionalDetails, setAdditionalDetails] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalObjective.trim()) {
      alert("Vul alstublieft het originele leerdoel in.");
      return;
    }
    onSubmit({
      level: level === EducationalLevel.OTHER ? customLevel || 'Anders gespecificeerd' : level,
      customLevel: level === EducationalLevel.OTHER ? customLevel : undefined,
      originalObjective,
      contextType: contextType === LearningContextType.OTHER ? customContextType || 'Anders gespecificeerd' : contextType,
      customContextType: contextType === LearningContextType.OTHER ? customContextType : undefined,
      additionalDetails,
    });
  };

  const commonInputClass = "w-full p-3 bg-white border border-brand-green/40 rounded-md focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none placeholder-gray-400 text-brand-black transition-colors";
  const commonLabelClass = "block mb-2 text-sm font-medium text-brand-black";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="level" className={commonLabelClass}>
          Onderwijsniveau
        </label>
        <select
          id="level"
          value={level}
          onChange={(e) => setLevel(e.target.value as EducationalLevel | 'Anders')}
          className={commonInputClass}
          disabled={isLoading}
        >
          {EDUCATIONAL_LEVELS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {level === EducationalLevel.OTHER && (
          <input
            type="text"
            placeholder="Specificeer ander niveau"
            value={customLevel}
            onChange={(e) => setCustomLevel(e.target.value)}
            className={`${commonInputClass} mt-2`}
            disabled={isLoading}
          />
        )}
      </div>

      <div>
        <label htmlFor="originalObjective" className={commonLabelClass}>
          Origineel Leerdoel / Leeruitkomst <span className="text-red-400">*</span>
        </label>
        <textarea
          id="originalObjective"
          rows={4}
          value={originalObjective}
          onChange={(e) => setOriginalObjective(e.target.value)}
          className={commonInputClass}
          placeholder="Bijvoorbeeld: 'Studenten kunnen de belangrijkste oorzaken van de Franse Revolutie benoemen.'"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="contextType" className={commonLabelClass}>
          Context van het Leerdoel
        </label>
        <select
          id="contextType"
          value={contextType}
          onChange={(e) => setContextType(e.target.value as LearningContextType | 'Anders')}
          className={commonInputClass}
          disabled={isLoading}
        >
          {LEARNING_CONTEXT_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {contextType === LearningContextType.OTHER && (
          <input
            type="text"
            placeholder="Specificeer andere context"
            value={customContextType}
            onChange={(e) => setCustomContextType(e.target.value)}
            className={`${commonInputClass} mt-2`}
            disabled={isLoading}
          />
        )}
      </div>
      
      <div>
        <label htmlFor="additionalDetails" className={commonLabelClass}>
          Aanvullende Details (optioneel)
        </label>
        <textarea
          id="additionalDetails"
          rows={3}
          value={additionalDetails}
          onChange={(e) => setAdditionalDetails(e.target.value)}
          className={commonInputClass}
          placeholder="Bijvoorbeeld: 'Dit is voor een eerstejaars HBO-module.' of 'Studenten hebben al basiskennis over X.'"
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !originalObjective.trim()}
        className="w-full mt-6 flex items-center justify-center px-6 py-4 text-lg bg-brand-orange hover:bg-brand-green text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-opacity-75 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Verwerken...
          </>
        ) : (
          'Genereer leerdoelen'
        )}
      </button>
    </form>
  );
};
