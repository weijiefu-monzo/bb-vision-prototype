"use client";

import React from "react";
import { Card, DonutChart, BarChart, LineChart } from "@/components";
import {
  donutChartDummyData,
  barChartDummyData,
  stackedBarChartDummyData,
  stackedBarChartSeriesLabels,
  lineChartDummyDataSingle,
  lineChartDummyDataMultiple,
  lineChartXLabels,
} from "@/data";
import styles from "./ChartBuilderTemplateCard.module.css";

const PREVIEW_WIDTH = 160;
const PREVIEW_HEIGHT = 96;
const PREVIEW_DONUT_SIZE = 80;

export interface ChartBuilderTemplateCardProps {
  /** Card title (e.g. template name). */
  title: string;
  /** One-line description. */
  description: string;
  /** Chart type (e.g. "Line", "Bar", "Pie / Donut") – used to render the preview chart. */
  chartType?: string;
  /** Whether the card is selected. */
  selected?: boolean;
  /** Called when the card is chosen. */
  onClick?: () => void;
  className?: string;
}

function TemplateChartPreview({ chartType }: { chartType?: string }) {
  if (!chartType) {
    return (
      <DonutChart
        data={donutChartDummyData}
        size={PREVIEW_DONUT_SIZE}
        showLegend={false}
      />
    );
  }
  const t = chartType.toLowerCase();

  if (t.includes("pie") || t.includes("donut")) {
    return (
      <DonutChart
        data={donutChartDummyData}
        size={PREVIEW_DONUT_SIZE}
        showLegend={false}
      />
    );
  }

  if (t.includes("stacked")) {
    return (
      <BarChart
        data={stackedBarChartDummyData}
        seriesLabels={stackedBarChartSeriesLabels}
        width={PREVIEW_WIDTH}
        height={PREVIEW_HEIGHT}
        showLegend={false}
        hideAxis
      />
    );
  }

  if (t.includes("bar")) {
    return (
      <BarChart
        data={barChartDummyData.slice(0, 6)}
        width={PREVIEW_WIDTH}
        height={PREVIEW_HEIGHT}
        showLegend={false}
        hideAxis
      />
    );
  }

  if (t.includes("line")) {
    const useMultiple = t.includes("dual") || t.includes("multiple");
    const smooth = t.includes("area");
    return (
      <LineChart
        data={
          useMultiple ? lineChartDummyDataMultiple : lineChartDummyDataSingle
        }
        xLabels={lineChartXLabels}
        width={PREVIEW_WIDTH}
        height={PREVIEW_HEIGHT}
        showLegend={false}
        smooth={smooth}
        hideAxis
      />
    );
  }

  return (
    <DonutChart
      data={donutChartDummyData}
      size={PREVIEW_DONUT_SIZE}
      showLegend={false}
    />
  );
}

export default function ChartBuilderTemplateCard({
  title,
  description,
  chartType,
  selected = false,
  onClick,
  className,
}: ChartBuilderTemplateCardProps) {
  return (
    <Card
      selected={selected}
      onClick={onClick}
      className={`${styles.templateCard} ${className ?? ""}`}
    >
      <div className={styles.chartWrap}>
        <TemplateChartPreview chartType={chartType} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </Card>
  );
}
