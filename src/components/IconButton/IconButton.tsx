'use client';

import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { Icon } from '@/components';
import styles from './IconButton.module.css';

export type IconButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type IconButtonSize = 'small' | 'medium' | 'large';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  icon: string;
  iconSize?: 'small' | 'medium' | 'large';
  'aria-label': string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    variant = 'primary',
    size = 'large',
    icon,
    iconSize,
    className,
    ...props
  },
  ref
) {
  // Match Button variant colors: primary uses inverse-content-primary, secondary/tertiary use semantic-action-fill-primary-default
  // Icon component supports semantic- prefix, so we can use the token directly
  const iconColor = variant === 'primary'
    ? 'inverse-content-primary'
    : 'semantic-action-fill-primary-default'; // Matches Button secondary/tertiary text color

  // Auto-adjust icon size based on button size if not explicitly provided
  const effectiveIconSize =
    iconSize ||
    (size === 'small' ? 'small' : size === 'medium' ? 'medium' : 'medium');

  return (
    <button
      ref={ref}
      className={`${styles.iconButton} ${styles[`iconButton${variant.charAt(0).toUpperCase() + variant.slice(1)}`]} ${styles[`iconButton${size.charAt(0).toUpperCase() + size.slice(1)}`]} ${className || ''}`}
      {...props}
    >
      <Icon name={icon} size={effectiveIconSize} color={iconColor} />
    </button>
  );
});

export default IconButton;
