import React, { useState } from 'react';
import { pdfToText } from '../utils/pdfToText';
import { generateModules } from '../services/openaiService';
import { ModuleCard } from './ModuleCard';
import { Spinner } from '../../components/Spinner';
import type { ModuleWithOutcomes } from '../../types';

export const PdfUploader: React.FC = () => {
  const [modules, setModules] = useState<ModuleWithOutcomes[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setModules([]);
    setError(null);
    setLoading(true);
    try {
      const text = await pdfToText(file);
      const res = await generateModules(text);
      if (res.success && res.data) {
        setModules(res.data);
      } else {
        setError(res.error || 'Er ging iets mis.');
      }
    } catch (err: any) {
      setError(err.message || 'Fout bij verwerken PDF.');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        className="block w-full text-sm text-text file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary file:text-white hover:file:bg-secondary"
      />
      {loading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
      {error && <p className="text-red-600">{error}</p>}
      {modules.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {modules.map((m, idx) => (
            <ModuleCard module={m} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
};
