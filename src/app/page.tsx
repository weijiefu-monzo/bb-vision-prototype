"use client";

import { useState, useRef, useCallback } from "react";
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
  WidgetCanvas,
  type WidgetItem,
} from "@/components";
import { workflowDummyData } from "@/data";
import { useNavState } from "@/contexts/NavContext";
import styles from "./page.module.css";

const HOME_WIDGETS: WidgetItem[] = [
  {
    id: "1",
    span: 2,
    children: <p style={{ margin: 0 }}>Widget 1 — short.</p>,
  },
  {
    id: "2",
    children: (
      <>
        <p style={{ margin: 0 }}>Widget 2</p>
        <p style={{ margin: "8px 0 0" }}>Extra line.</p>
        <p style={{ margin: "4px 0 0" }}>Another line so this one is taller.</p>
      </>
    ),
  },
  {
    id: "3",
    children: (
      <p style={{ margin: 0 }}>
        Widget 3 — medium height with two lines of content here.
      </p>
    ),
  },
  {
    id: "4",
    span: 2,
    children: (
      <>
        <p style={{ margin: 0 }}>Widget 4 — full width</p>
        <p style={{ margin: "8px 0 0" }}>Second line.</p>
      </>
    ),
  },
  {
    id: "5",
    children: (
      <>
        <p style={{ margin: 0 }}>Widget 5</p>
        <p style={{ margin: "8px 0 0" }}>Two lines.</p>
      </>
    ),
  },
  {
    id: "6",
    children: <p style={{ margin: 0 }}>Widget 6 — single line.</p>,
  },
];

export default function Home() {
  const router = useRouter();
  const { navState, setNavState } = useNavState();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isWorkflowBuilderOpen, setIsWorkflowBuilderOpen] = useState(false);
  const [homeWidgets, setHomeWidgets] = useState<WidgetItem[]>(HOME_WIDGETS);
  const [isCustomizable, setIsCustomizable] = useState(false);
  const layoutRef = useRef<PageLayoutRef>(null);

  const handleWidgetReorder = useCallback((widgetIds: string[]) => {
    setHomeWidgets((prev) =>
      widgetIds
        .map((id) => prev.find((w) => w.id === id))
        .filter((w): w is WidgetItem => w != null),
    );
  }, []);

  const handleWidgetSpanChange = useCallback(
    (widgetId: string, newSpan: 1 | 2) => {
      setHomeWidgets((prev) =>
        prev.map((w) => (w.id === widgetId ? { ...w, span: newSpan } : w)),
      );
    },
    [],
  );

  const handleWidgetRemove = useCallback((widgetId: string) => {
    setHomeWidgets((prev) => prev.filter((w) => w.id !== widgetId));
  }, []);

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
          trailing={
            <Button
              variant={!isCustomizable ? "secondary" : "primary"}
              size="medium"
              onClick={() => setIsCustomizable((prev) => !prev)}
            >
              {isCustomizable ? "Done customizing" : "Customize home page"}
            </Button>
          }
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

        <WidgetCanvas
          widgets={homeWidgets}
          onReorder={handleWidgetReorder}
          onWidgetSpanChange={handleWidgetSpanChange}
          onWidgetRemove={handleWidgetRemove}
          customizable={isCustomizable}
        />
      </PageLayout>

      <WorkflowBuilder
        open={isWorkflowBuilderOpen}
        onClose={() => setIsWorkflowBuilderOpen(false)}
        workflow={workflowDummyData}
      />
    </div>
  );
}
