"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  PageLayout,
  Nav,
  Button,
  type PageLayoutRef,
  PageHeader,
  PageSection,
  DetailHeader,
  Box,
  WorkflowBuilder,
} from "@/components";
import { workflowDummyData } from "@/data";
import { useNavState } from "@/contexts/NavContext";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
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
          <DetailHeader
            title="Details"
            description="This shows a detail of something on the side"
            onBack={() => setIsDetailOpen(false)}
          />
        }
      >
        <PageHeader
          title="Hello David!"
          description="Welcome to your dashboard"
        />

        <PageSection
          title="Something"
          description="Hey yo this is the first section, very important"
          icon="general_chart_bar_line"
          trailing={
            <>
              <Button
                variant="secondary"
                size="medium"
                onClick={() => setIsWorkflowBuilderOpen(true)}
              >
                Open workflow builder
              </Button>
              <Button
                variant="secondary"
                size="medium"
                onClick={() => setIsDetailOpen(true)}
              >
                View all
              </Button>
            </>
          }
        >
          <Box>
            <p>Section content goes here</p>
          </Box>
        </PageSection>
        <PageSection
          title="Your Todo List"
          description="View your current tasks and priorities"
          icon="general_task"
          trailing={
            <Button
              variant="secondary"
              size="medium"
              onClick={() => router.push("/tasks")}
            >
              View all tasks
            </Button>
          }
        >
          <Box>
            <p>Section content goes here</p>
          </Box>
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
