"use client";

import React, { ReactNode, useRef, useState, useEffect } from "react";
import { barChartDummyData, type BarChartDataItem } from "@/data";
import { ChartLegend } from "../Legend";
import styles from "./BarChart.module.css";

const SEQUENTIAL_COLORS = ["var(--chart-sequential-on-light-order1)"];

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

export type { BarChartDataItem } from "@/data";

const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 240;

export interface BarChartProps {
  /** Chart data (use value for single bar, values for stacked) */
  data: BarChartDataItem[];
  /** Series labels for stacked chart legend (order matches values[] indices) */
  seriesLabels?: string[];
  /** Custom colours for bars/segments; uses default palette if not specified */
  colors?: string[];
  /** Chart width; when undefined, fills container (responsive) */
  width?: number;
  /** Chart height (default: 240) */
  height?: number;
  /** Bar gap as fraction of bar width (0–1) */
  barGap?: number;
  /** Show legend */
  showLegend?: boolean;
  /** Optional title */
  title?: ReactNode;
  /** Y-axis max (default: derived from data) */
  yMax?: number;
  /** When true, hide axes and grid (e.g. for compact previews) */
  hideAxis?: boolean;
  className?: string;
}

function BarChartRoot({
  data = barChartDummyData,
  seriesLabels,
  colors: colorsProp,
  width: widthProp,
  height = DEFAULT_HEIGHT,
  barGap = 0.5,
  showLegend = true,
  title,
  yMax: yMaxProp,
  hideAxis = false,
  className,
}: BarChartProps) {
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
  const isStacked = data.length > 0 && data[0].values != null;
  const yMaxComputed = isStacked
    ? Math.max(
        ...data.map((d) =>
          d.values ? d.values.reduce((a, b) => a + b, 0) : 0,
        ),
        1,
      )
    : Math.max(...data.map((d) => d.value ?? 0), 1);
  const yMax = yMaxProp ?? yMaxComputed;
  const padding = hideAxis
    ? { top: 4, right: 4, bottom: 4, left: 4 }
    : { top: 12, right: 36, bottom: 24, left: 8 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const n = data.length;
  const step = chartWidth / n;
  const barWidth = step * (1 - barGap);
  const defaultColors = isStacked ? CATEGORICAL_COLORS : SEQUENTIAL_COLORS;
  const colors = colorsProp ?? defaultColors;
  const legendLabels =
    isStacked && seriesLabels && seriesLabels.length > 0
      ? seriesLabels
      : undefined;
  const legendItems =
    isStacked && legendLabels
      ? legendLabels.map((label, i) => ({
          label,
          color: colors[i % colors.length],
        }))
      : data.map((d, i) => ({
          label: d.label,
          color: (d as { color?: string }).color ?? colors[i % colors.length],
        }));

  return (
    <div className={`${styles.root} ${className ?? ""}`}>
      {title != null && <div className={styles.title}>{title}</div>}
      <div ref={containerRef} className={styles.chartContainer}>
        <svg
          className={styles.svg}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={isStacked ? "Stacked bar chart" : "Bar chart"}
        >
          {!hideAxis && (
            <>
              <BarChart.Grid
                x={padding.left}
                y={padding.top}
                chartWidth={chartWidth}
                chartHeight={chartHeight}
                yTicks={5}
                xSteps={n}
                stepX={step}
              />
              <BarChart.YAxis
                height={chartHeight}
                width={padding.right}
                yMax={yMax}
                x={padding.left + chartWidth}
                y={padding.top}
              />
              <BarChart.XAxis
                labels={data.map((d) => d.label)}
                x={padding.left}
                y={padding.top + chartHeight}
                width={chartWidth}
                height={padding.bottom}
                step={step}
                barWidth={barWidth}
              />
            </>
          )}
          <BarChart.Bars
            data={data}
            isStacked={isStacked}
            x={padding.left}
            y={padding.top}
            chartWidth={chartWidth}
            chartHeight={chartHeight}
            yMax={yMax}
            step={step}
            barWidth={barWidth}
            colors={colors}
          />
        </svg>
      </div>
      {showLegend && <ChartLegend items={legendItems} />}
    </div>
  );
}

export interface BarChartGridProps {
  x: number;
  y: number;
  chartWidth: number;
  chartHeight: number;
  yTicks: number;
  xSteps: number;
  stepX: number;
}

function BarChartGrid({
  x,
  y,
  chartWidth,
  chartHeight,
  yTicks,
  xSteps,
  stepX,
}: BarChartGridProps) {
  const stepY = chartHeight / (yTicks - 1);
  const stroke = "var(--semantic-field-border-default, rgba(9, 23, 35, 0.1))";
  const axisStroke = "var(--semantic-separator, rgba(9, 23, 35, 0.1))";

  return (
    <g className={styles.grid} transform={`translate(${x}, ${y})`}>
      {/* Horizontal grid lines */}
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
      {/* Vertical grid lines */}
      {Array.from({ length: xSteps + 1 }, (_, i) => (
        <line
          key={`v-${i}`}
          x1={i * stepX}
          y1={0}
          x2={i * stepX}
          y2={chartHeight}
          stroke={stroke}
          strokeWidth={1}
        />
      ))}
      {/* Y-axis line (right) */}
      <line
        x1={chartWidth}
        y1={0}
        x2={chartWidth}
        y2={chartHeight}
        stroke={axisStroke}
        strokeWidth={1}
      />
      {/* X-axis line (bottom) */}
      <line
        x1={0}
        y1={chartHeight}
        x2={chartWidth}
        y2={chartHeight}
        stroke={axisStroke}
        strokeWidth={1}
      />
    </g>
  );
}

export interface BarChartYAxisProps {
  height: number;
  width: number;
  yMax: number;
  x: number;
  y: number;
  ticks?: number;
}

function BarChartYAxis({
  height,
  width,
  yMax,
  x,
  y,
  ticks = 5,
}: BarChartYAxisProps) {
  const step = height / (ticks - 1);
  const valueStep = yMax / (ticks - 1);
  return (
    <g className={styles.yAxis} transform={`translate(${x}, ${y})`}>
      {Array.from({ length: ticks }, (_, i) => {
        const value = Math.round(yMax - i * valueStep);
        const cy = i * step;
        return (
          <text
            key={i}
            x={4}
            y={cy}
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
  );
}

export interface BarChartXAxisProps {
  labels: string[];
  x: number;
  y: number;
  width: number;
  height: number;
  step: number;
  barWidth: number;
}

function BarChartXAxis({ labels, x, y, step, barWidth }: BarChartXAxisProps) {
  return (
    <g className={styles.xAxis} transform={`translate(${x}, ${y})`}>
      {labels.map((label, i) => (
        <text
          key={i}
          x={i * step + barWidth / 2}
          y={12}
          textAnchor="middle"
          fill="var(--semantic-content-secondary, rgba(9, 23, 35, 0.6))"
          fontSize="10"
        >
          {label}
        </text>
      ))}
    </g>
  );
}

export interface BarChartBarsProps {
  data: BarChartDataItem[];
  isStacked: boolean;
  x: number;
  y: number;
  chartWidth: number;
  chartHeight: number;
  yMax: number;
  step: number;
  barWidth: number;
  colors: string[];
}

function BarChartBars({
  data,
  isStacked,
  x,
  y,
  chartHeight,
  yMax,
  step,
  barWidth,
  colors,
}: BarChartBarsProps) {
  const r = 8; // top corner radius
  return (
    <g className={styles.bars} transform={`translate(${x}, ${y})`}>
      {data.map((d, i) => {
        const bx = i * step;
        if (isStacked && d.values && d.values.length > 0) {
          const gapPx = 2;
          const numGaps = d.values.length - 1;
          const totalBarHeight =
            (d.values.reduce((a, b) => a + b, 0) / yMax) * chartHeight;
          const availableForSegments = totalBarHeight - numGaps * gapPx;
          const sumValues = d.values.reduce((a, b) => a + b, 0);
          let accY = chartHeight;
          return (
            <React.Fragment key={i}>
              {d.values.map((segmentValue, j) => {
                const segmentHeight =
                  sumValues > 0
                    ? (segmentValue / sumValues) * availableForSegments
                    : 0;
                accY -= segmentHeight; // stack from bottom
                const segY = accY;
                accY -= j < (d.values?.length ?? 0) - 1 ? gapPx : 0; // 2px gap between segments
                const fill = colors[j % colors.length];
                const isTopSegment = j === (d.values?.length ?? 0) - 1;
                const rr = isTopSegment
                  ? Math.min(r, barWidth / 2, segmentHeight)
                  : 0;
                if (rr <= 0) {
                  return (
                    <rect
                      key={`${i}-${j}`}
                      x={bx}
                      y={segY}
                      width={barWidth}
                      height={segmentHeight}
                      fill={fill}
                    />
                  );
                }
                const path = [
                  `M ${bx + rr} ${segY}`,
                  `L ${bx + barWidth - rr} ${segY}`,
                  `Q ${bx + barWidth} ${segY} ${bx + barWidth} ${segY + rr}`,
                  `L ${bx + barWidth} ${segY + segmentHeight}`,
                  `L ${bx} ${segY + segmentHeight}`,
                  `L ${bx} ${segY + rr}`,
                  `Q ${bx} ${segY} ${bx + rr} ${segY}`,
                  "Z",
                ].join(" ");
                return <path key={j} d={path} fill={fill} />;
              })}
            </React.Fragment>
          );
        }
        const barHeight = ((d.value ?? 0) / yMax) * chartHeight;
        const barY = chartHeight - barHeight;
        const fill = d.color ?? colors[i % colors.length];
        const rr = Math.min(r, barWidth / 2, barHeight);
        if (rr <= 0) {
          return (
            <rect
              key={i}
              x={bx}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill={fill}
            />
          );
        }
        const path = [
          `M ${bx + rr} ${barY}`,
          `L ${bx + barWidth - rr} ${barY}`,
          `Q ${bx + barWidth} ${barY} ${bx + barWidth} ${barY + rr}`,
          `L ${bx + barWidth} ${barY + barHeight}`,
          `L ${bx} ${barY + barHeight}`,
          `L ${bx} ${barY + rr}`,
          `Q ${bx} ${barY} ${bx + rr} ${barY}`,
          "Z",
        ].join(" ");
        return <path key={i} d={path} fill={fill} />;
      })}
    </g>
  );
}

const BarChart = Object.assign(BarChartRoot, {
  Grid: BarChartGrid,
  YAxis: BarChartYAxis,
  XAxis: BarChartXAxis,
  Bars: BarChartBars,
});

export { BarChart };
