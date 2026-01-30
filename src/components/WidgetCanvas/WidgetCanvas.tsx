"use client";

import React, {
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
  type ReactNode,
} from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Widget } from "./Widget";
import { IconButton } from "../IconButton";
import styles from "./WidgetCanvas.module.css";

export interface WidgetItem {
  id: string;
  /** Column span: 1 (default) or 2 */
  span?: 1 | 2;
  /** Custom content for the widget */
  children?: ReactNode;
}

/** Controls how much space the drop placeholder takes while dragging. 'full' = full widget height (can push others a lot). 'compact' = minimal height so layout shift is smaller. */
export type DropPlaceholderSize = "full" | "compact";

export interface WidgetCanvasProps {
  /** Widget config (id and optional span). If omitted, canvas is empty. */
  widgets?: WidgetItem[];
  /** Called when widget order changes (ordered ids) */
  onReorder?: (widgetIds: string[]) => void;
  /** Called when a widget's span is changed (e.g. via the chevron button) */
  onWidgetSpanChange?: (widgetId: string, newSpan: 1 | 2) => void;
  /** Called when a widget is removed (e.g. via the delete button) */
  onWidgetRemove?: (widgetId: string) => void;
  /** When false, widgets are display-only: not draggable, resizable, or deletable. When true, full customization is enabled. */
  customizable?: boolean;
  /** When true, canvas spans full width. When false, max-content width is applied. */
  fullWidth?: boolean;
  /** Size of the drop target placeholder while dragging. 'full' (default) uses full widget height; 'compact' uses minimal height to reduce layout shift. */
  dropPlaceholderSize?: DropPlaceholderSize;
  /** Optional class for the root element */
  className?: string;
}

interface SortableWidgetItemProps {
  id: string;
  span?: 1 | 2;
  children?: ReactNode;
  /** When true, this widget is affected by the current drag (not the dragged item) */
  isAffected?: boolean;
  /** When false, widget is display-only (no drag, resize, delete) */
  customizable?: boolean;
  /** Called when user toggles span via the chevron button */
  onSpanChange?: (widgetId: string, newSpan: 1 | 2) => void;
  /** Called when user removes the widget via the delete button */
  onRemove?: (widgetId: string) => void;
}

