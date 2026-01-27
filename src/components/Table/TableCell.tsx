"use client";

import React, { ReactNode, HTMLAttributes } from "react";
import styles from "./Table.module.css";

export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  align?: "left" | "right" | "center";
}

export function TableCell({ children, align = "left", className, ...props }: TableCellProps) {
  return (
    <td
      className={`${styles.tableCell} ${styles[`tableCell${align.charAt(0).toUpperCase() + align.slice(1)}`]} ${className || ""}`}
      {...props}
    >
      {children}
    </td>
  );
}
