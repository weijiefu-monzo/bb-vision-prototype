"use client";

import React, { ReactNode } from "react";
import { IconButton } from "@/components";
import styles from "./FullscreenDialogHeader.module.css";

export interface FullscreenDialogHeaderProps {
  title: string;
  itemLabel?: string;
  itemCaption?: string;
  trailing?: ReactNode;
  onClose: () => void;
  closeButtonAriaLabel?: string;
  className?: string;
}

export default function FullscreenDialogHeader({
  title,
  itemLabel,
  itemCaption,
  trailing,
  onClose,
  closeButtonAriaLabel = "Close",
  className,
}: FullscreenDialogHeaderProps) {
  const hasItemBlock = itemLabel != null || itemCaption != null;

  return (
    <header className={`${styles.header} ${className ?? ""}`}>
      <h1 className={styles.title}>{title}</h1>

      {hasItemBlock && <div className={styles.divider} role="presentation" />}

      {hasItemBlock && (
        <div className={styles.itemBlock}>
          {itemLabel != null && <span className={styles.itemLabel}>{itemLabel}</span>}
          {itemCaption != null && <span className={styles.itemCaption}>{itemCaption}</span>}
        </div>
      )}

      <div className={styles.spacer} aria-hidden />

      {trailing != null && <div className={styles.trailingSlot}>{trailing}</div>}

      <div className={styles.closeButtonWrapper}>
        <IconButton
          variant="tertiary"
          size="medium"
          icon="navigation_xmark"
          aria-label={closeButtonAriaLabel}
          onClick={onClose}
        />
      </div>
    </header>
  );
}
