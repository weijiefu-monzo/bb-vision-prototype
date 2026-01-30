"use client";

import React, { ReactNode } from "react";
import { Icon } from "@/components";
import styles from "./PageSection.module.css";

export interface PageSectionProps {
  title?: string;
  description?: string;
  icon?: string;
  trailing?: ReactNode;
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export default function PageSection({
  title,
  description,
  icon,
  trailing,
  children,
  fullWidth = false,
  className,
}: PageSectionProps) {
  const hasHeader =
    !!(
      icon ||
      trailing ||
      (title != null && title !== "") ||
      (description != null && description !== "")
    );

  return (
    <section
      className={`${styles.pageSection} ${fullWidth ? styles.fullWidth : ""} ${className || ""}`}
    >
      {hasHeader && (
        <div className={styles.sectionHeader}>
          <div className={styles.headerContent}>
            {icon && (
              <div className={styles.iconContainer}>
                <Icon name={icon} size="large" color="content-primary" />
              </div>
            )}
            {((title != null && title !== "") ||
              (description != null && description !== "")) && (
              <div className={styles.titleDescription}>
                {title != null && title !== "" && (
                  <h2 className={styles.title}>{title}</h2>
                )}
                {description != null && description !== "" && (
                  <p className={styles.description}>{description}</p>
                )}
              </div>
            )}
          </div>
          {trailing && <div className={styles.trailingSlot}>{trailing}</div>}
        </div>
      )}
      <div className={styles.sectionContent}>{children}</div>
    </section>
  );
}
