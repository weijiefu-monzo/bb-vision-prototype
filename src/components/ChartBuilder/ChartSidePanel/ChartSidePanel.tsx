"use client";

import React, { useState } from "react";
import {
  Tabs,
  FocusViewSidePanel,
  Button,
  SearchField,
  Chip,
  MonzoAIChat,
} from "@/components";
import type { TabItem } from "@/components";
import type { ChartBuilderStep } from "../ChartBuilder";
import styles from "./ChartSidePanel.module.css";

const STEP_TEMPLATE = 1;
const STEP_EDIT = 2;

const STEP1_TABS: TabItem[] = [
  { id: "templates", label: "Templates" },
  { id: "monzo-ai", label: "Monzo AI" },
];

const TYPE_CHIPS = [
  { id: "all", label: "All" },
  { id: "3d", label: "3D" },
  { id: "animated", label: "Animated" },
  { id: "areas", label: "Areas" },
  { id: "bars", label: "Bars" },
  { id: "circles", label: "Circles" },
  { id: "icons", label: "Icons" },
  { id: "images", label: "Images" },
  { id: "interactive", label: "Interactive content" },
  { id: "lines", label: "Lines" },
  { id: "maps", label: "Maps" },
  { id: "pies", label: "Pies" },
  { id: "radial", label: "Radial" },
  { id: "small-multiples", label: "Small multiples" },
  { id: "text", label: "Text" },
];

const PURPOSE_CHIPS = [
  { id: "all", label: "All" },
  { id: "annotation", label: "Annotation" },
  { id: "change-over-time", label: "Change over time" },
  { id: "comparison", label: "Comparison" },
  { id: "correlation", label: "Correlation" },
  { id: "counter", label: "Counter" },
  { id: "distribution", label: "Distribution" },
  { id: "engagement", label: "Engagement" },
  { id: "exploration", label: "Exploration" },
  { id: "flow", label: "Flow" },
  { id: "hierarchy", label: "Hierarchy" },
  { id: "magnitude", label: "Magnitude" },
  { id: "part-to-whole", label: "Part to whole" },
  { id: "ranking", label: "Ranking" },
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
  const [templateSearch, setTemplateSearch] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState("all");
  const [selectedPurposeId, setSelectedPurposeId] = useState("all");

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
                <div className={styles.templatesTabScroll}>
                  <SearchField
                    placeholder="Search templates..."
                    value={templateSearch}
                    onChange={(e) => setTemplateSearch(e.target.value)}
                    className={styles.templateSearch}
                  />
                  <div className={styles.chipGroup}>
                    <h3 className={styles.chipGroupLabel}>Type</h3>
                    <div className={styles.chipList}>
                      {TYPE_CHIPS.map(({ id, label }) => (
                        <Chip
                          key={id}
                          label={label}
                          selected={selectedTypeId === id}
                          onClick={() => setSelectedTypeId(id)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className={styles.chipGroup}>
                    <h3 className={styles.chipGroupLabel}>Purpose</h3>
                    <div className={styles.chipList}>
                      {PURPOSE_CHIPS.map(({ id, label }) => (
                        <Chip
                          key={id}
                          label={label}
                          selected={selectedPurposeId === id}
                          onClick={() => setSelectedPurposeId(id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.templatesTabFooter}>
                  <p className={styles.helperText}>
                    Select a template, then click Next to continue.
                  </p>
                  <Button
                    variant="primary"
                    size="large"
                    onClick={onNext}
                    disabled={!selectedTemplateId}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
            {step1Tab === "monzo-ai" && (
              <div className={styles.monzoAiTab}>
                <MonzoAIChat placeholder="Message Monzo AI..." />
              </div>
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
              <div className={styles.monzoAiTab}>
                <MonzoAIChat placeholder="Message Monzo AI..." />
              </div>
            )}
          </div>
        </>
      )}
    </FocusViewSidePanel>
  );
}
