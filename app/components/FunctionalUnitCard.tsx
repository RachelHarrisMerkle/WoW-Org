'use client';

import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { FunctionalUnit, SUB_PRACTICE_LIGHT, MODEL_COLORS } from '../data/org-data';
import DetailPanel from './DetailPanel';

interface FunctionalUnitCardProps {
  unit: FunctionalUnit;
  size?: 'sm' | 'md';
}

export default function FunctionalUnitCard({ unit, size = 'md' }: FunctionalUnitCardProps) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [detail, setDetail] = useState(unit.detail);

  const colorClass = unit.subPractice ? SUB_PRACTICE_LIGHT[unit.subPractice] : 'bg-gray-50 border-gray-300 text-gray-800';
  const modelColor = detail?.modeling?.model ? MODEL_COLORS[detail.modeling.model] : '';

  return (
    <>
      <div
        onClick={() => setPanelOpen(true)}
        className={`
          cursor-pointer rounded border p-2 transition-all hover:shadow-md hover:scale-[1.02] relative
          ${colorClass}
          ${size === 'sm' ? 'min-w-[110px]' : 'min-w-[140px]'}
        `}
      >
        {detail?.needsInfo && (
          <AlertCircle size={10} className="absolute top-1.5 right-1.5 text-amber-500" />
        )}
        <p className={`font-semibold leading-tight pr-3 ${size === 'sm' ? 'text-[10px]' : 'text-xs'}`}>
          {unit.name}
          {unit.isUgam && <span className="ml-0.5 text-[9px] font-normal opacity-60">**</span>}
        </p>
        {(unit.headcount !== undefined || unit.revenue !== undefined) && (
          <p className={`mt-1 font-mono opacity-70 ${size === 'sm' ? 'text-[9px]' : 'text-[10px]'}`}>
            {unit.headcount !== undefined && `${unit.headcount}`}
            {unit.headcount !== undefined && unit.revenue !== undefined && ' / '}
            {unit.revenue !== undefined && `$${unit.revenue}M`}
          </p>
        )}
        {unit.leader && (
          <p className={`mt-0.5 opacity-70 ${size === 'sm' ? 'text-[9px]' : 'text-[10px]'}`}>{unit.leader}</p>
        )}
        {detail?.modeling?.model && (
          <span className={`inline-block mt-1 text-[8px] font-bold px-1 rounded border ${modelColor}`}>
            {detail.modeling.model.toUpperCase()}
          </span>
        )}
      </div>

      {panelOpen && (
        <DetailPanel
          title={unit.name}
          subtitle={unit.subPractice ? `${unit.subPractice}${unit.headcount ? ` · ${unit.headcount} HC` : ''}${unit.revenue ? ` · $${unit.revenue}M` : ''}` : undefined}
          subPractice={unit.subPractice}
          detail={detail}
          onClose={() => setPanelOpen(false)}
          onSave={(updated) => setDetail(updated)}
        />
      )}
    </>
  );
}
