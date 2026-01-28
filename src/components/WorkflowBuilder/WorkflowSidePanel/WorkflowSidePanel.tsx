"use client";

import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import styles from "./WorkflowSidePanel.module.css";

const DEFAULT_WIDTH = 320;
const DEFAULT_MAX_WIDTH = 480;
const DEFAULT_MIN_WIDTH = 240;

export interface WorkflowSidePanelProps {
  /** Panel content */
  children?: ReactNode;
  /** Default width in pixels when no previous size is stored */
  defaultWidth?: number;
  /** Maximum width in pixels */
  maxWidth?: number;
  /** Minimum width in pixels */
  minWidth?: number;
  className?: string;
}

export default function WorkflowSidePanel({
  children,
  defaultWidth = DEFAULT_WIDTH,
  maxWidth = DEFAULT_MAX_WIDTH,
  minWidth = DEFAULT_MIN_WIDTH,
  className,
}: WorkflowSidePanelProps) {
  const [width, setWidth] = useState(defaultWidth);
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const [dividerMouseY, setDividerMouseY] = useState<number | null>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const clamp = useCallback(
    (value: number) => Math.min(maxWidth, Math.max(minWidth, value)),
    [minWidth, maxWidth]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);
      setStartX(e.clientX);
      setStartWidth(width);
    },
    [width]
  );

  const handleDividerMouseMove = useCallback((e: React.MouseEvent) => {
    if (dividerRef.current) {
      const rect = dividerRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top;
      setDividerMouseY(y);
    }
  }, []);

  const handleDividerMouseLeave = useCallback(() => {
    if (!isResizing) {
      setDividerMouseY(null);
    }
  }, [isResizing]);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const delta = startX - e.clientX;
      setWidth((w) => clamp(startWidth + delta));
      if (dividerRef.current) {
        const rect = dividerRef.current.getBoundingClientRect();
        const y = e.clientY - rect.top;
        setDividerMouseY(y);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, startX, startWidth, clamp]);

  const effectiveWidth = clamp(width);

  return (
    <div
      className={`${styles.wrapper} ${isResizing ? styles.resizing : ""} ${className ?? ""}`}
      style={{ width: effectiveWidth }}
      data-workflow-side-panel
    >
      <div
        ref={dividerRef}
        className={styles.resizeHandle}
        onMouseDown={handleMouseDown}
        onMouseMove={handleDividerMouseMove}
        onMouseLeave={handleDividerMouseLeave}
        role="separator"
        aria-orientation="vertical"
        aria-valuenow={effectiveWidth}
        aria-valuemin={minWidth}
        aria-valuemax={maxWidth}
        aria-label="Resize side panel"
      >
        <div className={styles.dividerLine} />
        <div
          className={`${styles.dividerGradient} ${dividerMouseY !== null || isResizing ? styles.dividerGradientVisible : ""}`}
          style={{ top: dividerMouseY !== null ? `${dividerMouseY}px` : undefined }}
        />
      </div>
      <div className={styles.panel}>{children}</div>
    </div>
  );
}
