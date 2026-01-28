import type { LineChartSeries } from "@/components";

/** Single line dummy data (area under line will show with gradient) */
export const lineChartDummyDataSingle: LineChartSeries[] = [
  {
    label: "Series A",
    values: [22, 45, 38, 62, 55, 78, 70, 85],
  },
];

/** Multiple lines dummy data */
export const lineChartDummyDataMultiple: LineChartSeries[] = [
  { label: "Series A", values: [22, 45, 38, 62, 55, 78, 70, 85] },
  { label: "Series B", values: [35, 30, 48, 55, 42, 65, 58, 72] },
  { label: "Series C", values: [50, 55, 52, 48, 60, 58, 65, 70] },
];

/** X-axis labels for line chart (e.g. months) */
export const lineChartXLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
