"use client";

import React, { ButtonHTMLAttributes } from "react";
import { Icon } from "@/components";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "medium" | "large";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  leadingIcon?: string;
  trailingIcon?: string;
  iconSize?: "small" | "medium" | "large";
}

export default function Button({
  variant = "primary",
  size = "large",
  children,
  leadingIcon,
  trailingIcon,
  iconSize,
  className,
  ...props
}: ButtonProps) {
  // Match Button text color: primary uses inverse-content-primary, secondary/tertiary use semantic-action-fill-primary-default
  const iconColor =
    variant === "primary"
      ? "inverse-content-primary"
      : "semantic-action-fill-primary-default"; // Matches Button secondary/tertiary text color

  // Auto-adjust icon size based on button size if not explicitly provided
  // Medium buttons use smaller icons to maintain consistent height
  const effectiveIconSize = iconSize || (size === "medium" ? "small" : "medium");

  return (
    <button
      className={`${styles.button} ${styles[`button${variant.charAt(0).toUpperCase() + variant.slice(1)}`]} ${styles[`button${size.charAt(0).toUpperCase() + size.slice(1)}`]} ${className || ""}`}
      {...props}
    >
      {leadingIcon && (
        <span className={styles.leadingIcon}>
          <Icon name={leadingIcon} size={effectiveIconSize} color={iconColor} />
        </span>
      )}
      {children}
      {trailingIcon && (
        <span className={styles.trailingIcon}>
          <Icon name={trailingIcon} size={effectiveIconSize} color={iconColor} />
        </span>
      )}
    </button>
  );
}
