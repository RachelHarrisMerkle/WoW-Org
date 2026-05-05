import { CraftLeaders, SUB_PRACTICE_LIGHT } from '../data/org-data';

interface CraftLeadersRowProps {
  craftLeaders: CraftLeaders;
}

const CRAFT_COLORS: Record<string, string> = {
  strategy: SUB_PRACTICE_LIGHT.Strategy,
  technology: SUB_PRACTICE_LIGHT.DX,
  design: 'bg-gray-100 border-gray-400 text-gray-800',
  analytics: SUB_PRACTICE_LIGHT.Analytics,
};

export default function CraftLeadersRow({ craftLeaders }: CraftLeadersRowProps) {
  const crafts = [
    { key: 'strategy', label: 'Strategy', data: craftLeaders.strategy },
    { key: 'technology', label: 'Technology', data: craftLeaders.technology },
    { key: 'design', label: 'Design', data: craftLeaders.design },
    { key: 'analytics', label: 'Analytics', data: craftLeaders.analytics },
  ];

  return (
    <div className="mt-3 pt-2 border-t border-dashed border-gray-300">
      <p className="text-[10px] text-gray-400 mb-1.5">
        Craft Leaders — dotted line to Craft Lead, solid to BU Lead
      </p>
      <div className="flex gap-2 flex-wrap">
        {crafts.map(({ key, label, data }) => (
          <div
            key={key}
            className={`rounded border px-2 py-1 min-w-[80px] text-center ${CRAFT_COLORS[key]}`}
          >
            <p className="text-[10px] font-semibold">{label}</p>
            <p className="text-[10px] mt-0.5">{data?.name ?? 'TBD'}</p>
            {data?.reportTo && (
              <p className="text-[9px] opacity-60 italic">{data.reportTo}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
