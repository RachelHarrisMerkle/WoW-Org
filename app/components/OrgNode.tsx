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
  const [detail, setDetail] = useState(person.detail);

  const hasChildren = person.subPeople && person.subPeople.length > 0;
  const isMatrix = person.reportingType === 'matrix';
  const isTbd = person.reportingType === 'tbd' || person.reportingType === 'tbh';
  const isDirectReport = person.isPeteDirectReport || person.reportingType === 'direct';

  const borderStyle = isMatrix
    ? 'border-dashed border-purple-300'
    : isTbd
    ? 'border-dashed border-gray-300'
    : highlighted
    ? 'border-gray-600'
    : 'border-gray-300';

  const bgStyle = isMatrix
    ? 'bg-purple-50'
    : isTbd
    ? 'bg-gray-50'
    : highlighted
    ? 'bg-gray-700'
    : 'bg-white';

  return (
    <>
      <div className="flex flex-col items-start">
        <div
          onClick={() => setPanelOpen(true)}
          className={`
            relative cursor-pointer rounded border px-3 py-2 text-left transition-all group
            ${borderStyle} ${bgStyle}
            hover:border-red-400 hover:shadow-sm
            ${compact ? 'min-w-[120px]' : 'min-w-[150px]'}
          `}
        >
          {/* Pete direct-report blue dot */}
          {isDirectReport && !isMatrix && (
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm" />
          )}

          <div className="flex items-start justify-between gap-1">
            <div className="flex-1 min-w-0">
              <p className={`font-semibold truncate ${compact ? 'text-[11px]' : 'text-sm'} ${highlighted ? 'text-white' : isTbd ? 'text-gray-400 italic' : 'text-gray-900'}`}>
                {person.name}
              </p>
              {person.title && (
                <p className={`truncate mt-0.5 ${compact ? 'text-[10px]' : 'text-xs'} ${highlighted ? 'text-gray-300' : 'text-gray-500'}`}>
                  {person.title}
                </p>
              )}
              {isMatrix && person.matrixReportsTo && (
                <p className="text-[9px] text-purple-500 truncate mt-0.5">↳ {person.matrixReportsTo}</p>
              )}
            </div>
            {detail?.needsInfo && (
              <AlertCircle size={12} className="text-amber-500 mt-0.5 flex-shrink-0" />
            )}
          </div>

          {/* Matrix label */}
          {isMatrix && (
            <div className="mt-1">
              <span className="text-[9px] font-semibold text-purple-500 border border-dashed border-purple-300 px-1 rounded">
                dotted line
              </span>
            </div>
          )}

          {hasChildren && (
            <button
              onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
              className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 rounded-full p-0.5 shadow border bg-white border-gray-300 text-gray-500 hover:border-red-400 hover:text-red-500"
            >
              {open ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
            </button>
          )}
        </div>

        {hasChildren && open && (
          <div className="mt-4 ml-3 flex flex-wrap gap-2">
            {person.subPeople!.map((sub) => (
              <OrgNode key={sub.id} person={sub} compact />
            ))}
          </div>
        )}
      </div>

      {panelOpen && (
        <DetailPanel
          title={person.name}
          subtitle={person.title}
          detail={detail}
          onClose={() => setPanelOpen(false)}
          onSave={(updated) => setDetail(updated)}
        />
      )}
    </>
  );
}
