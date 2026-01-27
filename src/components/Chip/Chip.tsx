"use client";

import React, { HTMLAttributes } from "react";
import { Icon } from "@/components";
import styles from "./Chip.module.css";

export interface ChipProps extends Omit<HTMLAttributes<HTMLButtonElement>, "onClick"> {
  icon: string;
  label: string;
  selected?: boolean;
  onClick?: () => void;
  iconSize?: "small" | "medium" | "large";
}

export default function Chip({
  icon,
  label,
  selected = false,
  onClick,
  iconSize = "small",
  className,
  ...props
}: ChipProps) {
  return (
    <button
      className={`${styles.chip} ${selected ? styles.chipSelected : ""} ${className || ""}`}
      onClick={onClick}
      aria-pressed={selected}
      {...props}
    >
      <Icon
        name={icon}
        size={iconSize}
        color="semantic-action-fill-primary-default"
      />
      <span className={styles.label}>{label}</span>
    </button>
  );
}
