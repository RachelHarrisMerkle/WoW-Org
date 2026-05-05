'use client';

import { orgData, toBeConfirmed, mrBusiness, SUB_PRACTICE_COLORS, SUB_PRACTICE_LIGHT, SubPractice } from '../data/org-data';
import FunctionalUnitCard from './FunctionalUnitCard';

const SUB_PRACTICE_LABELS: Record<SubPractice, string> = {
  DX: 'DX',
  CRM: 'CRM',
  CDS: 'CDS',
  Analytics: 'Analytics',
  Strategy: 'Strategy',
};

const SUB_PRACTICE_COUNTS: Record<SubPractice, { headcount: number; label: string }> = {
  DX: { headcount: 1253, label: 'DX' },
  CRM: { headcount: 576, label: 'CRM' },
  CDS: { headcount: 521, label: 'CDS' },
  Analytics: { headcount: 1993, label: 'Analytics' },
  Strategy: { headcount: 120, label: 'Strategy' },
};

function Legend() {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <span className="text-xs text-gray-500 font-medium">Current Sub-Practice:</span>
      {(Object.entries(SUB_PRACTICE_LABELS) as [SubPractice, string][]).map(([key, label]) => (
        <div key={key} className="flex items-center gap-1.5">
          <div className={`w-3 h-3 rounded-full ${SUB_PRACTICE_COLORS[key]}`} />
          <span className="text-xs font-semibold text-gray-700">{label}</span>
          <span className="text-xs text-gray-400">{SUB_PRACTICE_COUNTS[key].headcount.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

export default function CapabilityView() {
  const dbt = orgData.find((g) => g.id === 'dbt');
  const ddm = orgData.find((g) => g.id === 'ddm');

  const dbtFunctional = dbt?.units.find((u) => u.id === 'dbt-functional');
  const ddmPlm = ddm?.units.find((u) => u.id === 'ddm-plm');
  const ddmCrm = ddm?.units.find((u) => u.id === 'ddm-crm');
  const ddmCustAnalytics = ddm?.units.find((u) => u.id === 'ddm-customer-analytics');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Business Units: Capability Mix</h2>
        <Legend />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* DBT */}
        <div className="rounded-lg border-2 border-blue-200 bg-blue-50/40 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">Digital Business Transformation</h3>
            <span className="text-xs text-gray-500 font-mono">2052 / $228</span>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <p className="text-xs font-semibold text-blue-700 mb-1.5">DX — 1253 / $156</p>
              <div className="flex flex-wrap gap-1.5">
                {['dx-commerce', 'ugam-ds'].map((id) => {
                  const unit = dbtFunctional?.functionalUnits?.find((u) => u.id === id);
                  return unit ? <FunctionalUnitCard key={id} unit={unit} size="sm" /> : null;
                })}
                {['Experience Design', 'Commerce', 'Content Technology', 'Digital Product Engineering', 'Extentia'].map((name) => (
                  <div key={name} className={`rounded border px-2 py-1 ${SUB_PRACTICE_LIGHT.DX} text-[10px] font-medium`}>
                    {name}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-yellow-700 mb-1.5">Analytics</p>
              <div className="flex flex-wrap gap-1.5">
                {dbtFunctional?.functionalUnits
                  ?.filter((u) => u.subPractice === 'Analytics')
                  .map((unit) => <FunctionalUnitCard key={unit.id} unit={unit} size="sm" />)}
              </div>
            </div>
          </div>
        </div>

        {/* DDM */}
        <div className="rounded-lg border-2 border-blue-200 bg-blue-50/40 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">Data-Driven Marketing</h3>
            <span className="text-xs text-gray-500 font-mono">1611 / $326</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-1.5">PLM — 576 / $115</p>
              <div className="flex flex-col gap-1">
                {ddmPlm?.functionalUnits?.map((unit) => (
                  <FunctionalUnitCard key={unit.id} unit={unit} size="sm" />
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-purple-700 mb-1.5">CRM</p>
              <div className="flex flex-col gap-1">
                {ddmCrm?.functionalUnits?.map((unit) => (
                  <FunctionalUnitCard key={unit.id} unit={unit} size="sm" />
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-1.5">Customer Analytics</p>
              <div className="flex flex-col gap-1">
                {ddmCustAnalytics?.functionalUnits?.map((unit) => (
                  <FunctionalUnitCard key={unit.id} unit={unit} size="sm" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* To Be Confirmed + MR Business */}
      <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">To Be Confirmed</span>
          <div className="flex gap-2">
            {toBeConfirmed.map((unit) => (
              <FunctionalUnitCard key={unit.id} unit={unit} size="sm" />
            ))}
          </div>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-4">MR Business</span>
          <div className="flex gap-2">
            {mrBusiness.map((unit) => (
              <FunctionalUnitCard key={unit.id} unit={unit} size="sm" />
            ))}
          </div>
        </div>
        <p className="text-[10px] text-gray-400 mt-2">** Feasibility of splitting Ugam still under discussion</p>
      </div>
    </div>
  );
}
