"use client";

import React from "react";
import { Panel, useViewport, useReactFlow } from "@xyflow/react";
import { IconButton } from "@/components";
import styles from "./ZoomControls.module.css";

export default function ZoomControls() {
  const { zoom } = useViewport();
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const zoomPercent = Math.round(zoom * 100);

  return (
    <Panel position="bottom-right" className={styles.panel}>
      <div className={styles.controls}>
        <span className={styles.zoomLevel} aria-live="polite">
          {zoomPercent}%
        </span>
        <IconButton
          variant="tertiary"
          size="medium"
          icon="action_minus"
          aria-label="Zoom out"
          onClick={() => zoomOut()}
          className={styles.button}
        />
        <IconButton
          variant="tertiary"
          size="medium"
          icon="action_plus"
          aria-label="Zoom in"
          onClick={() => zoomIn()}
          className={styles.button}
        />
        <IconButton
          variant="tertiary"
          size="medium"
          icon="navigation_expand"
          aria-label="Center content (max 100% zoom)"
          onClick={() => fitView({ maxZoom: 1 })}
          className={styles.button}
        />
      </div>
    </Panel>
  );
}
