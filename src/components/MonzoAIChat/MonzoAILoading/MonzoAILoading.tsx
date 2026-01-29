"use client";

import React from "react";
import styles from "./MonzoAILoading.module.css";

export interface MonzoAILoadingProps {
  /** Optional class for the root element */
  className?: string;
}

export default function MonzoAILoading({ className }: MonzoAILoadingProps) {
  return (
    <div
      className={`${styles.root} ${className ?? ""}`}
      role="status"
      aria-label="Monzo AI is loading"
    >
      <span className={styles.dot} aria-hidden />
      <span className={styles.dot} aria-hidden />
      <span className={styles.dot} aria-hidden />
    </div>
  );
}
