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
  DetailHeader,
  Button,
} from "@/components";
import { workflowDummyData } from "@/data";
import { useNavState } from "@/contexts/NavContext";
import TeamMembersTable, {
  type TeamMember,
} from "./components/TeamMembersTable";
import WorkflowsTable, { type Workflow } from "./components/WorkflowsTable";
import styles from "./page.module.css";

export default function TeamPage() {
  const { navState, setNavState } = useNavState();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isWorkflowBuilderOpen, setIsWorkflowBuilderOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(
    null,
  );
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
          selectedMember ? (
            <DetailHeader
              title={selectedMember.name}
              description={
                <>
                  <p>
                    {selectedMember.role} · {selectedMember.status}
                  </p>
                  <p style={{ marginTop: 8 }}>
                    Monthly spend: {selectedMember.monthlySpend} · Spend limit:
                    £{selectedMember.limit.toLocaleString()}
                  </p>
                </>
              }
              onBack={() => {
                setIsDetailOpen(false);
                setSelectedMember(null);
              }}
            />
          ) : selectedWorkflow ? (
            <DetailHeader
              title={selectedWorkflow.name}
              description={
                <>
                  <p>Created by {selectedWorkflow.createdBy}</p>
                  <p style={{ marginTop: 8 }}>
                    Last updated: {selectedWorkflow.lastUpdatedAt} · Last run:{" "}
                    {selectedWorkflow.lastRunAt}
                  </p>
                  <p style={{ marginTop: 8 }}>
                    Status: {selectedWorkflow.status}
                  </p>
                </>
              }
              onBack={() => {
                setIsDetailOpen(false);
                setSelectedWorkflow(null);
              }}
            />
          ) : (
            <></>
          )
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
              description="Configure roles, permissions and defaults"
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

        <PageSection
          title="Team members"
          icon="human_person"
          trailing={
            <Button variant="secondary" size="medium">
              View all members
            </Button>
          }
        >
          <TeamMembersTable
            onRowClick={(member) => {
              setSelectedWorkflow(null);
              setSelectedMember(member);
              setIsDetailOpen(true);
            }}
          />
        </PageSection>

        <PageSection
          title="Workflows"
          icon="object_puzzle"
          trailing={
            <Button variant="secondary" size="medium">
              Activity Log
            </Button>
          }
        >
          <WorkflowsTable
            onRowClick={(workflow) => {
              setSelectedMember(null);
              setSelectedWorkflow(workflow);
              setIsDetailOpen(true);
            }}
          />
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
