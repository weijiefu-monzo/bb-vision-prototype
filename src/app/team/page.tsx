"use client";

import { useState, useRef } from "react";
import {
  PageLayout,
  Nav,
  type PageLayoutRef,
  PageHeader,
  ActionCard,
  PageSection,
  WorkflowBuilder,
} from "@/components";
import { workflowDummyData } from "@/data";
import { useNavState } from "@/contexts/NavContext";
import styles from "./page.module.css";

export default function TeamPage() {
  const { navState, setNavState } = useNavState();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isWorkflowBuilderOpen, setIsWorkflowBuilderOpen] = useState(false);
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
              title="Manage teams"
              description="Configure teams, permissions and defaults"
              onClick={() => {}}
            />
            <ActionCard
              icon="money_card"
              title="Issue expense card"
              description="Create and assign expense cards to your team"
              onClick={() => {}}
            />
            <ActionCard
              icon="general_flex"
              title="Add new workflow"
              description="Create a new workflow for your team"
              onClick={() => setIsWorkflowBuilderOpen(true)}
            />
          </div>
        </PageSection>
      </PageLayout>

      <WorkflowBuilder
        open={isWorkflowBuilderOpen}
        onClose={() => setIsWorkflowBuilderOpen(false)}
        workflow={workflowDummyData}
      />
    </div>
  );
}
