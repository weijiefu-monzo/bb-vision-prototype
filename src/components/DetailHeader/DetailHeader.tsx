"use client";

import React, { ReactNode } from "react";
import { IconButton } from "@/components";
import styles from "./DetailHeader.module.css";

export interface DetailHeaderProps {
  title: string;
  description?: string | ReactNode;
  onBack?: () => void;
  backButtonAriaLabel?: string;
  className?: string;
}

export default function DetailHeader({
  title,
  description,
  onBack,
  backButtonAriaLabel = "Go back",
  className,
}: DetailHeaderProps) {
  return (
    <header className={`${styles.detailHeader} ${className || ""}`}>
      {onBack && (
        <div className={styles.backButtonContainer}>
          <IconButton
            variant="tertiary"
            size="medium"
            icon="navigation_xmark"
            aria-label={backButtonAriaLabel}
            onClick={onBack}
          />
        </div>
      )}
      <div className={styles.headerContent}>
        <h2 className={styles.title}>{title}</h2>
        {description && (
          <div className={styles.description}>
            {typeof description === "string" ? (
              <p>{description}</p>
            ) : (
              description
            )}
          </div>
        )}
      </div>
    </header>
  );
}
