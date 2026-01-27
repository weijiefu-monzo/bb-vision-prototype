"use client";

import React, { ReactNode } from "react";
import { Icon } from "@/components";
import styles from "./PageSection.module.css";

export interface PageSectionProps {
  title: string;
  description?: string;
  icon?: string;
  trailing?: ReactNode;
  children: ReactNode;
  hasMaxWidth?: boolean;
  className?: string;
}

export default function PageSection({
  title,
  description,
  icon,
  trailing,
  children,
  hasMaxWidth = true,
  className,
}: PageSectionProps) {
  return (
    <section
      className={`${styles.pageSection} ${hasMaxWidth ? styles.hasMaxWidth : ""} ${className || ""}`}
    >
      <div className={styles.sectionHeader}>
        <div className={styles.headerContent}>
          {icon && (
            <div className={styles.iconContainer}>
              <Icon name={icon} size="large" color="content-primary" />
            </div>
          )}
          <div className={styles.titleDescription}>
            <h2 className={styles.title}>{title}</h2>
            {description && <p className={styles.description}>{description}</p>}
          </div>
        </div>
        {trailing && <div className={styles.trailingSlot}>{trailing}</div>}
      </div>
      <div className={styles.sectionContent}>{children}</div>
    </section>
  );
}
