import type {
  RadialChartSingleEntry,
  RadialChartMultipleEntry,
} from "@/components";

/** Single radial (progress ring) dummy data */
export const radialChartDummyDataSingle: RadialChartSingleEntry = {
  value: 1260,
  total: 2000,
  centerLabel: "1,260",
  unit: "Visitors",
};

/** Multiple concentric rings dummy data (proportions 0–1) */
export const radialChartDummyDataMultiple: RadialChartMultipleEntry[] = [
  { label: "Chrome", value: 0.62 },
  { label: "Safari", value: 0.22 },
  { label: "Firefox", value: 0.08 },
  { label: "Edge", value: 0.05 },
  { label: "Other", value: 0.03 },
];
