"use client";

import React, { ReactNode } from "react";
import { IconButton, FocusView, FocusViewHeader } from "@/components";
import { WorkflowCanvas } from "./WorkflowCanvas";
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
  return (
    <FocusView
      open={open}
      onClose={onClose}
      className={className}
      header={
        <FocusViewHeader
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
        <WorkflowCanvas />
        <WorkflowSidePanel />
      </div>
    </FocusView>
  );
}

const headerTrailing: ReactNode = (
  <div className={styles.headerTrailing}>
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
