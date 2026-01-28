"use client";

import React, { useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
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

function WorkflowCanvasInner({
  initialNodes,
  initialEdges,
}: {
  initialNodes: WorkflowNode[];
  initialEdges: Edge[];
}) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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
        fitView={false}
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
  className?: string;
}

const emptyNodes: WorkflowNode[] = [];
const emptyEdges: Edge[] = [];

export default function WorkflowCanvas({
  initialNodes = emptyNodes,
  initialEdges = emptyEdges,
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
        />
      </div>
    </ReactFlowProvider>
  );
}
