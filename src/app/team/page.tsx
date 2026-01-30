"use client";

import { useState, useRef } from "react";
import {
  PageLayout,
  Nav,
  type PageLayoutRef,
  PageHeader,
  ActionCard,
  PageSection,
} from "@/components";
import { useNavState } from "@/contexts/NavContext";
import styles from "../page.module.css";

export default function TeamPage() {
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
        <PageHeader title="Team" description="Manage your team and workflows" />

        <PageSection>
          <div className={styles.actionCardsRow}>
            <ActionCard
              icon="human_person_circles"
              title="Invite members"
              description="Add people to your team and manage roles"
              onClick={() => {}}
            />
            <ActionCard
              icon="general_settings"
              title="Team settings"
              description="Configure permissions and defaults"
              onClick={() => {}}
            />
            <ActionCard
              icon="general_folder"
              title="Shared spaces"
              description="View and manage shared workspaces"
              onClick={() => {}}
            />
            <ActionCard
              icon="object_clock"
              title="Activity"
              description="See recent team activity and history"
              onClick={() => {}}
            />
          </div>
        </PageSection>
      </PageLayout>
    </div>
  );
}
