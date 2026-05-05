'use client';

import { useState } from 'react';
import { X, AlertCircle, ChevronDown, ChevronUp, Plus, Trash2, Users, BarChart2, FileText, HelpCircle, BookOpen } from 'lucide-react';
import { UnitDetail, ModelType, PersonEntry, ReportingType, MODEL_COLORS } from '../data/org-data';

interface DetailPanelProps {
  title: string;
  subtitle?: string;
  subPractice?: string;
  detail?: UnitDetail;
  onClose: () => void;
  onSave?: (detail: UnitDetail) => void;
}

const REPORTING_LABELS: Record<ReportingType, { label: string; style: string }> = {
  direct: { label: 'Direct Report', style: 'bg-blue-100 text-blue-700 border-blue-300' },
  matrix: { label: 'Dotted Line', style: 'bg-purple-100 text-purple-700 border-purple-300' },
  tbd: { label: 'TBD', style: 'bg-gray-100 text-gray-600 border-gray-300' },
  tbh: { label: 'TBH', style: 'bg-amber-100 text-amber-700 border-amber-300' },
};

function AccordionSection({
  icon,
  label,
  defaultOpen = false,
  children,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  badge?: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-100 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-gray-500">{icon}</span>
          <span className="text-sm font-semibold text-gray-800">{label}</span>
          {badge}
        </div>
        {open ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
      </button>
      {open && <div className="px-4 py-3 bg-white">{children}</div>}
    </div>
  );
}

export default function DetailPanel({ title, subtitle, subPractice, detail: initialDetail, onClose, onSave }: DetailPanelProps) {
  const [detail, setDetail] = useState<UnitDetail>(initialDetail ?? {});
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonTitle, setNewPersonTitle] = useState('');
  const [newPersonType, setNewPersonType] = useState<ReportingType>('direct');
  const [newPersonMatrix, setNewPersonMatrix] = useState('');
  const [newKpi, setNewKpi] = useState('');
  const [newQuestion, setNewQuestion] = useState('');

  const update = (patch: Partial<UnitDetail>) => setDetail((d) => ({ ...d, ...patch }));
  const updateModeling = (patch: object) => update({ modeling: { ...detail.modeling, ...patch } });

  const addPerson = () => {
    if (!newPersonName.trim()) return;
    const p: PersonEntry = {
      id: `person-${Date.now()}`,
      name: newPersonName.trim(),
      title: newPersonTitle.trim() || undefined,
      reportingType: newPersonType,
      matrixReportsTo: newPersonType === 'matrix' ? newPersonMatrix.trim() || undefined : undefined,
    };
    update({ people: [...(detail.people ?? []), p] });
    setNewPersonName(''); setNewPersonTitle(''); setNewPersonMatrix(''); setNewPersonType('direct');
  };

  const removePerson = (id: string) => update({ people: (detail.people ?? []).filter((p) => p.id !== id) });

  const addKpi = () => {
    if (!newKpi.trim()) return;
    update({ kpis: [...(detail.kpis ?? []), newKpi.trim()] });
    setNewKpi('');
  };

  const addQuestion = () => {
    if (!newQuestion.trim()) return;
    update({ questions: [...(detail.questions ?? []), newQuestion.trim()] });
    setNewQuestion('');
  };

  const handleSave = () => { onSave?.(detail); onClose(); };

  const modelOptions: { key: ModelType; label: string; color: string }[] = [
    { key: 'profit', label: 'Profit', color: 'bg-green-100 border-green-400 text-green-800' },
    { key: 'cost', label: 'Cost', color: 'bg-yellow-100 border-yellow-400 text-yellow-800' },
    { key: 'neutral', label: 'Neutral', color: 'bg-blue-100 border-blue-400 text-blue-800' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative w-full max-w-lg h-full bg-white shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-start justify-between px-5 py-4 border-b bg-white">
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-gray-900">{title}</h2>
              {subPractice && (
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border">
                  {subPractice}
                </span>
              )}
            </div>
            {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              {detail.modeling?.model && (
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${MODEL_COLORS[detail.modeling.model]}`}>
                  {detail.modeling.model.charAt(0).toUpperCase() + detail.modeling.model.slice(1)}
                </span>
              )}
              {detail.needsInfo && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-full">
                  <AlertCircle size={10} /> Needs more info
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 flex-shrink-0 mt-0.5">
            <X size={20} />
          </button>
        </div>

        {/* Needs Info Toggle */}
        <div className="px-5 py-2 border-b bg-gray-50 flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              onClick={() => update({ needsInfo: !detail.needsInfo })}
              className={`w-8 h-4 rounded-full transition-colors relative ${detail.needsInfo ? 'bg-amber-400' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${detail.needsInfo ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-xs text-gray-600">Flag: needs more info</span>
          </label>
        </div>

        {/* Accordion sections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">

          {/* Definition */}
          <AccordionSection icon={<BookOpen size={14} />} label="Definition & Remit" defaultOpen>
            <textarea
              value={detail.definition ?? ''}
              onChange={(e) => update({ definition: e.target.value })}
              rows={4}
              placeholder="What does this group own? What is their mandate and remit?"
              className="w-full text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            />
          </AccordionSection>

          {/* Modeling R&R */}
          <AccordionSection
            icon={<BarChart2 size={14} />}
            label="Modeling R&R"
            badge={detail.modeling?.model ? (
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ml-1 ${MODEL_COLORS[detail.modeling.model]}`}>
                {detail.modeling.model.toUpperCase()}
              </span>
            ) : undefined}
          >
            <div className="space-y-4">
              {/* Profit / Cost / Neutral */}
              <div>
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Model</p>
                <div className="flex gap-2">
                  {modelOptions.map(({ key, label, color }) => (
                    <button
                      key={key}
                      onClick={() => updateModeling({ model: key })}
                      className={`flex-1 py-2 rounded-lg border-2 text-xs font-bold transition-all ${
                        detail.modeling?.model === key
                          ? color + ' shadow-sm scale-105'
                          : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Size</p>
                <div className="flex gap-2">
                  {([['S', '<20 HC'], ['M', '<50 HC'], ['L', '>50 HC']] as const).map(([key, hint]) => (
                    <button
                      key={key}
                      onClick={() => updateModeling({ size: key })}
                      className={`flex-1 py-2 rounded-lg border-2 text-xs font-bold transition-all ${
                        detail.modeling?.size === key
                          ? 'bg-gray-800 border-gray-800 text-white scale-105'
                          : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300'
                      }`}
                    >
                      {key} <span className="font-normal opacity-70">({hint})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Percentages */}
              <div className="space-y-2">
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Breakdown (%)</p>
                {[
                  { key: 'demandCreation' as const, label: 'Demand Creation', hint: 'You source — Organic or new' },
                  { key: 'assistedSales' as const, label: 'Assisted Sales', hint: 'You materially contribute' },
                  { key: 'freebies' as const, label: 'Freebies', hint: 'You advise, protect, support' },
                  { key: 'utilization' as const, label: 'Utilization', hint: 'You bill' },
                ].map(({ key, label, hint }) => (
                  <div key={key} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-700">{label}</p>
                      <p className="text-[10px] text-gray-400 leading-tight">{hint}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min={0} max={100}
                        value={detail.modeling?.[key] ?? ''}
                        onChange={(e) => updateModeling({ [key]: e.target.value ? Number(e.target.value) : undefined })}
                        placeholder="—"
                        className="w-16 text-sm text-right border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-500"
                      />
                      <span className="text-xs text-gray-400">%</span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-16 bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-red-500 h-1.5 rounded-full transition-all"
                        style={{ width: `${Math.min(detail.modeling?.[key] ?? 0, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AccordionSection>

          {/* People */}
          <AccordionSection
            icon={<Users size={14} />}
            label="People"
            badge={
              detail.people && detail.people.length > 0 ? (
                <span className="ml-1 text-[10px] bg-gray-200 text-gray-600 rounded-full px-1.5 py-0.5 font-semibold">
                  {detail.people.length}
                </span>
              ) : undefined
            }
          >
            <div className="space-y-3">
              {/* Existing people */}
              {(detail.people ?? []).map((p) => (
                <div key={p.id} className={`flex items-start gap-2 rounded-lg p-2 border ${p.reportingType === 'matrix' ? 'border-dashed border-purple-300 bg-purple-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {p.reportingType === 'direct' && (
                        <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                      )}
                      <span className="text-sm font-semibold text-gray-900">{p.name}</span>
                      <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border ${REPORTING_LABELS[p.reportingType].style}`}>
                        {REPORTING_LABELS[p.reportingType].label}
                      </span>
                    </div>
                    {p.title && <p className="text-[11px] text-gray-500 mt-0.5">{p.title}</p>}
                    {p.matrixReportsTo && (
                      <p className="text-[10px] text-purple-600 mt-0.5">↳ Dotted line to: {p.matrixReportsTo}</p>
                    )}
                  </div>
                  <button onClick={() => removePerson(p.id)} className="text-gray-300 hover:text-red-400 flex-shrink-0 mt-0.5">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}

              {/* Add person */}
              <div className="rounded-lg border border-dashed border-gray-300 p-3 space-y-2">
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Add Person</p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={newPersonName}
                    onChange={(e) => setNewPersonName(e.target.value)}
                    placeholder="Name (or TBD / TBH)"
                    className="text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-red-500 col-span-2"
                  />
                  <input
                    value={newPersonTitle}
                    onChange={(e) => setNewPersonTitle(e.target.value)}
                    placeholder="Title (optional)"
                    className="text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                  <select
                    value={newPersonType}
                    onChange={(e) => setNewPersonType(e.target.value as ReportingType)}
                    className="text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-red-500"
                  >
                    <option value="direct">Direct Report</option>
                    <option value="matrix">Dotted Line</option>
                    <option value="tbd">TBD</option>
                    <option value="tbh">TBH</option>
                  </select>
                </div>
                {newPersonType === 'matrix' && (
                  <input
                    value={newPersonMatrix}
                    onChange={(e) => setNewPersonMatrix(e.target.value)}
                    placeholder="Dotted line to (who they report to)"
                    className="w-full text-xs border border-purple-200 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                )}
                <button
                  onClick={addPerson}
                  className="flex items-center gap-1 text-xs text-red-600 font-semibold hover:text-red-700"
                >
                  <Plus size={12} /> Add to list
                </button>
              </div>
            </div>
          </AccordionSection>

          {/* KPIs */}
          <AccordionSection icon={<BarChart2 size={14} />} label="KPIs">
            <div className="space-y-2">
              {(detail.kpis ?? []).map((kpi, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  <p className="text-sm text-gray-700 flex-1">{kpi}</p>
                  <button
                    onClick={() => update({ kpis: (detail.kpis ?? []).filter((_, j) => j !== i) })}
                    className="text-gray-300 hover:text-red-400"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  value={newKpi}
                  onChange={(e) => setNewKpi(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addKpi()}
                  placeholder="Add a KPI..."
                  className="flex-1 text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                <button onClick={addKpi} className="text-red-600 hover:text-red-700">
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </AccordionSection>

          {/* Notes & Questions */}
          <AccordionSection
            icon={<HelpCircle size={14} />}
            label="Notes & Open Questions"
            badge={
              (detail.questions ?? []).length > 0 ? (
                <span className="ml-1 text-[10px] bg-amber-100 text-amber-700 border border-amber-300 rounded-full px-1.5 py-0.5 font-semibold">
                  {detail.questions!.length} open
                </span>
              ) : undefined
            }
          >
            <div className="space-y-3">
              <textarea
                value={detail.notes ?? ''}
                onChange={(e) => update({ notes: e.target.value })}
                rows={3}
                placeholder="Internal notes, context, decisions..."
                className="w-full text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              />
              <div className="space-y-1.5">
                <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider flex items-center gap-1">
                  <AlertCircle size={10} /> Open Questions
                </p>
                {(detail.questions ?? []).map((q, i) => (
                  <div key={i} className="flex items-start gap-2 bg-amber-50 rounded px-2 py-1.5">
                    <HelpCircle size={11} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-800 flex-1">{q}</p>
                    <button
                      onClick={() => update({ questions: (detail.questions ?? []).filter((_, j) => j !== i) })}
                      className="text-amber-300 hover:text-red-400 flex-shrink-0"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addQuestion()}
                    placeholder="Add an open question..."
                    className="flex-1 text-xs border border-amber-200 bg-amber-50 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <button onClick={addQuestion} className="text-amber-500 hover:text-amber-600">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          </AccordionSection>

        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 bg-red-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-white border border-gray-200 text-gray-700 text-sm font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
