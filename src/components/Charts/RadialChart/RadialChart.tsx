"use client";

import React, { ReactNode, useRef, useState, useEffect } from "react";
import styles from "./RadialChart.module.css";

const SINGLE_COLOR = "var(--chart-sequential-on-light-order1)";

const SEQUENTIAL_COLORS = [
  "var(--chart-sequential-on-light-order1)",
  "var(--chart-sequential-on-light-order2)",
  "var(--chart-sequential-on-light-order3)",
  "var(--chart-sequential-on-light-order4)",
  "var(--chart-sequential-on-light-order5)",
  "var(--chart-sequential-on-light-order6)",
  "var(--chart-sequential-on-light-order7)",
  "var(--chart-sequential-on-light-order8)",
  "var(--chart-sequential-on-light-order9)",
  "var(--chart-sequential-on-light-order10)",
];

export interface RadialChartSingleEntry {
  /** Current value (numerator for arc proportion) */
  value: number;
  /** Total/max (denominator for arc proportion) */
  total: number;
  /** Large text in center (e.g. "1,260") */
  centerLabel: string;
  /** Unit below center (e.g. "Visitors") */
  unit: string;
}

export interface RadialChartMultipleEntry {
  label: string;
  /** Proportion of ring filled (0–1) */
  value: number;
}

export type RadialChartVariant = "single" | "multiple";

export interface RadialChartBaseProps {
  /** Chart diameter in px */
  size?: number;
  /** Optional title */
  title?: ReactNode;
  /** Trend line with optional icon (e.g. "Trending up by 5.2% this month") */
  trendText?: string;
  /** Optional icon before trend text (e.g. up arrow) */
  trendIcon?: ReactNode;
  /** Period/context line (e.g. "Showing total visitors for the last 6 months") */
  periodText?: string;
  /** Show legend (multiple variant only) */
  showLegend?: boolean;
  className?: string;
}

export interface RadialChartSingleProps extends RadialChartBaseProps {
  variant: "single";
  data: RadialChartSingleEntry;
}

export interface RadialChartMultipleProps extends RadialChartBaseProps {
  variant: "multiple";
  data: RadialChartMultipleEntry[];
}

export type RadialChartProps =
  | RadialChartSingleProps
  | RadialChartMultipleProps;

const DEFAULT_SIZE = 200;

export default function RadialChart(props: RadialChartProps) {
  const {
    variant,
    size: sizeProp,
    title,
    trendText,
    trendIcon,
    periodText,
    showLegend = true,
    className,
  } = props;

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

  const hasFooter = !!(trendText ?? periodText);

  if (variant === "single") {
    const { data } = props;
    const { value, total, centerLabel, unit } = data;
    const fraction = total > 0 ? Math.min(1, Math.max(0, value / total)) : 0;
    const half = size / 2;
    const maxR = half * 0.9;
    const innerRadius = half * 0.6;
    const strokeWidth = maxR - innerRadius;
    const trackR = (maxR + innerRadius) / 2;
    const circumference = 2 * Math.PI * trackR;
    const dashLength = fraction * circumference;

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
            <g transform={`rotate(-90 ${cx} ${cy})`}>
              <circle
                className={styles.track}
                cx={cx}
                cy={cy}
                r={trackR}
                strokeWidth={strokeWidth}
              />
              <circle
                className={styles.segment}
                cx={cx}
                cy={cy}
                r={trackR}
                strokeWidth={strokeWidth}
                stroke={SINGLE_COLOR}
                strokeDasharray={`${dashLength} ${circumference}`}
                strokeDashoffset={0}
              />
            </g>
            <g className={styles.centerGroup}>
              <text
                x={cx}
                y={cy - 6}
                className={styles.centerValue}
                dominantBaseline="middle"
              >
                {centerLabel}
              </text>
              <text
                x={cx}
                y={cy + 14}
                className={styles.centerUnit}
                dominantBaseline="middle"
              >
                {unit}
              </text>
            </g>
          </svg>
        </div>
        {hasFooter && (
          <div className={styles.footer}>
            {trendText != null && (
              <div className={styles.trendRow}>
                {trendIcon}
                <span>{trendText}</span>
              </div>
            )}
            {periodText != null && (
              <div className={styles.periodText}>{periodText}</div>
            )}
          </div>
        )}
      </div>
    );
  }

  const { data: entries } = props;
  const ringCount = entries.length;
  const maxR = (size / 2) * 0.9;
  const gap = 4;
  const totalGap = (ringCount - 1) * gap;
  /* Rings go from outer edge inward; only maxR is available, so fit n strokes + (n-1) gaps in maxR */
  const ringStroke = (maxR - totalGap) / (2 * ringCount);
  const colors = SEQUENTIAL_COLORS;

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
          <g transform={`rotate(-90 ${cx} ${cy})`}>
            {entries.map((entry, i) => {
              const r = maxR - i * (ringStroke * 2 + gap) - ringStroke;
              const fraction = Math.min(1, Math.max(0, entry.value));
              const circumference = 2 * Math.PI * r;
              const dashLength = fraction * circumference;
              const color = colors[i % colors.length];
              return (
                <React.Fragment key={i}>
                  <circle
                    className={styles.track}
                    cx={cx}
                    cy={cy}
                    r={r}
                    strokeWidth={ringStroke * 2}
                  />
                  <circle
                    className={styles.segment}
                    cx={cx}
                    cy={cy}
                    r={r}
                    strokeWidth={ringStroke * 2}
                    stroke={color}
                    strokeDasharray={`${dashLength} ${circumference}`}
                    strokeDashoffset={0}
                  />
                </React.Fragment>
              );
            })}
          </g>
        </svg>
      </div>
      {showLegend && entries.length > 0 && (
        <div className={styles.legend} role="list">
          {entries.map((entry, i) => (
            <div key={i} className={styles.legendItem} role="listitem">
              <span
                className={styles.legendSwatch}
                style={{
                  backgroundColor: colors[i % colors.length],
                }}
              />
              <span>{entry.label}</span>
            </div>
          ))}
        </div>
      )}
      {hasFooter && (
        <div className={styles.footer}>
          {trendText != null && (
            <div className={styles.trendRow}>
              {trendIcon}
              <span>{trendText}</span>
            </div>
          )}
          {periodText != null && (
            <div className={styles.periodText}>{periodText}</div>
          )}
        </div>
      )}
    </div>
  );
}
