"use client";

import React, { useState } from "react";
import { Tabs, FullscreenDialogSidePanel, MonzoAIChat } from "@/components";
import type { TabItem } from "@/components";
import { WORKFLOW_NODE_PALETTE_SECTIONS } from "../workflowNodePalette";
import { NodePaletteItem } from "./NodePaletteItem";
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
  /** Called when user starts dragging a node from the palette */
  onNodeDragStart?: () => void;
  /** Called when user ends dragging a node (drop or cancel) */
  onNodeDragEnd?: () => void;
  className?: string;
}

export default function WorkflowSidePanel({
  open = true,
  defaultWidth,
  maxWidth,
  minWidth,
  onNodeDragStart,
  onNodeDragEnd,
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
          <div className={styles.nodePalette}>
            {WORKFLOW_NODE_PALETTE_SECTIONS.map((section) => (
              <section
                key={section.id}
                className={styles.nodePaletteSection}
                aria-labelledby={`palette-section-${section.id}`}
              >
                <h3
                  id={`palette-section-${section.id}`}
                  className={styles.nodePaletteSectionTitle}
                >
                  {section.label}
                </h3>
                <ul className={styles.nodePaletteList} role="list">
                  {section.items.map((item) => (
                    <NodePaletteItem
                      key={item.id ?? `${item.type}-${item.label}`}
                      item={item}
                      onDragStart={onNodeDragStart}
                      onDragEnd={onNodeDragEnd}
                    />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
        {activeTab === "detail" && (
          <div className={styles.placeholder}>Detail content</div>
        )}
        {activeTab === "monzo-ai" && (
          <div className={styles.monzoAiTab}>
            <MonzoAIChat placeholder="Message Monzo AI..." />
          </div>
        )}
      </div>
    </FullscreenDialogSidePanel>
  );
}
