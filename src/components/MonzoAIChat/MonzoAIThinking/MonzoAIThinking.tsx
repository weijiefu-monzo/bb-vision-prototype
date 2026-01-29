"use client";

import React from "react";
import { Icon } from "@/components";
import styles from "./MonzoAIThinking.module.css";

export interface MonzoAIThinkingProps {
  /** Optional class for the root element */
  className?: string;
}

export default function MonzoAIThinking({ className }: MonzoAIThinkingProps) {
  return (
    <div
      className={`${styles.root} ${className ?? ""}`}
      role="status"
      aria-label="Monzo AI is thinking"
    >
      <div className={styles.glowBack} aria-hidden />
      <div className={styles.glowBack2} aria-hidden />
      <div className={styles.circleWrap}>
        <Icon
          name="navigation_subscription_more"
          size={40}
          color="content-accent"
          className={styles.icon}
        />
      </div>
    </div>
  );
}
