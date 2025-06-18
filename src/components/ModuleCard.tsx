import React from 'react';
import type { ModuleWithOutcomes } from '../../types';

interface Props {
  module: ModuleWithOutcomes;
}

export const ModuleCard: React.FC<Props> = ({ module }) => (
  <div className="border rounded-lg shadow bg-white p-4">
    <div className="bg-primary text-white px-3 py-2 rounded-t-md -mt-4 mb-2">
      <h3 className="text-lg font-semibold">{module.moduleTitle}</h3>
    </div>
    <ul className="list-disc list-inside text-text space-y-1">
      {module.learningOutcomes.map((out, idx) => (
        <li key={idx}>{out}</li>
      ))}
    </ul>
  </div>
);
