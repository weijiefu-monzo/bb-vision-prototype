"use client";

import React, { ReactNode } from "react";
import { Box } from "../../Box";
import { IconButton } from "../../IconButton";
import styles from "./Widget.module.css";

export interface WidgetProps {
  /** Optional content; leave empty for demo placeholder */
  children?: ReactNode;
  /** Column span in a 2-column grid: 1 (default) or 2 */
  span?: 1 | 2;
  /** Optional class for the root element */
  className?: string;
  /** When true and action callbacks are provided, shows span toggle and remove buttons */
  customizable?: boolean;
  /** Widget id (required for action callbacks) */
  id?: string;
  /** Called when user toggles span via the chevron button */
  onSpanChange?: (widgetId: string, newSpan: 1 | 2) => void;
  /** Called when user removes the widget via the delete button */
  onRemove?: (widgetId: string) => void;
  /** When true, content is visually de-emphasised (e.g. during drag of another widget) */
  isAffected?: boolean;
}

export default function Widget({
  children,
  span = 1,
  className,
  customizable = false,
  id,
  onSpanChange,
  onRemove,
  isAffected = false,
}: WidgetProps) {
  const showActions =
    customizable &&
    id != null &&
    (onSpanChange != null || onRemove != null);

  const stopDrag = (e: React.MouseEvent | React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleSpanClick = (e: React.MouseEvent) => {
    stopDrag(e);
    if (span === 2) onSpanChange?.(id!, 1);
    else onSpanChange?.(id!, 2);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    stopDrag(e);
    onRemove?.(id!);
  };

  return (
    <Box className={`${styles.widget} ${className ?? ""}`}>
      <div
        className={`${styles.widgetContent} ${isAffected ? styles.affected : ""}`}
      >
        {children}
      </div>
      {showActions && (
        <div
          className={`${styles.widgetActions} ${isAffected ? styles.affected : ""}`}
        >
          {onSpanChange != null && (
            <IconButton
              type="button"
              variant="secondary"
              size="small"
              icon={
                span === 2
                  ? "navigation_chevron_left"
                  : "navigation_chevron_right"
              }
              iconSize="small"
              aria-label={
                span === 2 ? "Narrow to 1 column" : "Widen to 2 columns"
              }
              className={styles.spanToggle}
              onClick={handleSpanClick}
              onPointerDown={stopDrag}
            />
          )}
          {onRemove != null && (
            <IconButton
              type="button"
              variant="secondary"
              size="small"
              icon="action_delete"
              iconSize="small"
              aria-label="Remove widget"
              className={styles.removeButton}
              onClick={handleRemoveClick}
              onPointerDown={stopDrag}
            />
          )}
        </div>
      )}
    </Box>
  );
}
