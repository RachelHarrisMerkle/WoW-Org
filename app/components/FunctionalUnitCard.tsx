'use client';

import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { FunctionalUnit, SUB_PRACTICE_LIGHT } from '../data/org-data';
import DetailPanel from './DetailPanel';

interface FunctionalUnitCardProps {
  unit: FunctionalUnit;
  size?: 'sm' | 'md';
}

export default function FunctionalUnitCard({ unit, size = 'md' }: FunctionalUnitCardProps) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [data, setData] = useState(unit);

  const colorClass = data.subPractice ? SUB_PRACTICE_LIGHT[data.subPractice] : 'bg-gray-50 border-gray-300 text-gray-800';

  return (
    <>
      <div
        onClick={() => setPanelOpen(true)}
        className={`
          cursor-pointer rounded border p-2 transition-all hover:shadow-md hover:scale-[1.02]
          ${colorClass}
          ${size === 'sm' ? 'min-w-[110px]' : 'min-w-[140px]'}
        `}
      >
        <div className="flex items-start justify-between gap-1">
          <p className={`font-semibold leading-tight ${size === 'sm' ? 'text-[10px]' : 'text-xs'}`}>
            {data.name}
            {data.isUgam && <span className="ml-0.5 text-[9px] font-normal opacity-60">**</span>}
          </p>
          {data.needsInfo && <AlertCircle size={10} className="text-amber-500 flex-shrink-0 mt-0.5" />}
        </div>
        {(data.headcount !== undefined || data.revenue !== undefined) && (
          <p className={`mt-1 font-mono opacity-70 ${size === 'sm' ? 'text-[9px]' : 'text-[10px]'}`}>
            {data.headcount !== undefined && `${data.headcount}`}
            {data.headcount !== undefined && data.revenue !== undefined && ' / '}
            {data.revenue !== undefined && `$${data.revenue}M`}
          </p>
        )}
        {data.leader && (
          <p className={`mt-0.5 opacity-70 ${size === 'sm' ? 'text-[9px]' : 'text-[10px]'}`}>{data.leader}</p>
        )}
      </div>

      {panelOpen && (
        <DetailPanel
          title={data.name}
          subtitle={data.subPractice ? `${data.subPractice} · ${data.headcount ?? '?'} HC · $${data.revenue ?? '?'}M` : undefined}
          remit={data.remit}
          kpis={data.kpis}
          notes={data.notes}
          needsInfo={data.needsInfo}
          questions={data.questions}
          onClose={() => setPanelOpen(false)}
          onSave={(updated) => setData({ ...data, ...updated })}
        />
      )}
    </>
  );
}
