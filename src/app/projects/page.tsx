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

export default function ProjectsPage() {
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
            <h2>Projects Details</h2>
            <p>Projects detail content goes here</p>
          </div>
        }
      >
        <PageHeader
          title="Projects"
          description="Manage your projects and tasks"
        />
        <div className={styles.mainPlaceholder}>
          <p>This is the projects page</p>
        </div>
      </PageLayout>
    </div>
  );
}
