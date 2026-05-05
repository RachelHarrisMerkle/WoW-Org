'use client';

import { AlertCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { OrgPerson } from '../data/org-data';
import DetailPanel from './DetailPanel';

interface OrgNodeProps {
  person: OrgPerson;
  compact?: boolean;
  highlighted?: boolean;
}

export default function OrgNode({ person, compact = false, highlighted = false }: OrgNodeProps) {
  const [open, setOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [data, setData] = useState(person);

  const hasChildren = data.subPeople && data.subPeople.length > 0;

  return (
    <>
      <div className="flex flex-col items-start">
        <div
          onClick={() => setPanelOpen(true)}
          className={`
            relative cursor-pointer rounded border px-3 py-2 text-left transition-all group
            ${highlighted ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 hover:border-red-400 hover:shadow-sm'}
            ${compact ? 'min-w-[120px]' : 'min-w-[150px]'}
          `}
        >
          <div className="flex items-start justify-between gap-1">
            <div className="flex-1 min-w-0">
              <p className={`font-semibold truncate ${compact ? 'text-xs' : 'text-sm'} ${highlighted ? 'text-white' : 'text-gray-900'}`}>
                {data.name}
              </p>
              <p className={`truncate mt-0.5 ${compact ? 'text-[10px]' : 'text-xs'} ${highlighted ? 'text-gray-300' : 'text-gray-500'}`}>
                {data.title}
              </p>
            </div>
            {data.needsInfo && (
              <AlertCircle size={12} className="text-amber-500 mt-0.5 flex-shrink-0" />
            )}
          </div>
          {hasChildren && (
            <button
              onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
              className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 rounded-full p-0.5 shadow border text-xs ${highlighted ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-500 hover:border-red-400 hover:text-red-500'}`}
            >
              {open ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
            </button>
          )}
        </div>

        {hasChildren && open && (
          <div className="mt-4 ml-3 flex flex-wrap gap-2">
            {data.subPeople!.map((sub) => (
              <OrgNode key={sub.id} person={sub} compact />
            ))}
          </div>
        )}
      </div>

      {panelOpen && (
        <DetailPanel
          title={data.name}
          subtitle={data.title}
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
