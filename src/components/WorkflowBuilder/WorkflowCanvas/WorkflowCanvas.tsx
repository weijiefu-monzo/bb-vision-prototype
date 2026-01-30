"use client";

import React, { useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  type Node,
  type Connection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { BaseNode } from "./BaseNode";
import type { BaseNodeType } from "./BaseNode";
import {
  InitialNode,
  TransformNode,
  JoinNode,
  BranchNode,
  OutputNode,
} from "./nodes";
import type { ConnectableNodeData } from "./nodes";
import { EdgeWithPlusButton } from "./edges";
import { ZoomControls } from "./ZoomControls";
import type { Edge } from "@xyflow/react";
import {
  WORKFLOW_NODE_PALETTE,
  WORKFLOW_NODE_DATA_TRANSFER,
  type WorkflowNodeTypeId,
} from "../workflowNodePalette";
import styles from "./WorkflowCanvas.module.css";

export type WorkflowNode = Node<ConnectableNodeData | BaseNodeType["data"], string>;

const nodeTypes = {
  baseNode: BaseNode,
  initialNode: InitialNode,
  transformNode: TransformNode,
  joinNode: JoinNode,
  branchNode: BranchNode,
  outputNode: OutputNode,
};

const edgeTypes = {
  edgeWithPlus: EdgeWithPlusButton,
};

const defaultEdgeOptions = { type: "edgeWithPlus" };

/** Target handle count by node type (for single-handle vs multi-handle logic). */
const TARGET_HANDLES_BY_TYPE: Record<string, number> = {
  initialNode: 0,
  transformNode: 1,
  joinNode: 2,
  branchNode: 1,
  outputNode: 1,
  baseNode: 1,
};

function sameTargetHandle(
  edgeTarget: string,
  edgeHandle: string | null | undefined,
  connTarget: string,
  connHandle: string | null | undefined,
  targetHandleCount: number
): boolean {
  if (edgeTarget !== connTarget) return false;
  const eh = edgeHandle ?? null;
  const ch = connHandle ?? null;
  // Single target handle: any edge to this node is to the same handle.
  if (targetHandleCount <= 1) return true;
  // Multiple handles: match by handle id (normalize null/undefined for default handle).
  return eh === ch;
}

const fitViewOptions = { maxZoom: 1, padding: 0.2, duration: 200 };

/** Estimated node size in pixels (for centering on drop). Matches BaseNode / ConnectableNode. */
const NODE_DROP_WIDTH_PX = 180;
const NODE_DROP_HEIGHT_PX = 56;

function WorkflowCanvasInner({
  initialNodes,
  initialEdges,
  isDraggingNodeFromPanel = false,
}: {
  initialNodes: WorkflowNode[];
  initialEdges: Edge[];
  isDraggingNodeFromPanel?: boolean;
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition, getZoom } = useReactFlow();
  const shouldFitView = initialNodes.length > 0;

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const raw =
        e.dataTransfer.getData(WORKFLOW_NODE_DATA_TRANSFER) ||
        e.dataTransfer.getData("application/x-workflow-node-type");
      let type: WorkflowNodeTypeId | "" = "";
      let label = "";
      let icon = "";
      if (raw.startsWith("{")) {
        try {
          const payload = JSON.parse(raw) as {
            type?: string;
            label?: string;
            icon?: string;
          };
          type = (payload.type as WorkflowNodeTypeId) ?? "";
          label = payload.label ?? "";
          icon = payload.icon ?? "";
        } catch {
          return;
        }
      } else {
        type = raw as WorkflowNodeTypeId;
        const paletteItem = WORKFLOW_NODE_PALETTE.find((item) => item.type === type);
        if (paletteItem) {
          label = paletteItem.label;
          icon = paletteItem.icon;
        }
      }
      const validTypes: WorkflowNodeTypeId[] = [
        "initialNode",
        "transformNode",
        "joinNode",
        "branchNode",
        "outputNode",
      ];
      if (!type || !validTypes.includes(type)) return;
      if (!label && !icon) {
        const fallback = WORKFLOW_NODE_PALETTE.find((item) => item.type === type);
        if (fallback) {
          label = fallback.label;
          icon = fallback.icon;
        }
      }
      const cursorFlow = screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      });
      const zoom = getZoom();
      const offsetX = (NODE_DROP_WIDTH_PX / zoom) / 2;
      const offsetY = (NODE_DROP_HEIGHT_PX / zoom) / 2;
      const position = {
        x: cursorFlow.x - offsetX,
        y: cursorFlow.y - offsetY,
      };
      const id = `node-${Date.now()}`;
      const newNode: WorkflowNode = {
        id,
        type,
        position,
        data: {
          label: label || type,
          icon: icon || undefined,
        },
      };
      setNodes((prev) => [...prev, newNode]);
    },
    [screenToFlowPosition, getZoom, setNodes]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onInit = useCallback(
    (instance: { fitView: (opts?: typeof fitViewOptions) => void }) => {
      if (initialNodes.length > 0) {
        instance.fitView(fitViewOptions);
      }
    },
    [initialNodes.length]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => {
        // Remove any existing edge(s) that connect to the same target handle.
        // The last connection wins: only one edge per target handle.
        const { target, targetHandle } = connection;
        const targetNode = nodes.find((n) => n.id === target);
        const typeHandleCount =
          (targetNode && TARGET_HANDLES_BY_TYPE[targetNode.type]) ?? 1;
        // Count preexisting connections to this target: distinct handles in use.
        const preexistingToTarget = eds.filter((e) => e.target === target);
        const distinctHandleCount = new Set(
          preexistingToTarget.map((e) => e.targetHandle ?? null)
        ).size;
        // Use type + preexisting: if we already have 2+ distinct handles, it's multi-handle.
        const targetHandleCount = Math.max(typeHandleCount, distinctHandleCount);

        const withoutExisting = eds.filter(
          (e) =>
            !sameTargetHandle(
              e.target,
              e.targetHandle,
              target,
              targetHandle,
              targetHandleCount
            )
        );
        return addEdge(connection, withoutExisting);
      });
    },
    [setEdges, nodes]
  );

  return (
    <div className={styles.canvas} data-workflow-canvas>
      {isDraggingNodeFromPanel && (
        <div
          className={styles.dropOverlay}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          aria-hidden
        />
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        fitView={shouldFitView}
        fitViewOptions={fitViewOptions}
        onInit={onInit}
        maxZoom={1}
        className={styles.flow}
        proOptions={{ hideAttribution: true }}
      >
        <ZoomControls />
      </ReactFlow>
    </div>
  );
}

export interface WorkflowCanvasProps {
  /** Nodes when editing an existing workflow; omit or empty for new workflow */
  initialNodes?: WorkflowNode[];
  /** Edges when editing an existing workflow */
  initialEdges?: Edge[];
  /** When true, show overlay to accept node drops from the side panel */
  isDraggingNodeFromPanel?: boolean;
  className?: string;
}

const emptyNodes: WorkflowNode[] = [];
const emptyEdges: Edge[] = [];

export default function WorkflowCanvas({
  initialNodes = emptyNodes,
  initialEdges = emptyEdges,
  isDraggingNodeFromPanel = false,
  className,
}: WorkflowCanvasProps) {
  return (
    <ReactFlowProvider>
      <div
        className={className ?? ""}
        style={{ flex: 1, minWidth: 0, height: "100%" }}
      >
        <WorkflowCanvasInner
          initialNodes={initialNodes}
          initialEdges={initialEdges}
          isDraggingNodeFromPanel={isDraggingNodeFromPanel}
        />
      </div>
    </ReactFlowProvider>
  );
}
