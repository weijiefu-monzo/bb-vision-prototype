/** Node type id used in the canvas (matches nodeTypes keys). */
export type WorkflowNodeTypeId =
  | "initialNode"
  | "transformNode"
  | "joinNode"
  | "branchNode"
  | "outputNode";

export interface WorkflowNodePaletteItem {
  /** Unique id for React keys and drag payload (optional; fallback to type + label). */
  id?: string;
  type: WorkflowNodeTypeId;
  label: string;
  icon: string;
}

export interface WorkflowNodePaletteSection {
  id: string;
  label: string;
  items: WorkflowNodePaletteItem[];
}

/** Node palette grouped by section; drag onto canvas to add. */
export const WORKFLOW_NODE_PALETTE_SECTIONS: WorkflowNodePaletteSection[] = [
  {
    id: "logic",
    label: "Logic nodes",
    items: [
      {
        id: "initial",
        type: "initialNode",
        label: "Initial",
        icon: "general_lightning",
      },
      {
        id: "transform",
        type: "transformNode",
        label: "Transform",
        icon: "general_chart_line",
      },
      { id: "join", type: "joinNode", label: "Join", icon: "general_link" },
      {
        id: "branch",
        type: "branchNode",
        label: "Branch",
        icon: "navigation_arrow_up_arrow_down",
      },
      {
        id: "output",
        type: "outputNode",
        label: "Output",
        icon: "general_info_circle",
      },
    ],
  },
  {
    id: "action",
    label: "Action nodes",
    items: [
      {
        id: "approval",
        type: "outputNode",
        label: "Approval",
        icon: "general_checkmark",
      },
      {
        id: "notification",
        type: "outputNode",
        label: "Notification",
        icon: "general_notification",
      },
      {
        id: "custom-function",
        type: "outputNode",
        label: "Custom Function",
        icon: "general_flex",
      },
      { id: "task", type: "outputNode", label: "Task", icon: "general_list" },
      { id: "timer", type: "outputNode", label: "Timer", icon: "object_clock" },
    ],
  },
  {
    id: "integration",
    label: "Integration",
    items: [
      {
        id: "sage",
        type: "initialNode",
        label: "Sage",
        icon: "brand-sage",
      },
      {
        id: "deel",
        type: "initialNode",
        label: "Deel",
        icon: "brand-deel",
      },
      {
        id: "xero",
        type: "initialNode",
        label: "Xero",
        icon: "brand-xero",
      },
      {
        id: "quickbooks",
        type: "initialNode",
        label: "Quickbooks",
        icon: "brand-quickbooks",
      },
    ],
  },
];

/** Flat list of all palette items (for canvas drop lookup / backward compat). */
export const WORKFLOW_NODE_PALETTE: WorkflowNodePaletteItem[] =
  WORKFLOW_NODE_PALETTE_SECTIONS.flatMap((s) => s.items);

/** Data transfer key for full node payload (type, label, icon) when dragging from palette. */
export const WORKFLOW_NODE_DATA_TRANSFER = "application/x-workflow-node-data";

/** @deprecated Use WORKFLOW_NODE_DATA_TRANSFER with JSON payload for multiple items per type. */
export const WORKFLOW_NODE_TYPE_DATA_TRANSFER =
  "application/x-workflow-node-type";
