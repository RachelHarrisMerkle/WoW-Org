'use client';

import { useState } from 'react';
import { AlertCircle, HelpCircle } from 'lucide-react';
import { OrgGroup, OrgUnit } from '../data/org-data';
import OrgNode from './OrgNode';
import FunctionalUnitCard from './FunctionalUnitCard';
import CraftLeadersRow from './CraftLeadersRow';
import DetailPanel from './DetailPanel';

interface OrgGroupCardProps {
  group: OrgGroup;
}

function UnitBlock({ unit }: { unit: OrgUnit }) {
  return (
    <div className="rounded bg-gray-50 border border-gray-200 p-2">
      <div className="flex items-center gap-1 mb-1.5">
        <p className="text-xs font-semibold text-gray-700 leading-tight">{unit.name}</p>
        {unit.needsInfo && <AlertCircle size={11} className="text-amber-500 flex-shrink-0" />}
      </div>
      {unit.notes && (
        <p className="text-[10px] text-gray-500 italic mb-1.5 leading-snug">{unit.notes}</p>
      )}
      {unit.leader && <OrgNode person={unit.leader} compact />}
      {unit.people && unit.people.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {unit.people.map((p) => (
            <OrgNode key={p.id} person={p} compact />
          ))}
        </div>
      )}
      {unit.subUnits && unit.subUnits.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {unit.subUnits.map((sub) => (
            <div key={sub.id} className="rounded bg-gray-200 border border-gray-300 px-2 py-1">
              <p className="text-[10px] font-medium text-gray-700">{sub.name}</p>
            </div>
          ))}
        </div>
      )}
      {unit.functionalUnits && unit.functionalUnits.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {unit.functionalUnits.map((fu) => (
            <FunctionalUnitCard key={fu.id} unit={fu} size="sm" />
          ))}
        </div>
      )}
      {unit.questions && unit.questions.length > 0 && (
        <div className="mt-2 pt-1.5 border-t border-dashed border-amber-200">
          {unit.questions.map((q, i) => (
            <div key={i} className="flex items-start gap-1 mt-0.5">
              <HelpCircle size={9} className="text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-[10px] text-amber-700">{q}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrgGroupCard({ group }: OrgGroupCardProps) {
  const [leaderPanelOpen, setLeaderPanelOpen] = useState(false);
  const [leaderData, setLeaderData] = useState(group.leader);

  return (
    <>
      <div className={`rounded-lg border-2 ${group.colorClass} bg-white overflow-hidden shadow-sm`}>
        <div className={`${group.headerColorClass} px-4 py-3 border-b ${group.colorClass.replace('border-', 'border-b-')}`}>
          <h3 className="text-sm font-bold text-gray-800 text-center">{group.name}</h3>
          {leaderData.name && leaderData.title && (
            <button
              onClick={() => setLeaderPanelOpen(true)}
              className="mt-1.5 mx-auto flex flex-col items-center cursor-pointer group"
            >
              <div className="bg-white border border-gray-300 rounded px-3 py-1.5 group-hover:border-red-400 group-hover:shadow-sm transition-all">
                <p className="text-xs font-semibold text-gray-900">{leaderData.name}</p>
                <p className="text-[10px] text-gray-500">{leaderData.title}</p>
              </div>
            </button>
          )}
        </div>

        <div className="p-3 flex flex-wrap gap-2">
          {group.units.map((unit) => (
            <UnitBlock key={unit.id} unit={unit} />
          ))}
        </div>

        {group.craftLeaders && (
          <div className="px-3 pb-3">
            <CraftLeadersRow craftLeaders={group.craftLeaders} />
          </div>
        )}
      </div>

      {leaderPanelOpen && (
        <DetailPanel
          title={leaderData.name}
          subtitle={leaderData.title}
          remit={leaderData.remit}
          kpis={leaderData.kpis}
          notes={leaderData.notes}
          needsInfo={leaderData.needsInfo}
          questions={leaderData.questions}
          onClose={() => setLeaderPanelOpen(false)}
          onSave={(updated) => setLeaderData({ ...leaderData, ...updated })}
        />
      )}
    </>
  );
}
