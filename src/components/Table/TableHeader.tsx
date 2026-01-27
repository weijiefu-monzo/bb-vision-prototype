"use client";

import React, { ReactNode, HTMLAttributes } from "react";
import styles from "./Table.module.css";

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export function TableHeader({ children, className, ...props }: TableHeaderProps) {
  return (
    <thead className={`${styles.tableHeader} ${className || ""}`} {...props}>
      {children}
    </thead>
  );
}
