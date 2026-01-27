'use client';

import React, { useState, ReactNode } from 'react';
import styles from './NavItem.module.css';

export interface NavItemProps {
  label?: ReactNode;
  leadingIcon?: ReactNode;
  trailingSlot?: ReactNode;
  defaultExpanded?: boolean;
  expanded?: boolean;
  active?: boolean;
  onExpandChange?: (expanded: boolean) => void;
  onClick?: () => void;
  className?: string;
}

export default function NavItem({
  label,
  leadingIcon,
  trailingSlot,
  defaultExpanded = false,
  expanded: controlledExpanded,
  active = false,
  onExpandChange,
  onClick,
  className,
}: NavItemProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  // Use controlled expanded state if provided, otherwise use internal state
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  // Only allow toggle if not controlled
  const handleToggle = () => {
    if (controlledExpanded === undefined) {
      const newExpanded = !isExpanded;
      setInternalExpanded(newExpanded);
      onExpandChange?.(newExpanded);
    }
    // Call onClick callback if provided
    onClick?.();
  };

  // Handle click - call onClick if provided, otherwise handle toggle
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (controlledExpanded === undefined) {
      handleToggle();
    }
  };

  return (
    <div className={`${styles.navItem} ${className || ''}`}>
      <div 
        className={`${styles.navItemHeader} ${isExpanded ? styles.navItemHeaderExpanded : styles.navItemHeaderCollapsed} ${active ? styles.navItemHeaderActive : ''}`}
        onClick={onClick || controlledExpanded === undefined ? handleClick : undefined}
        style={{ cursor: onClick || controlledExpanded === undefined ? 'pointer' : 'default' }}
      >
        {leadingIcon && (
          <div className={`${styles.leadingIcon} ${active ? styles.leadingIconActive : ''}`}>
            {React.isValidElement(leadingIcon) && active
              ? React.cloneElement(leadingIcon, {
                  color: 'inverse-content-primary'
                } as { color: string })
              : leadingIcon}
          </div>
        )}
        {label && (
          <div className={styles.navItemLabel}>
            {label}
          </div>
        )}
        {trailingSlot && (
          <div className={styles.trailingSlot}>
            {trailingSlot}
          </div>
        )}
      </div>
    </div>
  );
}
