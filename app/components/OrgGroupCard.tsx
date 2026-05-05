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
  const [panelOpen, setPanelOpen] = useState(false);
  const [detail, setDetail] = useState(unit.detail);
  const needsInfo = detail?.needsInfo;

  return (
    <>
      <div className="rounded bg-gray-50 border border-gray-200 p-2">
        <div
          className="flex items-center gap-1 mb-1.5 cursor-pointer hover:text-red-600 group"
          onClick={() => setPanelOpen(true)}
        >
          <p className="text-xs font-semibold text-gray-700 group-hover:text-red-600 leading-tight flex-1">{unit.name}</p>
          {needsInfo && <AlertCircle size={11} className="text-amber-500 flex-shrink-0" />}
        </div>
        {detail?.notes && (
          <p className="text-[10px] text-gray-500 italic mb-1.5 leading-snug">{detail.notes}</p>
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
        {detail?.questions && detail.questions.length > 0 && (
          <div className="mt-2 pt-1.5 border-t border-dashed border-amber-200">
            {detail.questions.map((q, i) => (
              <div key={i} className="flex items-start gap-1 mt-0.5">
                <HelpCircle size={9} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-[10px] text-amber-700">{q}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {panelOpen && (
        <DetailPanel
          title={unit.name}
          detail={detail}
          onClose={() => setPanelOpen(false)}
          onSave={(updated) => setDetail(updated)}
        />
      )}
    </>
  );
}

export default function OrgGroupCard({ group }: OrgGroupCardProps) {
  const [leaderPanelOpen, setLeaderPanelOpen] = useState(false);
  const [leaderDetail, setLeaderDetail] = useState(group.leader.detail);
  const [groupPanelOpen, setGroupPanelOpen] = useState(false);
  const [groupDetail, setGroupDetail] = useState(group.detail);

  return (
    <>
      <div className={`rounded-lg border-2 ${group.colorClass} bg-white overflow-hidden shadow-sm`}>
        {/* Group header */}
        <div className={`${group.headerColorClass} px-4 py-3 border-b ${group.colorClass.replace('border-', 'border-b-')}`}>
          <button
            onClick={() => setGroupPanelOpen(true)}
            className="w-full text-sm font-bold text-gray-800 text-center hover:text-red-600 transition-colors"
          >
            {group.name}
          </button>

          {group.leader.name && group.leader.title && (
            <div className="mt-1.5 flex justify-center">
              <button
                onClick={() => setLeaderPanelOpen(true)}
                className="relative bg-white border border-gray-300 rounded px-3 py-1.5 hover:border-red-400 hover:shadow-sm transition-all group text-left"
              >
                {/* Pete direct-report blue dot */}
                {group.isPeteDirectReport && (
                  <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm" />
                )}
                <p className="text-xs font-semibold text-gray-900 group-hover:text-red-700">{group.leader.name}</p>
                <p className="text-[10px] text-gray-500">{group.leader.title}</p>
              </button>
            </div>
          )}

          {/* Legend for this group's direct report dot */}
          {group.isPeteDirectReport && (
            <p className="text-center text-[9px] text-blue-500 mt-1 opacity-70">● Pete Stein direct report</p>
          )}
        </div>

        {/* Units */}
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

      {/* Leader panel */}
      {leaderPanelOpen && (
        <DetailPanel
          title={group.leader.name}
          subtitle={group.leader.title}
          detail={leaderDetail}
          onClose={() => setLeaderPanelOpen(false)}
          onSave={(updated) => setLeaderDetail(updated)}
        />
      )}

      {/* Group panel */}
      {groupPanelOpen && (
        <DetailPanel
          title={group.name}
          detail={groupDetail}
          onClose={() => setGroupPanelOpen(false)}
          onSave={(updated) => setGroupDetail(updated)}
        />
      )}
    </>
  );
}
