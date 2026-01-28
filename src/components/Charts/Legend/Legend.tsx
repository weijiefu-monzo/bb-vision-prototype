"use client";

import React from "react";
import styles from "./Legend.module.css";

export interface ChartLegendItem {
  label: string;
  color: string;
}

export interface ChartLegendProps {
  /** List of items: label and color (e.g. CSS color or var(--chart-...)) */
  items: ChartLegendItem[];
  /** Optional class for the legend container (e.g. margin override) */
  className?: string;
}

export default function ChartLegend({ items, className }: ChartLegendProps) {
  if (items.length === 0) return null;
  return (
    <div
      className={className ? `${styles.legend} ${className}` : styles.legend}
      role="list"
    >
      {items.map((item, i) => (
        <div key={i} className={styles.legendItem} role="listitem">
          <span
            className={styles.legendSwatch}
            style={{ backgroundColor: item.color }}
          />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
