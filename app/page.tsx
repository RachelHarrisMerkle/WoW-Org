'use client';

import { useState } from 'react';
import { orgData } from './data/org-data';
import OrgGroupCard from './components/OrgGroupCard';
import CapabilityView from './components/CapabilityView';

type Tab = 'org' | 'capability';

export default function Home() {
  const [tab, setTab] = useState<Tab>('org');

  const topRow = orgData.filter((g) => g.id === 'gtm' || g.id === 'ops');
  const bottomLeft = orgData.find((g) => g.id === 'dbt');
  const bottomMiddle = orgData.filter((g) => g.id === 'advisory' || g.id === 'design');
  const bottomRight = orgData.find((g) => g.id === 'ddm');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-screen-2xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-red-600 rounded-sm" />
              <span className="text-sm font-bold text-gray-900 tracking-tight">merkle</span>
            </div>
            <div className="w-px h-5 bg-gray-300" />
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">Ways of Working</h1>
              <p className="text-[10px] text-gray-400 leading-tight">Merkle Americas · Future State</p>
            </div>
          </div>

          <nav className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {(['org', 'capability'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  tab === t
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t === 'org' ? 'Org Structure' : 'Capability Mix'}
              </button>
            ))}
          </nav>

          <div className="text-xs text-gray-400">Pete Stein Direct Reports</div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-6 py-6">
        {tab === 'org' && (
          <div className="space-y-4">
            {/* Top Row: GTM & Operations */}
            <div className="grid grid-cols-2 gap-4">
              {topRow.map((group) => (
                <OrgGroupCard key={group.id} group={group} />
              ))}
            </div>

            {/* Bottom Row: DBT | Advisory+Design | DDM */}
            <div className="grid grid-cols-[1fr_280px_1fr] gap-4 items-start">
              {bottomLeft && <OrgGroupCard group={bottomLeft} />}
              <div className="flex flex-col gap-4">
                {bottomMiddle.map((group) => (
                  <OrgGroupCard key={group.id} group={group} />
                ))}
              </div>
              {bottomRight && <OrgGroupCard group={bottomRight} />}
            </div>

            <p className="text-center text-[10px] text-gray-400 mt-4">
              Click any box to view or edit remit, KPIs, and notes. &nbsp;·&nbsp; Amber indicators = needs more info.
            </p>
          </div>
        )}

        {tab === 'capability' && <CapabilityView />}
      </main>
    </div>
  );
}
