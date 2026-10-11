import { useState } from 'react';
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import { Braces, Share2, Cpu } from 'lucide-react';
import type { Status, ToolNodeData } from '../../data/session';

const statusUi: Record<Status, { label: string; bg: string; dot: string }> = {
  done: { label: 'Done', bg: 'bg-alert-green-bg', dot: 'bg-alert-green' },
  processing: { label: 'Processing', bg: 'bg-alert-info-bg', dot: 'bg-alert-info' },
  queued: { label: 'Queued', bg: 'bg-grey-20', dot: 'bg-grey-50' },
  approval: { label: 'Requires Approval', bg: 'bg-grey-20', dot: 'bg-grey-50' },
};

export default function ToolNode({ data }: NodeProps<Node<ToolNodeData, 'toolNode'>>) {
  const [logoOk, setLogoOk] = useState(true);
  const s = statusUi[data.status];
  const hidden = { opacity: 0, transform: 'scale(0.94) translateY(8px)', pointerEvents: 'none' as const };
  const shown = { opacity: 1, transform: 'none' };

  return (
    // Outer wrapper animates in; inner div carries the glass (backdrop-filter must not sit under a fading parent).
    <div style={{ width: 420, transition: 'opacity 400ms ease, transform 400ms ease', ...(data.visible ? shown : hidden) }}>
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} isConnectable={true} />
      <div
        className="rounded-lg p-3"
        style={{
          background: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.7)',
          boxShadow: 'var(--shadow-1), inset 0 1px 0 rgba(255,255,255,0.8)',
        }}
      >
        <div className="flex items-start gap-2">
          {logoOk ? (
            <img src={data.logo} alt="" className="w-8 h-8 rounded-md" onError={() => setLogoOk(false)} />
          ) : (
            <div className="w-8 h-8 rounded-md bg-grey-35" />
          )}
          <div className="flex-1 min-w-0">
            <p className="type-body-text text-grey-90 leading-tight">{data.name}</p>
            <p className="text-code-small text-grey-65">{data.subtitle}</p>
          </div>
          <Braces size={16} className="text-primary" />
          <Share2 size={16} className="text-primary" />
        </div>

        <ol className="mt-2 space-y-1">
          {data.steps.map((t, i) => (
            <li key={i} className="flex gap-2 type-body-small text-grey-80">
              <span className="text-small text-grey-50 pt-px">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-small text-grey-90 pt-px">{t}</span>
            </li>
          ))}
        </ol>

        <div className="mt-2 flex items-center justify-between">
          {data.tokens ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-grey-90 text-white px-2 py-0.5 text-caption">
              <Cpu size={9} />{data.tokens}
            </span>
          ) : <span />}
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-caption ${s.bg} text-grey-80`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{s.label}
          </span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} isConnectable={false} />
    </div>
  );
}