function SortableWidgetItem({
  id,
  span = 1,
  children,
  isAffected = false,
  customizable = true,
  onSpanChange,
  onRemove,
}: SortableWidgetItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const stopDrag = (e: React.MouseEvent | React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleSpanClick = (e: React.MouseEvent) => {
    stopDrag(e);
    if (span === 2) onSpanChange?.(id, 1);
    else onSpanChange?.(id, 2);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    stopDrag(e);
    onRemove?.(id);
  };

  const showActions =
    customizable && (onSpanChange != null || onRemove != null);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.sortableWidget} ${span === 2 ? styles.span2 : ""} ${isDragging ? styles.isDragging : ""} ${isAffected ? styles.affected : ""} ${!customizable ? styles.notCustomizable : ""}`}
      {...(customizable ? attributes : {})}
      {...(customizable ? listeners : {})}
    >
      <div className={styles.widgetWithToggle}>
        <Widget span={span}>{children}</Widget>
        {showActions && (
          <div className={styles.widgetActions}>
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
      </div>
    </div>
  );
}

function DropTargetPlaceholderOverlay({
  rect,
  span,
  size,
}: {
  rect: { left: number; top: number; width: number; height: number } | null;
  span: 1 | 2;
  size: DropPlaceholderSize;
}) {
  if (rect == null) return null;
  const isCompact = size === "compact";
  return (
    <div
      className={`${styles.dropTargetPlaceholder} ${styles.dropTargetPlaceholderOverlay} ${span === 2 ? styles.dropTargetPlaceholderSpan2 : ""} ${isCompact ? styles.dropTargetPlaceholderCompact : ""}`}
      aria-hidden
      style={{
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: isCompact ? Math.min(8, rect.height) : rect.height,
      }}
    ></div>
  );
}

export default function WidgetCanvas({
  widgets: controlledWidgets,
  onReorder,
  onWidgetSpanChange,
  onWidgetRemove,
  customizable = false,
  fullWidth = false,
  dropPlaceholderSize = "full",
  className,
}: WidgetCanvasProps) {
  const [internalWidgets, setInternalWidgets] = useState<WidgetItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [activeWidgetHeight, setActiveWidgetHeight] = useState<number | null>(
    null,
  );
  const widgets = controlledWidgets ?? internalWidgets;
  const widgetIds = widgets.map((w) => w.id);

  const overIndex =
    activeId != null && overId != null && activeId !== overId
      ? widgets.findIndex((w) => w.id === overId)
      : -1;
  const insertionIndex = overIndex >= 0 ? overIndex : null;
  const activeWidget =
    activeId != null ? widgets.find((w) => w.id === activeId) : null;
  const activeSpan = activeWidget?.span ?? 1;

  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [placeholderRect, setPlaceholderRect] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  const placeholderHeight =
    activeWidgetHeight != null
      ? dropPlaceholderSize === "compact"
        ? Math.min(8, activeWidgetHeight)
        : activeWidgetHeight
      : null;

  useLayoutEffect(() => {
    if (
      insertionIndex == null ||
      rootRef.current == null ||
      gridRef.current == null ||
      widgets.length === 0
    ) {
      const id = requestAnimationFrame(() => setPlaceholderRect(null));
      return () => cancelAnimationFrame(id);
    }
    const root = rootRef.current.getBoundingClientRect();
    const grid = gridRef.current;
    const children = grid.children;
    const gap = 16;
    const heightToUse = placeholderHeight ?? 120;
    let rect: {
      left: number;
      top: number;
      width: number;
      height: number;
    } | null = null;
    if (insertionIndex < children.length) {
      const child = children[insertionIndex] as HTMLElement | undefined;
      if (child) {
        const r = child.getBoundingClientRect();
        rect = {
          left: r.left - root.left,
          top: r.top - root.top,
          width: r.width,
          height: heightToUse,
        };
      }
    } else if (insertionIndex === widgets.length && children.length > 0) {
      const last = children[children.length - 1] as HTMLElement;
      const r = last.getBoundingClientRect();
      const gridRect = grid.getBoundingClientRect();
      const placeWidth =
        activeSpan === 2 ? gridRect.width : gridRect.width / 2 - gap / 2;
      rect = {
        left: gridRect.left - root.left,
        top: r.bottom - root.top + gap,
        width: placeWidth,
        height:
          dropPlaceholderSize === "compact" ? 8 : heightToUse,
      };
    }
    const id = requestAnimationFrame(() => setPlaceholderRect(rect));
    return () => cancelAnimationFrame(id);
  }, [
    insertionIndex,
    widgets.length,
    activeSpan,
    dropPlaceholderSize,
    placeholderHeight,
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: customizable ? 8 : 9999 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const id = String(event.active.id);
      setActiveId(id);
      const idx = widgets.findIndex((w) => w.id === id);
      if (gridRef.current != null && idx >= 0) {
        const el = gridRef.current.children[idx] as HTMLElement | undefined;
        if (el) {
          setActiveWidgetHeight(el.getBoundingClientRect().height);
        } else {
          setActiveWidgetHeight(null);
        }
      } else {
        setActiveWidgetHeight(null);
      }
    },
    [widgets],
  );

  const handleDragOver = useCallback((event: DragOverEvent) => {
    setOverId(event.over ? String(event.over.id) : null);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveId(null);
      setOverId(null);
      setActiveWidgetHeight(null);
      const { active, over } = event;
      if (over == null || active.id === over.id) return;
      const oldIndex = widgets.findIndex((w) => w.id === String(active.id));
      const newIndex = widgets.findIndex((w) => w.id === String(over.id));
      if (oldIndex === -1 || newIndex === -1) return;
      const next = arrayMove(widgets, oldIndex, newIndex);
      if (controlledWidgets == null) setInternalWidgets(next);
      onReorder?.(next.map((w) => w.id));
    },
    [widgets, controlledWidgets, onReorder],
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
    setOverId(null);
    setActiveWidgetHeight(null);
  }, []);

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${fullWidth ? styles.fullWidth : ""} ${className ?? ""}`}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={widgetIds} strategy={rectSortingStrategy}>
          <div ref={gridRef} className={styles.grid}>
            {widgets.map((w) => (
              <SortableWidgetItem
                key={w.id}
                id={w.id}
                span={w.span}
                isAffected={activeId != null && w.id !== activeId}
                customizable={customizable}
                onSpanChange={onWidgetSpanChange}
                onRemove={onWidgetRemove}
              >
                {w.children}
              </SortableWidgetItem>
            ))}
          </div>
          <DropTargetPlaceholderOverlay
            rect={placeholderRect}
            span={activeSpan}
            size={dropPlaceholderSize}
          />
        </SortableContext>
      </DndContext>
    </div>
  );
}
