"use client";

import React, { ReactNode, HTMLAttributes } from "react";
import { Box } from "@/components";
import styles from "./DataCard.module.css";

export type DataCardSeverity = "positive" | "warning" | "negative";

export interface DataCardProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  label: string;
  value?: string | ReactNode;
  caption?: string | ReactNode;
  graph?: ReactNode;
  severity?: DataCardSeverity;
}

export default function DataCard({
  label,
  value,
  caption,
  graph,
  severity,
  className,
  ...props
}: DataCardProps) {
  return (
    <Box className={`${styles.dataCard} ${className || ""}`} {...props}>
      <div className={styles.dataCardContent}>
        <div className={styles.label}>{label}</div>
        {graph && <div className={styles.graph}>{graph}</div>}
        {value && (
          <div
            className={`${styles.value} ${
              severity
                ? styles[
                    `value${severity.charAt(0).toUpperCase() + severity.slice(1)}`
                  ]
                : ""
            }`}
          >
            {value}
          </div>
        )}
        {caption && <div className={styles.caption}>{caption}</div>}
      </div>
    </Box>
  );
}
