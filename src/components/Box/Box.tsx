"use client";

import React, { ReactNode, HTMLAttributes } from "react";
import styles from "./Box.module.css";

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  noPadding?: boolean;
}

export default function Box({
  children,
  noPadding = false,
  className,
  ...props
}: BoxProps) {
  return (
    <div
      className={`${styles.box} ${noPadding ? styles.noPadding : ""} ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
}
