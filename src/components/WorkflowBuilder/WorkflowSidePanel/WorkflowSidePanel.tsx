"use client";

import React, { useState } from "react";
import { Tabs, FullscreenDialogSidePanel } from "@/components";
import type { TabItem } from "@/components";
import styles from "./WorkflowSidePanel.module.css";

const SIDE_PANEL_TABS: TabItem[] = [
  { id: "nodes", label: "Nodes" },
  { id: "detail", label: "Detail" },
  { id: "monzo-ai", label: "Monzo AI" },
];

export interface WorkflowSidePanelProps {
  /** Whether the panel is expanded (visible). When false, panel animates to 0 width. */
  open?: boolean;
  /** Default width in pixels when no previous size is stored */
  defaultWidth?: number;
  /** Maximum width in pixels */
  maxWidth?: number;
  /** Minimum width in pixels */
  minWidth?: number;
  className?: string;
}

export default function WorkflowSidePanel({
  open = true,
  defaultWidth,
  maxWidth,
  minWidth,
  className,
}: WorkflowSidePanelProps) {
  const [activeTab, setActiveTab] = useState(SIDE_PANEL_TABS[0].id);

  return (
    <FullscreenDialogSidePanel
      open={open}
      defaultWidth={defaultWidth}
      maxWidth={maxWidth}
      minWidth={minWidth}
      className={className}
      dataAttribute="data-workflow-side-panel"
    >
      <div className={styles.tabsWrapper}>
        <Tabs
          tabs={SIDE_PANEL_TABS}
          value={activeTab}
          onChange={setActiveTab}
          fullWidth
        />
      </div>
      <div
        className={styles.tabContent}
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {activeTab === "nodes" && (
          <div className={styles.placeholder}>Nodes content</div>
        )}
        {activeTab === "detail" && (
          <div className={styles.placeholder}>Detail content</div>
        )}
        {activeTab === "monzo-ai" && (
          <div className={styles.placeholder}>Monzo AI content</div>
        )}
      </div>
    </FullscreenDialogSidePanel>
  );
}
