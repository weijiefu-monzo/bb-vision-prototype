"use client";

import React, { ReactNode } from "react";
import { IconButton } from "@/components";
import styles from "./PageHeader.module.css";

export interface PageHeaderProps {
  title: string;
  description?: string | ReactNode;
  /** Optional content rendered at the end of the header (e.g. actions) */
  trailing?: ReactNode;
  onBack?: () => void;
  backButtonAriaLabel?: string;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  trailing,
  onBack,
  backButtonAriaLabel = "Go back",
  className,
}: PageHeaderProps) {
  return (
    <header className={`${styles.pageHeader} ${className || ""}`}>
      {onBack && (
        <div className={styles.backButtonContainer}>
          <IconButton
            variant="tertiary"
            size="medium"
            icon="navigation_arrow_left"
            aria-label={backButtonAriaLabel}
            onClick={onBack}
          />
        </div>
      )}
      <div className={styles.headerRow}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{title}</h1>
          {description && (
            <div className={styles.description}>
              {typeof description === "string" ? <p>{description}</p> : description}
            </div>
          )}
        </div>
        {trailing != null && <div className={styles.trailing}>{trailing}</div>}
      </div>
    </header>
  );
}
