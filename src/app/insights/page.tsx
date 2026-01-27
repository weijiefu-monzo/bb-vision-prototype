"use client";

import { useState, useRef } from "react";
import {
  PageLayout,
  Nav,
  Button,
  type PageLayoutRef,
  PageHeader,
} from "@/components";
import { useNavState } from "@/contexts/NavContext";
import styles from "../page.module.css";

export default function InsightsPage() {
  const { navState, setNavState } = useNavState();
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
            <h2>Insights Details</h2>
            <p>Insights detail content goes here</p>
          </div>
        }
      >
        <PageHeader
          title="Insights"
          description="Analyze your spending and income patterns"
        />
        <div className={styles.mainPlaceholder}>
          <p>This is the insights page</p>
        </div>
      </PageLayout>
    </div>
  );
}
