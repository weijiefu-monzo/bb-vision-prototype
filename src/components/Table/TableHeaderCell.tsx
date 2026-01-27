"use client";

import React, { ReactNode, HTMLAttributes } from "react";
import styles from "./Table.module.css";

export interface TableHeaderCellProps extends HTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  align?: "left" | "right" | "center";
}

export function TableHeaderCell({ children, align = "left", className, ...props }: TableHeaderCellProps) {
  return (
    <th
      className={`${styles.tableHeaderCell} ${styles[`tableHeaderCell${align.charAt(0).toUpperCase() + align.slice(1)}`]} ${className || ""}`}
      {...props}
    >
      {children}
    </th>
  );
}
