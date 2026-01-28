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
import styles from "./BaseNode.module.css";

export type BaseNodeData = {
  label?: string;
  icon?: string;
};

export type BaseNodeType = Node<BaseNodeData, "baseNode">;

export default function BaseNode({ data }: NodeProps<BaseNodeType>) {
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
      <Handle type="target" position={Position.Top} />
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
        <span className={styles.label}>{data?.label ?? "Base node"}</span>
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
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}
