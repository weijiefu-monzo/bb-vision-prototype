"use client";

import React from "react";
import { Icon } from "@/components";
import styles from "./MonzoAIThinking.module.css";

export interface MonzoAIThinkingProps {
  /** Icon size */
  size?: "x-small" | "small" | "medium" | "large";
  /** Optional class for the root element */
  className?: string;
}

export default function MonzoAIThinking({
  size = "medium",
  className,
}: MonzoAIThinkingProps) {
  return (
    <div
      className={`${styles.root} ${className ?? ""}`}
      role="status"
      aria-label="Monzo AI is thinking"
    >
      <Icon
        name="navigation_subscription"
        size={size}
        color="content-secondary"
        className={styles.icon}
      />
    </div>
  );
}
