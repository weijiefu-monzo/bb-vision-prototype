"use client";

import React from "react";
import { Card } from "@/components/Card";
import Icon from "@/components/Icon";
import styles from "./ActionCard.module.css";

export interface ActionCardProps {
  /** Icon name (e.g. from public/assets/icons) shown in the left avatar. */
  icon: string;
  /** Action title. */
  title: string;
  /** Short description below the title. */
  description: string;
  /** Called when the card is activated. */
  onClick?: () => void;
  /** Optional class name for the card root. */
  className?: string;
}

export default function ActionCard({
  icon,
  title,
  description,
  onClick,
  className,
}: ActionCardProps) {
  return (
    <Card onClick={onClick} className={className}>
      <div className={styles.actionCard}>
        <div className={styles.iconContainer}>
          <div className={styles.iconAvatar} aria-hidden>
            <Icon name={icon} size={20} />
          </div>
          <span className={styles.chevron} aria-hidden>
            <Icon name="navigation_chevron_right" size="large" />
          </span>
        </div>

        <div className={styles.content}>
          <span className={styles.title}>{title}</span>
          <span className={styles.description}>{description}</span>
        </div>
      </div>
    </Card>
  );
}
