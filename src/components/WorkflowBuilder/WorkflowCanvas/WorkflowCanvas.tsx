"use client";

import React, { ReactNode } from "react";
import styles from "./WorkflowCanvas.module.css";

export interface WorkflowCanvasProps {
  /** Main canvas content; leave empty for now, build flow here later */
  children?: ReactNode;
  className?: string;
}

export default function WorkflowCanvas({
  children,
  className,
}: WorkflowCanvasProps) {
  return (
    <div className={`${styles.canvas} ${className ?? ""}`} data-workflow-canvas>
      {children}
    </div>
  );
}
