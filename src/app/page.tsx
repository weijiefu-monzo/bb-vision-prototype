"use client";

import { useState, useRef } from "react";
import {
  PageLayout,
  Nav,
  Button,
  type PageLayoutRef,
  type NavState,
  PageHeader,
} from "@/components";
import styles from "./page.module.css";

export default function Home() {
  const [navState, setNavState] = useState<NavState>("expanded");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const layoutRef = useRef<PageLayoutRef>(null);

  return (
    <div className={styles.pageContainer}>
      <PageLayout
        ref={layoutRef}
        navState={navState}
        isDetailOpen={isDetailOpen}
        onNavStateChange={setNavState}
        onDetailOpenChange={setIsDetailOpen}
        navContent={
          <Nav
            expanded={navState === "expanded"}
            onNavStateToggle={() => {
              setNavState(navState === "expanded" ? "collapsed" : "expanded");
            }}
          />
        }
        detailContent={
          <div className={styles.detailPlaceholder}>
            <h2>Detail Panel</h2>
            <p>Detail content goes here</p>
          </div>
        }
      >
        <PageHeader title="Hello David!" />
        <div className={styles.mainPlaceholder}>
          <h1>Main Page</h1>
          <p>This is the main content area</p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="primary"
              onClick={() => setIsDetailOpen(!isDetailOpen)}
            >
              {isDetailOpen ? "Close" : "Open"} Detail Panel
            </Button>
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
