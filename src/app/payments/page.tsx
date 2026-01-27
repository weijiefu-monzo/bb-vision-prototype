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

export default function PaymentsPage() {
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
            <h2>Payments Details</h2>
            <p>Payments detail content goes here</p>
          </div>
        }
      >
        <PageHeader
          title="Payments"
          description="View and manage your payment history"
        />
        <div className={styles.mainPlaceholder}>
          <p>This is the payments page</p>
        </div>
      </PageLayout>
    </div>
  );
}
