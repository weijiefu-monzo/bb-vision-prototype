"use client";

import React, { ReactNode, useEffect, useRef } from "react";
import { IconButton } from "@/components";
import styles from "./FocusView.module.css";

export interface FocusViewProps {
  open: boolean;
  onClose: () => void;
  /** When provided, replaces the default close row; use FocusViewHeader for title, item label/caption, trailing slot, and close button. */
  header?: ReactNode;
  children?: ReactNode;
  closeButtonAriaLabel?: string;
  className?: string;
}

export default function FocusView({
  open,
  onClose,
  header,
  children,
  closeButtonAriaLabel = "Close",
  className,
}: FocusViewProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const showDefaultCloseRow = header == null;

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open && showDefaultCloseRow) {
      const t = requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
      return () => cancelAnimationFrame(t);
    }
  }, [open, showDefaultCloseRow]);

  if (!open) return null;

  return (
    <div
      className={`${styles.overlay} ${className || ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Focus view"
    >
      <div className={styles.backdrop} onClick={onClose} aria-hidden />
      <div className={styles.container}>
        {header != null ? header : (
          <div className={styles.closeRow}>
            <IconButton
              ref={closeButtonRef}
              variant="tertiary"
              size="medium"
              icon="navigation_xmark"
              aria-label={closeButtonAriaLabel}
              onClick={onClose}
            />
          </div>
        )}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
