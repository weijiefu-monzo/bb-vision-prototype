"use client";

import React, { HTMLAttributes } from "react";
import { Icon } from "@/components";
import styles from "./Pill.module.css";

export type PillSeverity = "default" | "positive" | "negative" | "warning";

export interface PillProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  icon?: string;
  label?: string;
  severity?: PillSeverity;
}

export default function Pill({
  icon,
  label,
  severity = "default",
  className,
  ...props
}: PillProps) {
  return (
    <span
      className={`${styles.pill} ${styles[`pill${severity.charAt(0).toUpperCase() + severity.slice(1)}`]} ${className || ""}`}
      {...props}
    >
      {icon && (
        <Icon
          name={icon}
          size="small"
        />
      )}
      {label && <span className={styles.label}>{label}</span>}
    </span>
  );
}
