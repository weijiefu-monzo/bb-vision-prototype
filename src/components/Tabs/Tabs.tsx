"use client";

import React, { HTMLAttributes } from "react";
import styles from "./Tabs.module.css";

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** List of tabs; only one can be active at a time */
  tabs: TabItem[];
  /** Id of the currently active tab */
  value: string;
  /** Called when the user selects a different tab */
  onChange: (value: string) => void;
  /** When true, the tab list and tabs expand to full width of the container */
  fullWidth?: boolean;
}

export default function Tabs({
  tabs,
  value,
  onChange,
  fullWidth = false,
  className,
  ...props
}: TabsProps) {
  return (
    <div
      className={`${styles.tabs} ${fullWidth ? styles.tabsFullWidth : ""} ${className ?? ""}`}
      role="tablist"
      aria-label="Tabs"
      {...props}
    >
      {tabs.map((tab) => {
        const isActive = value === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            className={`${styles.tab} ${fullWidth ? styles.tabFullWidth : ""} ${isActive ? styles.tabActive : ""}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
