"use client";

import React, { ReactNode, useCallback } from "react";
import styles from "./Card.module.css";

export interface CardProps {
  /** Card content (container). */
  children: ReactNode;
  /** Whether the card is selected (for single- or multi-select). */
  selected?: boolean;
  /** Called when the card is activated (click or Enter/Space). Omit for non-interactive display. */
  onClick?: () => void;
  /** Optional id for use in selection state (e.g. aria-describedby). */
  id?: string;
  className?: string;
}

export default function Card({
  children,
  selected = false,
  onClick,
  id,
  className,
}: CardProps) {
  const isInteractive = onClick != null;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isInteractive) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    },
    [isInteractive, onClick]
  );

  if (isInteractive) {
    return (
      <div
        id={id}
        role="button"
        tabIndex={0}
        aria-selected={selected}
        className={`${styles.card} ${styles.cardInteractive} ${selected ? styles.cardSelected : ""} ${className ?? ""}`}
        onClick={onClick}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      id={id}
      className={`${styles.card} ${selected ? styles.cardSelected : ""} ${className ?? ""}`}
      aria-selected={selected}
    >
      {children}
    </div>
  );
}
