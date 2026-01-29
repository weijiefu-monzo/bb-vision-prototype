/** Single data point for chart builder (label + value(s) + optional color). */
export interface ChartDataItem {
  label: string;
  value?: number;
  values?: number[];
  color?: string;
}

/** Chart builder dummy data: header metadata + chart series. */
export const chartDummyData = {
  title: "Chart Builder",
  itemLabel: "Untitled chart",
  itemCaption: "last updated 12:03 on March 1 2026",
  data: [
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
  ] as ChartDataItem[],
};
