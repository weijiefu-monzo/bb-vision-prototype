"use client";

import React, { useCallback } from "react";
import { Icon } from "@/components";
import {
  WORKFLOW_NODE_DATA_TRANSFER,
  type WorkflowNodePaletteItem,
} from "../../workflowNodePalette";
import styles from "./NodePaletteItem.module.css";

export interface NodePaletteItemProps {
  /** Palette item (type, label, icon) */
  item: WorkflowNodePaletteItem;
  /** Called when user starts dragging this item */
  onDragStart?: () => void;
  /** Called when user ends dragging (drop or cancel) */
  onDragEnd?: () => void;
}

export default function NodePaletteItem({
  item,
  onDragStart,
  onDragEnd,
}: NodePaletteItemProps) {
  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setData(
        WORKFLOW_NODE_DATA_TRANSFER,
        JSON.stringify({ type: item.type, label: item.label, icon: item.icon }),
      );
      e.dataTransfer.effectAllowed = "move";
      onDragStart?.();

      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      const clone = target.cloneNode(true) as HTMLElement;
      clone.style.position = "fixed";
      clone.style.left = "-9999px";
      clone.style.top = "0";
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      clone.style.boxSizing = "border-box";
      clone.style.borderRadius = "var(--corner-radius-medium, 16px)";
      clone.style.overflow = "hidden";
      clone.style.pointerEvents = "none";
      document.body.appendChild(clone);
      e.dataTransfer.setDragImage(clone, rect.width / 2, rect.height / 2);
      setTimeout(() => clone.remove(), 0);
    },
    [item.type, item.label, item.icon, onDragStart],
  );

  return (
    <li className={styles.item}>
      <div
        className={styles.dragWrapper}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={() => {
          onDragEnd?.();
        }}
        role="button"
        tabIndex={0}
        aria-label={`Add ${item.label} node`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            (e.currentTarget as HTMLDivElement).focus();
          }
        }}
      >
        <div className={styles.content}>
          <Icon
            name={item.icon}
            size="large"
            color="semantic-content-primary"
          />
          <span className={styles.label}>{item.label}</span>
        </div>
      </div>
    </li>
  );
}
