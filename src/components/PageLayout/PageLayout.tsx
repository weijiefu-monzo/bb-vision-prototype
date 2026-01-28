"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import styles from "./PageLayout.module.css";

export type NavState = "expanded" | "collapsed" | "floating";

export interface PageLayoutProps {
  navContent: React.ReactNode;
  children: React.ReactNode;
  detailContent?: React.ReactNode;
  navExpandedWidth?: number;
  navCollapsedWidth?: number;
  detailMaxWidth?: number;
  detailDefaultWidth?: number;
  // Controlled props
  navState?: NavState;
  isDetailOpen?: boolean;
  detailWidth?: number;
  // Callbacks
  onNavStateChange?: (state: NavState) => void;
  onDetailOpenChange?: (isOpen: boolean) => void;
  onDetailWidthChange?: (width: number) => void;
}

export interface PageLayoutRef {
  setNavState: (state: NavState) => void;
  toggleDetail: () => void;
  openDetail: () => void;
  closeDetail: () => void;
  setDetailWidth: (width: number) => void;
}

const PageLayout = forwardRef<PageLayoutRef, PageLayoutProps>(
  (
    {
      navContent,
      children,
      detailContent,
      navExpandedWidth = 240,
      navCollapsedWidth = 72,
      detailMaxWidth = 600,
      detailDefaultWidth = 400,
      navState: controlledNavState,
      isDetailOpen: controlledIsDetailOpen,
      detailWidth: controlledDetailWidth,
      onNavStateChange,
      onDetailOpenChange,
      onDetailWidthChange,
    },
    ref,
  ) => {
    const [internalNavState, setInternalNavState] =
      useState<NavState>("expanded");
    const [internalIsDetailOpen, setInternalIsDetailOpen] = useState(false);
    // Use a ref to persist detail width across open/close cycles
    const detailWidthRef = useRef<number>(detailDefaultWidth);
    const [internalDetailWidth, setInternalDetailWidth] =
      useState(detailDefaultWidth);
    const [isResizing, setIsResizing] = useState(false);
    const [navFloatingTimeout, setNavFloatingTimeout] =
      useState<NodeJS.Timeout | null>(null);
    const [previousNavState, setPreviousNavState] =
      useState<NavState>("expanded");
    const [isHovering, setIsHovering] = useState(false);
    const [dividerMouseY, setDividerMouseY] = useState<number | null>(null);

    const navRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Use controlled or internal state
    const navState = controlledNavState ?? internalNavState;
    const isDetailOpen = controlledIsDetailOpen ?? internalIsDetailOpen;

    // Restore width from ref when detail panel opens (if not controlled)
    useEffect(() => {
      if (isDetailOpen && controlledDetailWidth === undefined) {
        // Panel opened, restore from ref if it has a custom width
        if (detailWidthRef.current !== detailDefaultWidth) {
          setInternalDetailWidth(detailWidthRef.current);
        }
      }
    }, [isDetailOpen, controlledDetailWidth, detailDefaultWidth]);

    // Use persisted width from ref if available, otherwise use state/default
    const detailWidth = controlledDetailWidth ?? internalDetailWidth;

    // Update ref when detail width changes (but not when controlled)
    useEffect(() => {
      if (controlledDetailWidth === undefined && internalDetailWidth) {
        detailWidthRef.current = internalDetailWidth;
      }
    }, [internalDetailWidth, controlledDetailWidth]);

    // Determine the effective nav state (for hover behavior)
    const effectiveNavState =
      isHovering && navState === "collapsed" ? "floating" : navState;

    // Handle nav state changes
    const handleNavStateChange = useCallback(
      (newState: NavState) => {
        if (controlledNavState === undefined) {
          setInternalNavState(newState);
        }
        onNavStateChange?.(newState);
      },
      [controlledNavState, onNavStateChange],
    );

    // Auto-collapse nav when detail opens
    // Handle this when detail state changes, not in an effect
    const handleDetailOpenChange = useCallback(
      (newValue: boolean) => {
        if (newValue && navState === "expanded") {
          // Detail is opening and nav is expanded, collapse it
          handleNavStateChange("collapsed");
        }
        if (controlledIsDetailOpen === undefined) {
          setInternalIsDetailOpen(newValue);
        }
        onDetailOpenChange?.(newValue);
      },
      [
        navState,
        controlledIsDetailOpen,
        handleNavStateChange,
        onDetailOpenChange,
      ],
    );

    // Handle controlled case: when isDetailOpen changes externally, collapse nav if needed
    const previousIsDetailOpenRef = useRef(isDetailOpen);
    useEffect(() => {
      // Only handle transition from closed to open for controlled case
      if (
        controlledIsDetailOpen !== undefined &&
        isDetailOpen &&
        !previousIsDetailOpenRef.current &&
        navState === "expanded"
      ) {
        // Defer to avoid synchronous setState in effect
        requestAnimationFrame(() => {
          handleNavStateChange("collapsed");
        });
      }
      previousIsDetailOpenRef.current = isDetailOpen;
    }, [isDetailOpen, controlledIsDetailOpen, navState, handleNavStateChange]);

    // Expose control methods via ref
    useImperativeHandle(
      ref,
      () => ({
        setNavState: handleNavStateChange,
        toggleDetail: () => {
          handleDetailOpenChange(!isDetailOpen);
        },
        openDetail: () => {
          handleDetailOpenChange(true);
        },
        closeDetail: () => {
          handleDetailOpenChange(false);
        },
        setDetailWidth: (width: number) => {
          const constrainedWidth = Math.min(
            Math.max(width, 200),
            detailMaxWidth,
          );
          if (controlledDetailWidth === undefined) {
            setInternalDetailWidth(constrainedWidth);
          }
          onDetailWidthChange?.(constrainedWidth);
        },
      }),
      [
        isDetailOpen,
        controlledIsDetailOpen,
        controlledDetailWidth,
        detailMaxWidth,
        handleNavStateChange,
        handleDetailOpenChange,
        onDetailWidthChange,
      ],
    );

    // Handle floating nav on hover - show on mouse enter, hide on mouse leave
    const handleNavMouseEnter = useCallback(() => {
      // Clear any pending timeout
      if (navFloatingTimeout) {
        clearTimeout(navFloatingTimeout);
        setNavFloatingTimeout(null);
      }

      // If nav is collapsed, temporarily show as floating on hover
      if (navState === "collapsed") {
        setPreviousNavState(navState);
        setIsHovering(true);
      } else if (navState === "floating") {
        // If already floating, keep it visible
        setIsHovering(true);
      }
    }, [navState, navFloatingTimeout]);

    const handleNavMouseLeave = useCallback(() => {
      // If hovering over collapsed nav (showing as floating), return to collapsed
      if (isHovering && navState === "collapsed") {
        const timeout = setTimeout(() => {
          setIsHovering(false);
        }, 300); // Small delay before hiding
        setNavFloatingTimeout(timeout);
      } else {
        setIsHovering(false);
      }
    }, [navState, isHovering]);

    // Cleanup timeout on unmount
    useEffect(() => {
      return () => {
        if (navFloatingTimeout) {
          clearTimeout(navFloatingTimeout);
        }
      };
    }, [navFloatingTimeout]);

    // Handle divider mouse move for gradient effect
    const handleDividerMouseMove = useCallback((e: React.MouseEvent) => {
      if (dividerRef.current) {
        const rect = dividerRef.current.getBoundingClientRect();
        const y = e.clientY - rect.top;
        setDividerMouseY(y);
      }
    }, []);

    const handleDividerMouseLeave = useCallback(() => {
      // Don't hide gradient if we're resizing
      if (!isResizing) {
        setDividerMouseY(null);
      }
    }, [isResizing]);

    // Resize handler for divider
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);
    }, []);

    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        if (!isResizing || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const newWidth = containerRect.right - e.clientX;

        // Constrain to max width
        const constrainedWidth = Math.min(newWidth, detailMaxWidth);
        // Minimum width constraint (optional, can be adjusted)
        const finalWidth = Math.max(constrainedWidth, 200);

        if (controlledDetailWidth === undefined) {
          setInternalDetailWidth(finalWidth);
          detailWidthRef.current = finalWidth; // Persist width in ref
        }
        onDetailWidthChange?.(finalWidth);

        // Update gradient position during resize
        if (dividerRef.current) {
          const rect = dividerRef.current.getBoundingClientRect();
          const y = e.clientY - rect.top;
          setDividerMouseY(y);
        }
      },
      [isResizing, detailMaxWidth, controlledDetailWidth, onDetailWidthChange],
    );

    const handleMouseUp = useCallback(() => {
      setIsResizing(false);
      setDividerMouseY(null);
    }, []);

    useEffect(() => {
      if (isResizing) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };
      }
    }, [isResizing, handleMouseMove, handleMouseUp]);

    // Calculate nav width based on actual state (not effective/floating state for layout)
    const getNavWidth = () => {
      // Use actual navState for layout calculations, not effectiveNavState
      // Floating state is visual only and shouldn't affect layout
      if (navState === "floating") {
        return 0; // Floating nav doesn't take up layout space
      }
      return navState === "expanded" ? navExpandedWidth : navCollapsedWidth;
    };

    // Calculate main content width
    const getMainContentWidth = () => {
      let width = "100%";
      // Use actual navState for layout, not effectiveNavState
      // This ensures floating state doesn't affect layout
      if (navState === "expanded" || navState === "collapsed") {
        width = `calc(100% - ${getNavWidth()}px)`;
      }
      if (isDetailOpen) {
        // Account for divider (4px) and detail panel width
        width = `calc(${width} - ${detailWidth + 4}px)`;
      }
      return width;
    };

    // Get nav style classes and inline styles
    const getNavClassName = () => {
      const baseClass = styles.nav;
      // Only use absolute positioning when explicitly set to floating (not when hovering)
      // When hovering over collapsed nav, keep it in normal flow to prevent layout shift
      if (navState === "floating" && !isHovering) {
        return `${baseClass} ${styles.navFloating}`;
      }
      return `${baseClass} ${styles.navRelative}`;
    };

    const getNavInlineStyle = (): React.CSSProperties => {
      // When hovering over collapsed nav, keep collapsed width in layout
      // but the inner content will expand beyond it
      if (effectiveNavState === "floating" && navState === "collapsed") {
        return { width: navCollapsedWidth };
      }
      // When explicitly floating, no width in layout
      if (navState === "floating") {
        return { width: 0 };
      }
      // Normal states: use calculated width
      return { width: getNavWidth() };
    };

    // Get the inner nav content style - expands when floating
    const getNavContentStyle = (): React.CSSProperties => {
      if (effectiveNavState === "floating") {
        return {
          width: navExpandedWidth,
          position: navState === "collapsed" ? "absolute" : "relative",
          left: navState === "collapsed" ? 0 : undefined,
          top: navState === "collapsed" ? 0 : undefined,
          zIndex: navState === "collapsed" ? 10 : undefined,
        };
      }
      return { width: "100%" };
    };

    return (
      <div ref={containerRef} className={styles.container}>
        {/* Nav Section */}
        <div
          ref={navRef}
          onMouseEnter={handleNavMouseEnter}
          onMouseLeave={handleNavMouseLeave}
          className={getNavClassName()}
          style={getNavInlineStyle()}
        >
          {/* Single nav content element that changes size and position */}
          <div
            className={styles.navContent}
            style={{ ...getNavContentStyle(), height: "100%" }}
          >
            {React.isValidElement(navContent)
              ? React.cloneElement(navContent, {
                  isFloating:
                    effectiveNavState === "floating" &&
                    navState === "collapsed",
                } as { isFloating: boolean })
              : navContent}
          </div>
        </div>

        {/* Main Page Section */}
        <div
          className={`${styles.mainContent} ${isResizing ? styles.mainContentResizing : ""}`}
          style={{ width: getMainContentWidth() }}
        >
          {children}
        </div>

        {/* Detail Panel Section */}
        {isDetailOpen && (
          <>
            {/* Resizable Divider */}
            <div
              ref={dividerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleDividerMouseMove}
              onMouseLeave={handleDividerMouseLeave}
              className={styles.divider}
            >
              <div className={styles.dividerLine} />
              <div
                className={`${styles.dividerGradient} ${dividerMouseY !== null || isResizing ? styles.dividerGradientVisible : ""}`}
                style={{ top: dividerMouseY !== null ? `${dividerMouseY}px` : undefined }}
              />
            </div>

            {/* Detail Panel */}
            <div
              className={`${styles.detailPanel} ${isResizing ? styles.detailPanelResizing : ""}`}
              style={{ width: detailWidth }}
            >
              {detailContent}
            </div>
          </>
        )}
      </div>
    );
  },
);

PageLayout.displayName = "PageLayout";

export default PageLayout;
