'use client';

import { useState } from 'react';
import { X, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface DetailPanelProps {
  title: string;
  subtitle?: string;
  remit?: string;
  kpis?: string[];
  notes?: string;
  needsInfo?: boolean;
  questions?: string[];
  onClose: () => void;
  onSave?: (data: { remit: string; kpis: string[]; notes: string; questions: string[] }) => void;
}

export default function DetailPanel({
  title,
  subtitle,
  remit = '',
  kpis = [],
  notes = '',
  needsInfo = false,
  questions = [],
  onClose,
  onSave,
}: DetailPanelProps) {
  const [editRemit, setEditRemit] = useState(remit);
  const [editKpis, setEditKpis] = useState(kpis.join('\n'));
  const [editNotes, setEditNotes] = useState(notes);
  const [editQuestions, setEditQuestions] = useState(questions.join('\n'));
  const [showKpis, setShowKpis] = useState(true);
  const [showQuestions, setShowQuestions] = useState(true);

  const handleSave = () => {
    onSave?.({
      remit: editRemit,
      kpis: editKpis.split('\n').filter(Boolean),
      notes: editNotes,
      questions: editQuestions.split('\n').filter(Boolean),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-start justify-between p-5 border-b bg-gray-50">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
            {needsInfo && (
              <span className="inline-flex items-center gap-1 mt-1.5 text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                <AlertCircle size={11} /> Needs more info
              </span>
            )}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 ml-4 mt-0.5">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Remit / What they own
            </label>
            <textarea
              value={editRemit}
              onChange={(e) => setEditRemit(e.target.value)}
              rows={4}
              placeholder="Describe the remit and ownership for this group..."
              className="w-full text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            />
          </div>

          <div>
            <button
              onClick={() => setShowKpis(!showKpis)}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 w-full"
            >
              KPIs
              {showKpis ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
            {showKpis && (
              <textarea
                value={editKpis}
                onChange={(e) => setEditKpis(e.target.value)}
                rows={3}
                placeholder="One KPI per line..."
                className="w-full text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Notes
            </label>
            <textarea
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              rows={3}
              placeholder="Internal notes, context, decisions..."
              className="w-full text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            />
          </div>

          <div>
            <button
              onClick={() => setShowQuestions(!showQuestions)}
              className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1.5 w-full"
            >
              <AlertCircle size={13} />
              Open Questions
              {showQuestions ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
            {showQuestions && (
              <textarea
                value={editQuestions}
                onChange={(e) => setEditQuestions(e.target.value)}
                rows={3}
                placeholder="One question per line..."
                className="w-full text-sm border border-amber-200 bg-amber-50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
              />
            )}
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50 flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 bg-red-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-red-700 transition-colors"
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
