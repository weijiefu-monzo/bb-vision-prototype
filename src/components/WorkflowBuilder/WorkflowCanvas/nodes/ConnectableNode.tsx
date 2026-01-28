"use client";

import React, { useCallback } from "react";
import {
  Handle,
  Position,
  useNodeId,
  useReactFlow,
  getConnectedEdges,
  type NodeProps,
  type Node,
} from "@xyflow/react";
import { Icon, IconButton } from "@/components";
import type { BaseNodeData } from "../BaseNode";
import styles from "../BaseNode/BaseNode.module.css";

export type ConnectableNodeData = BaseNodeData;

export type ConnectableNodeType = Node<ConnectableNodeData, string>;

export type ConnectableNodeProps = NodeProps<ConnectableNodeType> & {
  targetCount: number;
  sourceCount: number;
};

function getHandlePosition(count: number, index: number): string {
  if (count <= 1) return "50%";
  const step = 100 / (count + 1);
  return `${step * (index + 1)}%`;
}

export default function ConnectableNode({
  data,
  targetCount,
  sourceCount,
}: ConnectableNodeProps) {
  const nodeId = useNodeId();
  const { deleteElements, getNode, getEdges } = useReactFlow();

  const handleDelete = useCallback(() => {
    if (!nodeId) return;
    const node = getNode(nodeId);
    if (node) {
      const edges = getEdges();
      const connectedEdges = getConnectedEdges([node], edges);
      deleteElements({ nodes: [node], edges: connectedEdges });
    }
  }, [nodeId, deleteElements, getNode, getEdges]);

  return (
    <>
      {Array.from({ length: targetCount }, (_, i) => (
        <Handle
          key={`target-${i}`}
          type="target"
          position={Position.Top}
          id={`target-${i}`}
          style={{
            left: getHandlePosition(targetCount, i),
            transform: "translate(-50%, 0)",
          }}
        />
      ))}
      <div className={styles.baseNode}>
        {data?.icon && (
          <div className={styles.iconSlot}>
            <Icon
              name={data.icon}
              size="large"
              color="semantic-content-primary"
            />
          </div>
        )}
        <span className={styles.label}>{data?.label ?? "Node"}</span>
        <div className={styles.actions}>
          <IconButton
            className="nodrag nopan"
            icon="action_edit_pencil"
            variant="tertiary"
            size="medium"
            iconSize="medium"
            aria-label="Edit"
          />
          <IconButton
            className="nodrag nopan"
            icon="action_delete"
            variant="tertiary"
            size="medium"
            iconSize="medium"
            aria-label="Delete"
            onClick={handleDelete}
          />
        </div>
      </div>
      {Array.from({ length: sourceCount }, (_, i) => (
        <Handle
          key={`source-${i}`}
          type="source"
          position={Position.Bottom}
          id={`source-${i}`}
          style={{
            left: getHandlePosition(sourceCount, i),
            transform: "translate(-50%, 0)",
          }}
        />
      ))}
    </>
  );
}
