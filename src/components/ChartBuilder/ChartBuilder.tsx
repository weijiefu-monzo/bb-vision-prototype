"use client";

import React, { useState } from "react";
import { IconButton, FullscreenDialog, FullscreenDialogHeader } from "@/components";
import type { ChartDataItem } from "@/data";
import { chartTemplateSections } from "@/data";
import { ChartSidePanel } from "./ChartSidePanel";
import { ChartBuilderTemplateCard } from "./ChartBuilderTemplateCard";
import styles from "./ChartBuilder.module.css";

/** Step 1: choose template. Step 2: edit/configure chart. */
const STEP_TEMPLATE = 1;
const STEP_EDIT = 2;
export type ChartBuilderStep = typeof STEP_TEMPLATE | typeof STEP_EDIT;

export interface Chart {
  /** Display title in the header (e.g. "Chart Builder") */
  title: string;
  /** Item label (e.g. "Untitled chart") */
  itemLabel?: string;
  /** Item caption (e.g. "last updated 12:03 on March 1 2026") */
  itemCaption?: string;
  /** Optional id for identifying the chart */
  id?: string;
  /** Chart series/data for the builder to display or edit */
  data?: ChartDataItem[];
  /** Extensible for future chart-specific data */
  [key: string]: unknown;
}

export interface ChartBuilderProps {
  open: boolean;
  onClose: () => void;
  /** Chart data used to drive the header and future builder UI (title, caption, data, etc.) */
  chart?: Chart;
  className?: string;
}

const defaultChart: Chart = {
  title: "Chart Builder",
  itemLabel: "Untitled chart",
  itemCaption: undefined,
};

export default function ChartBuilder({
  open,
  onClose,
  chart = defaultChart,
  className,
}: ChartBuilderProps) {
  const [sidePanelOpen, setSidePanelOpen] = useState(true);
  const [step, setStep] = useState<ChartBuilderStep>(STEP_TEMPLATE);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null,
  );

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
  };

  const handleNextToEdit = () => {
    if (selectedTemplateId) setStep(STEP_EDIT);
  };

  const handleBackToTemplates = () => {
    setStep(STEP_TEMPLATE);
    setSelectedTemplateId(null);
  };

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
          icon={"general_tune"}
          aria-label={"Customise chart"}
          onClick={() => {}}
        />
        <IconButton
          variant="tertiary"
          size="medium"
          icon={"general_history"}
          aria-label={"View history"}
          onClick={() => {}}
        />
        <IconButton
          variant="tertiary"
          size="medium"
          icon={"action_share"}
          aria-label={"Share chart"}
          onClick={() => {}}
        />
      </div>
      <div className={styles.actionGroup}>
        <IconButton
          variant="tertiary"
          size="medium"
          icon={"general_questionmark_circle"}
          aria-label={
            sidePanelOpen ? "Collapse side panel" : "Expand side panel"
          }
          onClick={() => {}}
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
          title={chart.title}
          itemLabel={chart.itemLabel}
          itemCaption={chart.itemCaption}
          trailing={headerTrailing}
          onClose={onClose}
          closeButtonAriaLabel="Close chart builder"
        />
      }
    >
      <div className={styles.content}>
        <div className={styles.mainArea}>
          {step === STEP_TEMPLATE && (
            <div className={styles.templatesScroll}>
              {chartTemplateSections.map((section) => (
                <section
                  key={section.id}
                  className={styles.templateSection}
                  aria-labelledby={`section-${section.id}`}
                >
                  <h2
                    id={`section-${section.id}`}
                    className={styles.sectionTitle}
                  >
                    {section.title}
                  </h2>
                  <div className={styles.templatesArea}>
                    {section.templates.map((t) => (
                      <ChartBuilderTemplateCard
                        key={t.id}
                        title={t.title}
                        description={t.description}
                        chartType={t.chartType}
                        selected={selectedTemplateId === t.id}
                        onClick={() => handleSelectTemplate(t.id)}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
          {step === STEP_EDIT && (
            <div className={styles.stepEditCanvas}>
              {/* Draft chart canvas – empty for now */}
            </div>
          )}
        </div>
        <ChartSidePanel
          open={sidePanelOpen}
          step={step}
          selectedTemplateId={selectedTemplateId}
          onNext={handleNextToEdit}
          onBackToTemplates={handleBackToTemplates}
        />
      </div>
    </FullscreenDialog>
  );
}
