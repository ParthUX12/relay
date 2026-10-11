import { useEffect, useMemo } from 'react';
import {
  ReactFlow, ReactFlowProvider, Background, BackgroundVariant, MarkerType, useNodesState, useViewport,
  type Node, type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Maximize2, Minimize2 } from 'lucide-react';
import ToolNode from './ToolNode';
import { nodeSeeds, edgeSeeds } from '../../data/session';

const nodeTypes = { toolNode: ToolNode };

type Props = {
  revealed: number;            // how many nodes are visible (0..6), in nodeSeeds order
  expanded?: boolean;
  onToggleExpand?: () => void;
};

function Inner({ revealed, expanded, onToggleExpand }: Props) {
  const { zoom } = useViewport();

  const initialNodes = useMemo(() => nodeSeeds.map((n, i) => ({
    id: n.id, type: 'toolNode' as const, position: n.position,
    data: { ...n.data, visible: i < revealed }, draggable: true,
  })), []);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  useEffect(() => {
    setNodes((currentNodes) => currentNodes.map((node, index) => ({
      ...node,
      data: { ...node.data, visible: index < revealed },
    })));
  }, [revealed, setNodes]);

  const edges: Edge[] = useMemo(() => {
    const idx = (id: string) => nodeSeeds.findIndex((n) => n.id === id);
    return edgeSeeds.map((e) => ({
      ...e, type: 'smoothstep', className: 'edge-in',
      hidden: !(idx(e.source) < revealed && idx(e.target) < revealed),
      style: { stroke: '#716b6b', strokeWidth: 1 }, animated: true,
      markerEnd: { type: MarkerType.ArrowClosed, color: '#716b6b', width: 6, height: 16 },
    }));
  }, [revealed]);

  return (
    <div className="relative h-full flex flex-col rounded-[24px] bg-grey-10 shadow-1 overflow-hidden">
      <style>{`.edge-in{animation:edgein 400ms ease-out both}@keyframes edgein{from{opacity:0}to{opacity:1}}`}</style>
      {/* soft blobs so the glass has something to blur */}
      <div className="pointer-events-none absolute -top-10 right-10 w-72 h-72 rounded-full blur-3xl opacity-40" style={{ background: 'var(--color-primary-bg)' }} />
      <div className="pointer-events-none absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl opacity-40" style={{ background: 'var(--grey-35)' }} />

      <header className="relative z-10 flex items-center justify-between pl-4 pr-2 pt-2 pb-2">
        <h2 className="type-title-text">Orchestration flow</h2>
        <div className="flex items-center rounded-full border border-grey-35 bg-grey-10 h-10">
          <span className="px-4 type-body-text">{Math.round(zoom * 100)}%</span>
          <span className="w-px h-5 bg-grey-35" />
          <button aria-label="Toggle fullscreen" onClick={onToggleExpand} className="px-3 h-full text-grey-90">
            {expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </header>

      <div className="relative flex-1">
        <ReactFlow
          nodes={nodes} edges={edges} nodeTypes={nodeTypes} onNodesChange={onNodesChange}
          fitView fitViewOptions={{ padding: 0.1 }}
          minZoom={0.2} maxZoom={2}
          zoomOnScroll zoomOnPinch panOnDrag
          nodesConnectable={false} nodesDraggable
        >
          <Background variant={BackgroundVariant.Dots} gap={40} size={2} color="#dcd7d7" />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function FlowCanvas(props: Props) {
  return <ReactFlowProvider><Inner {...props} /></ReactFlowProvider>;
}
