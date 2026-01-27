"use client";

import React, { ReactNode, HTMLAttributes } from "react";
import styles from "./Table.module.css";

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  children: ReactNode;
  fullWidth?: boolean;
}

export default function Table({ children, fullWidth = false, className, ...props }: TableProps) {
  return (
    <table
      className={`${styles.table} ${fullWidth ? styles.tableFullWidth : ""} ${className || ""}`}
      {...props}
    >
      {children}
    </table>
  );
}
