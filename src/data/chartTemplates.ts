export interface ChartTemplate {
  id: string;
  title: string;
  description: string;
  chartType: string;
}

export interface ChartTemplateSection {
  id: string;
  title: string;
  templates: ChartTemplate[];
}

export const chartTemplateSections: ChartTemplateSection[] = [
  {
    id: "cash-liquidity",
    title: "Cash & liquidity",
    templates: [
      {
        id: "cash-balance-over-time",
        title: "Cash balance over time",
        description:
          "Shows how total cash has changed, helping assess short-term financial stability.",
        chartType: "Line",
      },
      {
        id: "cash-inflows-vs-outflows",
        title: "Cash inflows vs outflows",
        description:
          "Compares money coming in and going out to reveal burn patterns.",
        chartType: "Line (dual)",
      },
      {
        id: "cash-runway-projection",
        title: "Cash runway projection",
        description:
          "Estimates how long cash will last at the current burn rate.",
        chartType: "Line / Area",
      },
      {
        id: "end-of-month-cash-snapshot",
        title: "End-of-month cash snapshot",
        description: "Compares cash position across recent months at a glance.",
        chartType: "Bar",
      },
    ],
  },
  {
    id: "revenue-income",
    title: "Revenue & income",
    templates: [
      {
        id: "revenue-trend-by-month",
        title: "Revenue trend by month",
        description: "Tracks overall revenue growth or decline over time.",
        chartType: "Line",
      },
      {
        id: "revenue-breakdown-by-source",
        title: "Revenue breakdown by source",
        description:
          "Shows which income streams contribute most to total revenue.",
        chartType: "Stacked bar",
      },
      {
        id: "recurring-vs-one-off-income",
        title: "Recurring vs one-off income",
        description: "Highlights revenue stability and predictability.",
        chartType: "Bar",
      },
      {
        id: "top-customers-by-revenue",
        title: "Top customers by revenue",
        description: "Identifies customer concentration risk.",
        chartType: "Bar",
      },
    ],
  },
  {
    id: "costs-expenses",
    title: "Costs & expenses",
    templates: [
      {
        id: "expense-trend-over-time",
        title: "Expense trend over time",
        description: "Shows how total spending evolves month by month.",
        chartType: "Line",
      },
      {
        id: "expense-breakdown-by-category",
        title: "Expense breakdown by category",
        description: "Reveals where money is being spent.",
        chartType: "Pie / Donut",
      },
      {
        id: "fixed-vs-variable-costs",
        title: "Fixed vs variable costs",
        description:
          "Helps understand cost flexibility and risk during downturns.",
        chartType: "Stacked bar",
      },
      {
        id: "payroll-cost-over-time",
        title: "Payroll cost over time",
        description: "Tracks the largest cost driver as the business scales.",
        chartType: "Line",
      },
    ],
  },
  {
    id: "profitability-efficiency",
    title: "Profitability & efficiency",
    templates: [
      {
        id: "net-profit-loss-by-month",
        title: "Net profit / loss by month",
        description:
          "Shows whether the business is operating at a surplus or deficit.",
        chartType: "Bar",
      },
      {
        id: "gross-margin-trend",
        title: "Gross margin trend",
        description: "Indicates how efficiently the business delivers value.",
        chartType: "Line",
      },
      {
        id: "cost-to-revenue-ratio",
        title: "Cost-to-revenue ratio",
        description: "Measures operational efficiency at a glance.",
        chartType: "Line",
      },
    ],
  },
  {
    id: "risk-obligations",
    title: "Risk & obligations",
    templates: [
      {
        id: "outstanding-invoices-by-status",
        title: "Outstanding invoices by status",
        description: "Shows unpaid, overdue, and paid invoices.",
        chartType: "Bar",
      },
      {
        id: "accounts-receivable-ageing",
        title: "Accounts receivable ageing",
        description: "Highlights how long invoices have been outstanding.",
        chartType: "Bar",
      },
      {
        id: "upcoming-payments-timeline",
        title: "Upcoming payments timeline",
        description: "Surfaces near-term cash commitments.",
        chartType: "Bar / Timeline",
      },
    ],
  },
  {
    id: "planning-forecasting",
    title: "Planning & forecasting",
    templates: [
      {
        id: "actual-vs-budget-comparison",
        title: "Actual vs budget comparison",
        description:
          "Shows where spending or revenue is ahead or behind plan.",
        chartType: "Bar",
      },
      {
        id: "scenario-comparison",
        title: "Scenario comparison (base vs conservative)",
        description:
          "Compares outcomes under different assumptions.",
        chartType: "Line (multiple series)",
      },
    ],
  },
];
