export interface BarChartDataItem {
  label: string;
  /** Single value for a simple bar */
  value?: number;
  /** Multiple values for a stacked bar (one segment per value) */
  values?: number[];
  color?: string;
}

export const barChartDummyData: BarChartDataItem[] = [
  { label: "Jan", value: 42 },
  { label: "Feb", value: 65 },
  { label: "Mar", value: 58 },
  { label: "Apr", value: 81 },
  { label: "May", value: 56 },
  { label: "Jun", value: 90 },
  { label: "Jul", value: 72 },
  { label: "Aug", value: 88 },
  { label: "Sep", value: 61 },
  { label: "Oct", value: 95 },
  { label: "Nov", value: 78 },
  { label: "Dec", value: 84 },
];

/** Stacked bar chart dummy data: label + values per series (e.g. [Income, Expenses, Savings]) */
export const stackedBarChartDummyData: BarChartDataItem[] = [
  { label: "Jan", values: [120, 80, 40] },
  { label: "Feb", values: [95, 70, 25] },
  { label: "Mar", values: [110, 65, 45] },
  { label: "Apr", values: [130, 90, 40] },
  { label: "May", values: [100, 75, 25] },
  { label: "Jun", values: [140, 85, 55] },
];

/** Series labels for stacked bar chart (order matches values[] indices) */
export const stackedBarChartSeriesLabels = ["Income", "Expenses", "Savings"];

/** Horizontal bar chart dummy data: first row is used for the single bar (more values = more segments) */
export const horizontalBarChartDummyData: BarChartDataItem[] = [
  {
    label: "Category A",
    values: [25, 18, 22, 15, 12, 8, 10, 6],
  },
];

/** Series labels for horizontal bar chart legend (order matches values[] indices) */
export const horizontalBarChartSeriesLabels = [
  "Segment 1",
  "Segment 2",
  "Segment 3",
  "Segment 4",
  "Segment 5",
  "Segment 6",
  "Segment 7",
  "Segment 8",
];
