"use client";

import React, { ReactNode } from "react";
import { Box } from "../../Box";
import styles from "./Widget.module.css";

export interface WidgetProps {
  /** Optional content; leave empty for demo placeholder */
  children?: ReactNode;
  /** Column span in a 2-column grid: 1 (default) or 2 */
  span?: 1 | 2;
  /** Optional class for the root element */
  className?: string;
}

export default function Widget({
  children,
  span = 1,
  className,
}: WidgetProps) {
  return (
    <Box className={`${styles.widget} ${className ?? ""}`}>
      {children}
    </Box>
  );
}
