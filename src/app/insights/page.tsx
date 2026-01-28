"use client";

import { useState, useRef } from "react";
import {
  PageLayout,
  Nav,
  type PageLayoutRef,
  PageHeader,
  Box,
  BarChart,
  HorizontalBarChart,
  LineChart,
  RadialChart,
  DonutChart,
} from "@/components";
import {
  barChartDummyData,
  stackedBarChartDummyData,
  stackedBarChartSeriesLabels,
  horizontalBarChartDummyData,
  horizontalBarChartSeriesLabels,
  lineChartDummyDataSingle,
  lineChartDummyDataMultiple,
  lineChartXLabels,
  radialChartDummyDataSingle,
  radialChartDummyDataMultiple,
  donutChartDummyData,
} from "@/data";
import { useNavState } from "@/contexts/NavContext";
import layoutStyles from "../page.module.css";
import styles from "./page.module.css";

export default function InsightsPage() {
  const { navState, setNavState } = useNavState();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const layoutRef = useRef<PageLayoutRef>(null);

  return (
    <div className={layoutStyles.pageContainer}>
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
          <div className={layoutStyles.detailPlaceholder}>
            <h2>Insights Details</h2>
            <p>Insights detail content goes here</p>
          </div>
        }
      >
        <PageHeader
          title="Insights"
          description="Analyze your spending and income patterns"
        />
        <div className={styles.chartsRow}>
          <Box className={styles.chartBox}>
            <BarChart
              data={barChartDummyData}
              title="Monthly overview"
              showLegend={false}
            />
          </Box>
          <Box className={styles.chartBox}>
            <BarChart
              data={stackedBarChartDummyData}
              seriesLabels={stackedBarChartSeriesLabels}
              title="Stacked by category"
              showLegend={true}
            />
          </Box>
        </div>
        <Box className={styles.fullWidthBox}>
          <HorizontalBarChart
            data={horizontalBarChartDummyData}
            seriesLabels={horizontalBarChartSeriesLabels}
            title="Horizontal by category"
            showLegend={true}
          />
        </Box>
        <div className={styles.chartsRow}>
          <Box className={styles.chartBox}>
            <LineChart
              data={lineChartDummyDataSingle}
              xLabels={lineChartXLabels}
              title="Single line (area gradient)"
              showLegend={true}
              smooth
            />
          </Box>
          <Box className={styles.chartBox}>
            <LineChart
              data={lineChartDummyDataMultiple}
              xLabels={lineChartXLabels}
              title="Multiple lines"
              showLegend={true}
            />
          </Box>
        </div>
        <div className={styles.chartsRow}>
          <Box className={styles.chartBox}>
            <RadialChart
              variant="single"
              data={radialChartDummyDataSingle}
              title="Radial – single (progress ring)"
              size={200}
            />
          </Box>
          <Box className={styles.chartBox}>
            <RadialChart
              variant="multiple"
              data={radialChartDummyDataMultiple}
              title="Radial – multiple (concentric rings)"
              showLegend={true}
              size={200}
            />
          </Box>
        </div>
        <div className={styles.chartsRow}>
          <Box className={styles.chartBox}>
            <DonutChart
              data={donutChartDummyData}
              title="Donut – with center text"
              centerValue="100"
              centerLabel="Total"
              showLegend={true}
              size={200}
            />
          </Box>
          <Box className={styles.chartBox}>
            <DonutChart
              data={donutChartDummyData}
              title="Donut – no center text"
              showLegend={true}
              size={200}
            />
          </Box>
        </div>
      </PageLayout>
    </div>
  );
}
