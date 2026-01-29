"use client";

import React, { useState } from "react";
import { Tabs, FocusViewSidePanel, Button } from "@/components";
import type { TabItem } from "@/components";
import type { ChartBuilderStep } from "../ChartBuilder";
import styles from "./ChartSidePanel.module.css";

const STEP_TEMPLATE = 1;
const STEP_EDIT = 2;

const STEP1_TABS: TabItem[] = [
  { id: "templates", label: "Templates" },
  { id: "monzo-ai", label: "Monzo AI" },
];

const STEP2_TABS: TabItem[] = [
  { id: "chart-editor", label: "Chart Editor" },
  { id: "monzo-ai", label: "Monzo AI" },
];

export interface ChartSidePanelProps {
  /** Whether the panel is expanded (visible). When false, panel animates to 0 width. */
  open?: boolean;
  /** Current builder step (1 = template selection, 2 = chart edit). */
  step?: ChartBuilderStep;
  /** Id of the selected template (step 1); enables Next. */
  selectedTemplateId?: string | null;
  /** Called when user clicks Next in Templates tab (step 1). */
  onNext?: () => void;
  /** Called when user clicks Back to templates (step 2). */
  onBackToTemplates?: () => void;
  /** Default width in pixels when no previous size is stored */
  defaultWidth?: number;
  /** Maximum width in pixels */
  maxWidth?: number;
  /** Minimum width in pixels */
  minWidth?: number;
  className?: string;
}

export default function ChartSidePanel({
  open = true,
  step = STEP_TEMPLATE,
  selectedTemplateId = null,
  onNext,
  onBackToTemplates,
  defaultWidth,
  maxWidth,
  minWidth,
  className,
}: ChartSidePanelProps) {
  const [step1Tab, setStep1Tab] = useState(STEP1_TABS[0].id);
  const [step2Tab, setStep2Tab] = useState(STEP2_TABS[0].id);

  const isStep1 = step === STEP_TEMPLATE;
  const isStep2 = step === STEP_EDIT;

  return (
    <FocusViewSidePanel
      open={open}
      defaultWidth={defaultWidth}
      maxWidth={maxWidth}
      minWidth={minWidth}
      className={className}
      dataAttribute="data-chart-side-panel"
    >
      {isStep1 && (
        <>
          <div className={styles.tabsWrapper}>
            <Tabs
              tabs={STEP1_TABS}
              value={step1Tab}
              onChange={setStep1Tab}
              fullWidth
            />
          </div>
          <div
            className={styles.tabContent}
            role="tabpanel"
            id={`tabpanel-${step1Tab}`}
            aria-labelledby={`tab-${step1Tab}`}
          >
            {step1Tab === "templates" && (
              <div className={styles.templatesTab}>
                <Button
                  variant="primary"
                  size="large"
                  onClick={onNext}
                  disabled={!selectedTemplateId}
                >
                  Next
                </Button>
                <p className={styles.helperText}>
                  Select a template from the left, then click Next to continue.
                </p>
              </div>
            )}
            {step1Tab === "monzo-ai" && (
              <div className={styles.placeholder}>Monzo AI content</div>
            )}
          </div>
        </>
      )}

      {isStep2 && (
        <>
          <div className={styles.backRow}>
            <Button
              variant="tertiary"
              size="medium"
              leadingIcon="navigation_arrow_left"
              onClick={onBackToTemplates}
            >
              Back to templates
            </Button>
          </div>
          <div className={styles.tabsWrapper}>
            <Tabs
              tabs={STEP2_TABS}
              value={step2Tab}
              onChange={setStep2Tab}
              fullWidth
            />
          </div>
          <div
            className={styles.tabContent}
            role="tabpanel"
            id={`tabpanel-${step2Tab}`}
            aria-labelledby={`tab-${step2Tab}`}
          >
            {step2Tab === "chart-editor" && (
              <div className={styles.placeholder}>Chart Editor content</div>
            )}
            {step2Tab === "monzo-ai" && (
              <div className={styles.placeholder}>Monzo AI content</div>
            )}
          </div>
        </>
      )}
    </FocusViewSidePanel>
  );
}
