"use client";

import React, { ReactNode, useRef, useState, useEffect } from "react";
import type { BarChartDataItem } from "@/data";
import styles from "./HorizontalBarChart.module.css";

const CATEGORICAL_COLORS = [
  "var(--chart-categorical-category1)",
  "var(--chart-categorical-category2)",
  "var(--chart-categorical-category3)",
  "var(--chart-categorical-category4)",
  "var(--chart-categorical-category5)",
  "var(--chart-categorical-category6)",
  "var(--chart-categorical-category7)",
  "var(--chart-categorical-category8)",
  "var(--chart-categorical-category9)",
  "var(--chart-categorical-category10)",
  "var(--chart-categorical-category11)",
  "var(--chart-categorical-category12)",
];

const DEFAULT_WIDTH = 400;
const BAR_HEIGHT = 24;
const SEGMENT_GAP = 2;
const VERTICAL_PADDING = 16;
const CORNER_RADIUS = 8;

export interface HorizontalBarChartProps {
  /** Chart data: first entry is used for the single row of stacked segments */
  data: BarChartDataItem[];
  /** Series labels for legend (order matches values[] indices) */
  seriesLabels: string[];
  /** Chart width; when undefined, fills container (responsive) */
  width?: number;
  /** Chart height (default: bar height + padding) */
  height?: number;
  /** Show legend below */
  showLegend?: boolean;
  /** Optional title */
  title?: ReactNode;
  /** Max value for scaling (default: sum of first row's values) */
  xMax?: number;
  className?: string;
}

export default function HorizontalBarChart({
  data,
  seriesLabels,
  width: widthProp,
  height: heightProp,
  showLegend = true,
  title,
  xMax: xMaxProp,
  className,
}: HorizontalBarChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(DEFAULT_WIDTH);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const w = entry.contentRect.width;
        setContainerWidth(Math.round(w));
      }
    });
    observer.observe(el);
    setContainerWidth(Math.round(el.getBoundingClientRect().width));
    return () => observer.disconnect();
  }, []);

  const width = widthProp ?? containerWidth;
  const row = data[0];
  const values = row?.values ?? (row?.value != null ? [row.value] : [0]);
  const sumValues = values.reduce((a, b) => a + b, 0);
  const xMax = xMaxProp ?? Math.max(sumValues, 1);
  const padding = { top: VERTICAL_PADDING, right: 0, bottom: 0, left: 0 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = BAR_HEIGHT;
  const height = heightProp ?? padding.top + chartHeight + VERTICAL_PADDING;
  const barY = padding.top;

  const totalBarWidth = (sumValues / xMax) * chartWidth;
  const numGaps = values.length - 1;
  const availableForSegments = totalBarWidth - numGaps * SEGMENT_GAP;
  const segmentWidths = values.map(
    (v) => (sumValues > 0 ? (v / sumValues) * availableForSegments : 0)
  );
  const segmentX: number[] = [];
  let x = 0;
  for (let i = 0; i < segmentWidths.length; i++) {
    segmentX.push(x);
    x += segmentWidths[i] + (i < segmentWidths.length - 1 ? SEGMENT_GAP : 0);
  }

  return (
    <div className={`${styles.root} ${className ?? ""}`}>
      {title != null && <div className={styles.title}>{title}</div>}
      <div
        ref={containerRef}
        className={styles.chartContainer}
        style={{ minHeight: height }}
      >
        <svg
          className={styles.svg}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Horizontal bar chart"
        >
          <g transform={`translate(${padding.left}, 0)`}>
            {values.map((segmentValue, j) => {
              const segmentWidth = segmentWidths[j] ?? 0;
              const segX = segmentX[j] ?? 0;
              const fill = CATEGORICAL_COLORS[j % CATEGORICAL_COLORS.length];
              const isFirst = j === 0;
              const isLast = j === values.length - 1;
              const r = Math.min(
                CORNER_RADIUS,
                segmentWidth / 2,
                chartHeight / 2
              );
              if (isFirst && isLast) {
                const path = [
                  `M ${segX + r} ${barY}`,
                  `L ${segX + segmentWidth - r} ${barY}`,
                  `Q ${segX + segmentWidth} ${barY} ${segX + segmentWidth} ${barY + r}`,
                  `L ${segX + segmentWidth} ${barY + chartHeight - r}`,
                  `Q ${segX + segmentWidth} ${barY + chartHeight} ${segX + segmentWidth - r} ${barY + chartHeight}`,
                  `L ${segX + r} ${barY + chartHeight}`,
                  `Q ${segX} ${barY + chartHeight} ${segX} ${barY + chartHeight - r}`,
                  `L ${segX} ${barY + r}`,
                  `Q ${segX} ${barY} ${segX + r} ${barY}`,
                  "Z",
                ].join(" ");
                return <path key={j} d={path} fill={fill} />;
              }
              if (isFirst && r > 0) {
                const path = [
                  `M ${segX + r} ${barY}`,
                  `L ${segX + segmentWidth} ${barY}`,
                  `L ${segX + segmentWidth} ${barY + chartHeight}`,
                  `L ${segX + r} ${barY + chartHeight}`,
                  `Q ${segX} ${barY + chartHeight} ${segX} ${barY + chartHeight - r}`,
                  `L ${segX} ${barY + r}`,
                  `Q ${segX} ${barY} ${segX + r} ${barY}`,
                  "Z",
                ].join(" ");
                return <path key={j} d={path} fill={fill} />;
              }
              if (isLast && r > 0) {
                const path = [
                  `M ${segX} ${barY}`,
                  `L ${segX + segmentWidth - r} ${barY}`,
                  `Q ${segX + segmentWidth} ${barY} ${segX + segmentWidth} ${barY + r}`,
                  `L ${segX + segmentWidth} ${barY + chartHeight - r}`,
                  `Q ${segX + segmentWidth} ${barY + chartHeight} ${segX + segmentWidth - r} ${barY + chartHeight}`,
                  `L ${segX} ${barY + chartHeight}`,
                  "Z",
                ].join(" ");
                return <path key={j} d={path} fill={fill} />;
              }
              return (
                <rect
                  key={j}
                  x={segX}
                  y={barY}
                  width={segmentWidth}
                  height={chartHeight}
                  fill={fill}
                />
              );
            })}
          </g>
        </svg>
      </div>
      {showLegend && seriesLabels.length > 0 && (
        <div className={styles.legend} role="list">
          {seriesLabels.map((label, i) => (
            <div key={i} className={styles.legendItem} role="listitem">
              <span
                className={styles.legendSwatch}
                style={{
                  backgroundColor:
                    CATEGORICAL_COLORS[i % CATEGORICAL_COLORS.length],
                }}
              />
              <span>{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
