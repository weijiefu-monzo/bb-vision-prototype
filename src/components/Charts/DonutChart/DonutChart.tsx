"use client";

import React, { ReactNode, useRef, useState, useEffect } from "react";
import { ChartLegend } from "../Legend";
import styles from "./DonutChart.module.css";

const CATEGORICAL_COLORS = [
  "var(--chart-categorical-category1)",
  "var(--chart-categorical-category2)",
  "var(--chart-categorical-category3)",
  "var(--chart-categorical-category4)",
  "var(--chart-categorical-category5)",
  "var(--chart-categorical-category6)",
  "var(--chart-categorical-category7)",
  "var(--chart-categorical-category8)",
];

export interface DonutChartEntry {
  label: string;
  /** Value (will be normalized to proportions if they don't sum to 1) */
  value: number;
}

export interface DonutChartProps {
  /** Segment data: label and value (values normalized to proportions) */
  data: DonutChartEntry[];
  /** Custom colours for segments (order matches data); uses default palette if not specified */
  colors?: string[];
  /** Optional large value text in center (e.g. "1,260") */
  centerValue?: string;
  /** Optional label text in center below value (e.g. "Total") */
  centerLabel?: string;
  /** Chart diameter in px */
  size?: number;
  /** Optional title */
  title?: ReactNode;
  /** Show legend below */
  showLegend?: boolean;
  className?: string;
}

const DEFAULT_SIZE = 200;

/** Start angle for first segment: top (12 o'clock) = -90° */
const START_ANGLE = -Math.PI / 2;
/** Gap between segments: constant linear width in px (same arc length at inner and outer) */
const GAP_WIDTH_PX = 2;

/** Round to fixed precision so server and client produce identical path strings (avoids hydration mismatch). */
function roundForPath(n: number, decimals = 6): number {
  const factor = 10 ** decimals;
  return Math.round(n * factor) / factor;
}

function getDonutSegmentPath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startOuter: number,
  endOuter: number,
  startInner: number,
  endInner: number
): string {
  const x1 = roundForPath(cx + outerR * Math.cos(startOuter));
  const y1 = roundForPath(cy + outerR * Math.sin(startOuter));
  const x2 = roundForPath(cx + outerR * Math.cos(endOuter));
  const y2 = roundForPath(cy + outerR * Math.sin(endOuter));
  const x3 = roundForPath(cx + innerR * Math.cos(endInner));
  const y3 = roundForPath(cy + innerR * Math.sin(endInner));
  const x4 = roundForPath(cx + innerR * Math.cos(startInner));
  const y4 = roundForPath(cy + innerR * Math.sin(startInner));
  const largeOuter = endOuter - startOuter > Math.PI ? 1 : 0;
  const largeInner = endInner - startInner > Math.PI ? 1 : 0;
  const or = roundForPath(outerR);
  const ir = roundForPath(innerR);
  return `M ${x1} ${y1} A ${or} ${or} 0 ${largeOuter} 1 ${x2} ${y2} L ${x3} ${y3} A ${ir} ${ir} 0 ${largeInner} 0 ${x4} ${y4} Z`;
}

export default function DonutChart({
  data,
  colors: colorsProp,
  centerValue,
  centerLabel,
  size: sizeProp,
  title,
  showLegend = true,
  className,
}: DonutChartProps) {
  const colors = colorsProp ?? CATEGORICAL_COLORS;
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(DEFAULT_SIZE);

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

  const size = sizeProp ?? Math.min(containerWidth, DEFAULT_SIZE);
  const cx = size / 2;
  const cy = size / 2;
  const half = size / 2;
  const outerR = half * 0.9;
  const innerR = half * 0.5;

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const proportions =
    total > 0 ? data.map((d) => d.value / total) : data.map(() => 0);
  const n = proportions.length;
  const gapAngleOuter = outerR > 0 ? GAP_WIDTH_PX / outerR : 0;
  const gapAngleInner = innerR > 0 ? GAP_WIDTH_PX / innerR : 0;
  const totalGapOuter = n * gapAngleOuter;
  const totalGapInner = n * gapAngleInner;
  const availableOuter = Math.max(0, 2 * Math.PI - totalGapOuter);
  const availableInner = Math.max(0, 2 * Math.PI - totalGapInner);
  let startOuter = START_ANGLE;
  let startInner = START_ANGLE;
  const segments = proportions.map((p) => {
    const spanOuter = p * availableOuter;
    const spanInner = p * availableInner;
    const endOuter = startOuter + spanOuter;
    const endInner = startInner + spanInner;
    const seg = { startOuter, endOuter, startInner, endInner };
    startOuter = endOuter + gapAngleOuter;
    startInner = endInner + gapAngleInner;
    return seg;
  });

  const hasCenterContent = centerValue != null || centerLabel != null;

  return (
    <div ref={containerRef} className={`${styles.root} ${className ?? ""}`}>
      {title != null && <div className={styles.title}>{title}</div>}
      <div className={styles.chartContainer}>
        <svg
          className={styles.svg}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          aria-hidden
        >
          {data.map((_, i) => (
            <path
              key={i}
              d={getDonutSegmentPath(
                cx,
                cy,
                innerR,
                outerR,
                segments[i].startOuter,
                segments[i].endOuter,
                segments[i].startInner,
                segments[i].endInner
              )}
              fill={colors[i % colors.length]}
            />
          ))}
          {hasCenterContent && (
            <g className={styles.centerGroup}>
              {centerValue != null && (
                <text
                  x={cx}
                  y={centerLabel != null ? cy - 4 : cy + 4}
                  className={styles.centerValue}
                  dominantBaseline="middle"
                >
                  {centerValue}
                </text>
              )}
              {centerLabel != null && (
                <text
                  x={cx}
                  y={centerValue != null ? cy + 14 : cy + 4}
                  className={styles.centerLabel}
                  dominantBaseline="middle"
                >
                  {centerLabel}
                </text>
              )}
            </g>
          )}
        </svg>
      </div>
      {showLegend && data.length > 0 && (
        <ChartLegend
          items={data.map((entry, i) => ({
            label: entry.label,
            color: colors[i % colors.length],
          }))}
        />
      )}
    </div>
  );
}
