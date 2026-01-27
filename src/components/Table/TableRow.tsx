"use client";

import React, { ReactNode, HTMLAttributes } from "react";
import styles from "./Table.module.css";

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
}

export function TableRow({ children, className, ...props }: TableRowProps) {
  return (
    <tr className={`${styles.tableRow} ${className || ""}`} {...props}>
      {children}
    </tr>
  );
}
