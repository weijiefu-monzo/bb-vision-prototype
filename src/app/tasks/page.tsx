"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  PageLayout,
  Nav,
  type PageLayoutRef,
  PageHeader,
} from "@/components";
import { useNavState } from "@/contexts/NavContext";
import styles from "../page.module.css";

export default function TasksPage() {
  const router = useRouter();
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
            <h2>Tasks Details</h2>
            <p>Tasks detail content goes here</p>
          </div>
        }
      >
        <PageHeader
          title="Tasks"
          description="View your current tasks and priorities"
          onBack={() => router.push("/")}
        />
        <div className={styles.mainPlaceholder}>
          <p>This is the tasks page</p>
        </div>
      </PageLayout>
    </div>
  );
}
