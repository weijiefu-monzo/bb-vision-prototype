"use client";

import React, { memo } from "react";
import {
  BaseEdge,
  getSimpleBezierPath,
  EdgeLabelRenderer,
  type EdgeProps,
} from "@xyflow/react";
import { IconButton } from "@/components";
import styles from "./EdgeWithPlusButton.module.css";

function EdgeWithPlusButton({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  markerEnd,
  markerStart,
}: EdgeProps) {
  const [path, labelX, labelY] = getSimpleBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onPlusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Placeholder: could open a menu to add a node, or trigger callback via edge data
  };

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        style={style}
        markerEnd={markerEnd}
        markerStart={markerStart}
      />
      <EdgeLabelRenderer>
        <div
          className={`${styles.plusButtonWrapper} nodrag nopan`}
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
        >
          <IconButton
            type="button"
            className={styles.plusButton}
            icon="action_plus"
            variant="primary"
            size="small"
            iconSize="medium"
            onClick={onPlusClick}
            aria-label="Add node on edge"
          />
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default memo(EdgeWithPlusButton);
