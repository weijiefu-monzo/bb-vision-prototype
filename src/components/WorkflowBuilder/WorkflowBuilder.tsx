"use client";

import React, { useState } from "react";
import type { Edge } from "@xyflow/react";
import { IconButton, FullscreenDialog, FullscreenDialogHeader } from "@/components";
import { WorkflowCanvas, type WorkflowNode } from "./WorkflowCanvas";
import { WorkflowSidePanel } from "./WorkflowSidePanel";
import styles from "./WorkflowBuilder.module.css";

export interface Workflow {
  /** Display title in the header (e.g. "Workflow Builder") */
  title: string;
  /** Item label (e.g. "Untitled workflow") */
  itemLabel?: string;
  /** Item caption (e.g. "last updated 12:03 on March 1 2026") */
  itemCaption?: string;
  /** Optional id for identifying the workflow */
  id?: string;
  /** Nodes to show when editing an existing workflow (empty = new workflow) */
  nodes?: WorkflowNode[];
  /** Edges to show when editing an existing workflow */
  edges?: Edge[];
  /** Extensible for future workflow-specific data */
  [key: string]: unknown;
}

export interface WorkflowBuilderProps {
  open: boolean;
  onClose: () => void;
  /** Workflow data used to drive the header and future builder UI */
  workflow: Workflow;
  className?: string;
}

export default function WorkflowBuilder({
  open,
  onClose,
  workflow,

  className,
}: WorkflowBuilderProps) {
  const [sidePanelOpen, setSidePanelOpen] = useState(true);

  const headerTrailing = (
    <div className={styles.headerTrailing}>
      <div className={styles.actionGroup}>
        <IconButton
          variant="tertiary"
          size="medium"
          icon={
            sidePanelOpen
              ? "navigation_chevron_right_2"
              : "navigation_chevron_left_2"
          }
          aria-label={
            sidePanelOpen ? "Collapse side panel" : "Expand side panel"
          }
          onClick={() => setSidePanelOpen((prev) => !prev)}
        />
      </div>
      <div className={styles.actionGroup}>
        <IconButton
          variant="tertiary"
          size="medium"
          icon="action_play"
          aria-label="Play workflow"
        />
        <IconButton
          variant="tertiary"
          size="medium"
          icon="action_pause"
          aria-label="Pause workflow"
        />
        <IconButton
          variant="tertiary"
          size="medium"
          icon="navigation_arrow_circlepath_horizontal"
          aria-label="Restart workflow"
        />
        <IconButton
          variant="tertiary"
          size="medium"
          icon="navigation_arrow_rotating_anticlockwise"
          aria-label="Undo last step"
        />
        <IconButton
          variant="tertiary"
          size="medium"
          icon="navigation_arrow_rotating_clockwise"
          aria-label="Redo last step"
        />
      </div>
      <div className={styles.actionGroup}>
        <IconButton
          variant="tertiary"
          size="medium"
          icon="general_tune"
          aria-label="Play workflow"
        />
        <IconButton
          variant="tertiary"
          size="medium"
          icon="general_history"
          aria-label="Play workflow"
        />
        <IconButton
          variant="tertiary"
          size="medium"
          icon="action_share"
          aria-label="Play workflow"
        />
      </div>
      <div className={styles.actionGroup}>
        <IconButton
          variant="tertiary"
          size="medium"
          icon="general_questionmark_circle"
          aria-label="Play workflow"
        />
      </div>
    </div>
  );

  return (
    <FullscreenDialog
      open={open}
      onClose={onClose}
      className={className}
      header={
        <FullscreenDialogHeader
          title={workflow.title}
          itemLabel={workflow.itemLabel}
          itemCaption={workflow.itemCaption}
          trailing={headerTrailing}
          onClose={onClose}
          closeButtonAriaLabel="Close workflow"
        />
      }
    >
      <div className={styles.content}>
        <WorkflowCanvas
          initialNodes={workflow.nodes}
          initialEdges={workflow.edges}
        />
        <WorkflowSidePanel open={sidePanelOpen} />
      </div>
    </FullscreenDialog>
  );
}
