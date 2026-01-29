"use client";

import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import styles from "./FocusViewSidePanel.module.css";

const DEFAULT_WIDTH = 320;
const DEFAULT_MAX_WIDTH = 480;
const DEFAULT_MIN_WIDTH = 240;

export interface FocusViewSidePanelProps {
  /** Whether the panel is expanded (visible). When false, panel animates to 0 width. */
  open?: boolean;
  /** Panel content (e.g. tabs + tab content). */
  children?: ReactNode;
  /** Default width in pixels when no previous size is stored */
  defaultWidth?: number;
  /** Maximum width in pixels */
  maxWidth?: number;
  /** Minimum width in pixels */
  minWidth?: number;
  /** Optional data attribute for styling (e.g. data-workflow-side-panel) */
  dataAttribute?: string;
  className?: string;
}

export default function FocusViewSidePanel({
  open = true,
  children,
  defaultWidth = DEFAULT_WIDTH,
  maxWidth = DEFAULT_MAX_WIDTH,
  minWidth = DEFAULT_MIN_WIDTH,
  dataAttribute,
  className,
}: FocusViewSidePanelProps) {
  const [width, setWidth] = useState(defaultWidth);
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const [dividerMouseY, setDividerMouseY] = useState<number | null>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const clamp = useCallback(
    (value: number) => Math.min(maxWidth, Math.max(minWidth, value)),
    [minWidth, maxWidth],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);
      setStartX(e.clientX);
      setStartWidth(width);
    },
    [width],
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
      setWidth(() => clamp(startWidth + delta));
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
      className={`${styles.wrapper} ${!open ? styles.closed : ""} ${isResizing ? styles.resizing : ""} ${className ?? ""}`}
      style={{ width: open ? effectiveWidth : 0 }}
      {...(dataAttribute ? { [dataAttribute]: "" } : {})}
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
          style={{
            top: dividerMouseY !== null ? `${dividerMouseY}px` : undefined,
          }}
        />
      </div>
      <div className={styles.panel}>{children}</div>
    </div>
  );
}
