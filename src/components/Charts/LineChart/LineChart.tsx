"use client";

import React, { ReactNode, useRef, useState, useEffect } from "react";
import styles from "./LineChart.module.css";

const DIVERGING_COLORS = [
  "var(--chart-diverging-on-light-positive-light)",
  "var(--chart-diverging-on-light-negative-light)",
  "var(--chart-diverging-on-light-positive-mid)",
  "var(--chart-diverging-on-light-negative-mid)",
  "var(--chart-diverging-on-light-positive-subtle-mid)",
  "var(--chart-diverging-on-light-negative-subtle-mid)",
  "var(--chart-diverging-on-light-positive-dark)",
  "var(--chart-diverging-on-light-negative-dark)",
];

export interface LineChartSeries {
  label: string;
  values: number[];
}

export interface LineChartProps {
  /** One or more lines: each series has label and y values (x = index) */
  data: LineChartSeries[];
  /** Optional x-axis labels (length should match values length) */
  xLabels?: string[];
  /** Chart width; when undefined, fills container (responsive) */
  width?: number;
  /** Chart height (default: 240) */
  height?: number;
  /** Show legend below */
  showLegend?: boolean;
  /** Optional title */
  title?: ReactNode;
  /** Y-axis max (default: derived from data) */
  yMax?: number;
  className?: string;
}

const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 240;

export default function LineChart({
  data,
  xLabels,
  width: widthProp,
  height = DEFAULT_HEIGHT,
  showLegend = true,
  title,
  yMax: yMaxProp,
  className,
}: LineChartProps) {
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
  const padding = { top: 16, right: 36, bottom: 24, left: 8 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const allValues = data.flatMap((s) => s.values);
  const yMax = yMaxProp ?? Math.max(...allValues, 1);
  const n = data[0]?.values.length ?? 0;
  const xStep = n > 1 ? chartWidth / (n - 1) : chartWidth;

  const scaleX = (i: number) => padding.left + i * xStep;
  const scaleY = (y: number) =>
    padding.top + chartHeight - (y / yMax) * chartHeight;

  const stroke = "var(--semantic-field-border-default, rgba(9, 23, 35, 0.1))";
  const axisStroke = "var(--semantic-separator, rgba(9, 23, 35, 0.1))";
  const yTicks = 5;
  const stepY = chartHeight / (yTicks - 1);

  const isSingleLine = data.length === 1;

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
          aria-label="Line chart"
        >
          <defs>
            {isSingleLine && data[0] && (
              <linearGradient
                id="line-chart-area-gradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
                gradientUnits="objectBoundingBox"
              >
                <stop
                  offset="0%"
                  stopColor={DIVERGING_COLORS[0]}
                  stopOpacity={0.35}
                />
                <stop
                  offset="100%"
                  stopColor={DIVERGING_COLORS[0]}
                  stopOpacity={0}
                />
              </linearGradient>
            )}
          </defs>
          {/* Grid */}
          <g
            className={styles.grid}
            transform={`translate(${padding.left}, ${padding.top})`}
          >
            {Array.from({ length: yTicks }, (_, i) => (
              <line
                key={`h-${i}`}
                x1={0}
                y1={i * stepY}
                x2={chartWidth}
                y2={i * stepY}
                stroke={stroke}
                strokeWidth={1}
              />
            ))}
            {n > 0 &&
              Array.from({ length: n }, (_, i) => (
                <line
                  key={`v-${i}`}
                  x1={i * xStep}
                  y1={0}
                  x2={i * xStep}
                  y2={chartHeight}
                  stroke={stroke}
                  strokeWidth={1}
                />
              ))}
            <line
              x1={chartWidth}
              y1={0}
              x2={chartWidth}
              y2={chartHeight}
              stroke={axisStroke}
              strokeWidth={1}
            />
            <line
              x1={0}
              y1={chartHeight}
              x2={chartWidth}
              y2={chartHeight}
              stroke={axisStroke}
              strokeWidth={1}
            />
          </g>
          {/* Y-axis labels (right) */}
          <g
            transform={`translate(${padding.left + chartWidth}, ${padding.top})`}
          >
            {Array.from({ length: yTicks }, (_, i) => {
              const value = Math.round(yMax - (i / (yTicks - 1)) * yMax);
              return (
                <text
                  key={i}
                  x={8}
                  y={i * stepY}
                  textAnchor="start"
                  dominantBaseline="middle"
                  fill="var(--semantic-content-secondary, rgba(9, 23, 35, 0.6))"
                  fontSize="10"
                >
                  {value}
                </text>
              );
            })}
          </g>
          {/* X-axis labels */}
          {xLabels && xLabels.length > 0 && (
            <g
              transform={`translate(${padding.left}, ${padding.top + chartHeight})`}
            >
              {xLabels.map((label, i) => (
                <text
                  key={i}
                  x={i * xStep}
                  y={16}
                  textAnchor="middle"
                  fill="var(--semantic-content-secondary, rgba(9, 23, 35, 0.6))"
                  fontSize="10"
                >
                  {label}
                </text>
              ))}
            </g>
          )}
          {/* Lines and area (single line: area first, then line) */}
          {data.map((series, seriesIndex) => {
            const values = series.values;
            const color =
              DIVERGING_COLORS[seriesIndex % DIVERGING_COLORS.length];
            const points = values.map((y, i) => ({
              x: scaleX(i),
              y: scaleY(y),
            }));
            const linePath =
              points.length > 0
                ? points
                    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
                    .join(" ")
                : "";
            const areaPath =
              points.length > 0
                ? `${linePath} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`
                : "";

            return (
              <React.Fragment key={seriesIndex}>
                {isSingleLine && areaPath && (
                  <path
                    d={areaPath}
                    fill="url(#line-chart-area-gradient)"
                    stroke="none"
                  />
                )}
                <path
                  d={linePath}
                  fill="none"
                  stroke={color}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </React.Fragment>
            );
          })}
        </svg>
      </div>
      {showLegend && data.length > 0 && (
        <div className={styles.legend} role="list">
          {data.map((series, i) => (
            <div key={i} className={styles.legendItem} role="listitem">
              <span
                className={styles.legendSwatch}
                style={{
                  backgroundColor:
                    DIVERGING_COLORS[i % DIVERGING_COLORS.length],
                }}
              />
              <span>{series.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
