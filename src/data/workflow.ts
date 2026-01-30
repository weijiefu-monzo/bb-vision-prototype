import type { Node, Edge } from "@xyflow/react";

/** Dummy node data shape for workflow canvas (label + optional icon). */
export interface WorkflowDummyNodeData extends Record<string, unknown> {
  label: string;
  icon?: string;
}

/** Horizontal gap between nodes (nodes have max-width 300px). */
const NODE_GAP = 24;
const NODE_MAX_WIDTH = 300;
const NODE_STEP_X = NODE_MAX_WIDTH + NODE_GAP;
/** Vertical step so nodes (~72px tall) don't overlap. */
const NODE_STEP_Y = 100;

/** Dummy nodes for the workflow editor canvas. Positions avoid overlap (300px max width, 24px gap). */
const dummyNodes: Node<WorkflowDummyNodeData, string>[] = [
  {
    id: "initial-1",
    type: "initialNode",
    position: { x: 0, y: 0 },
    data: { label: "Load data", icon: "navigation_arrow_up" },
  },
  {
    id: "initial-2",
    type: "initialNode",
    position: { x: 0 + NODE_STEP_X, y: 0 },
    data: { label: "Start workflow", icon: "object_clock" },
  },
  {
    id: "initial-3",
    type: "initialNode",
    position: { x: 0 + NODE_STEP_X * 2, y: 0 },
    data: { label: "Trigger event", icon: "general_lightning" },
  },
  {
    id: "transform-1",
    type: "transformNode",
    position: { x: 0, y: NODE_STEP_Y },
    data: { label: "Filter rows", icon: "general_chart_line" },
  },
  {
    id: "transform-2",
    type: "transformNode",
    position: { x: 0 + NODE_STEP_X, y: NODE_STEP_Y },
    data: { label: "Map fields", icon: "general_layout" },
  },
  {
    id: "transform-3",
    type: "transformNode",
    position: { x: 0 + NODE_STEP_X * 2, y: NODE_STEP_Y },
    data: { label: "Validate", icon: "general_exclamationmark_circle" },
  },
  {
    id: "join-1",
    type: "joinNode",
    position: { x: 0, y: NODE_STEP_Y * 2 },
    data: { label: "Merge streams", icon: "general_link" },
  },
  {
    id: "join-2",
    type: "joinNode",
    position: { x: 0 + NODE_STEP_X, y: NODE_STEP_Y * 2 },
    data: { label: "Combine datasets", icon: "object_document" },
  },
  {
    id: "branch-1",
    type: "branchNode",
    position: { x: 0, y: NODE_STEP_Y * 3 },
    data: { label: "Split by condition", icon: "navigation_arrow_up_arrow_down" },
  },
  {
    id: "branch-2",
    type: "branchNode",
    position: { x: 0 + NODE_STEP_X, y: NODE_STEP_Y * 3 },
    data: { label: "Route branches", icon: "navigation_arrow_left_arrow_right" },
  },
  {
    id: "output-1",
    type: "outputNode",
    position: { x: 0, y: NODE_STEP_Y * 4 },
    data: { label: "Save result", icon: "general_info_circle" },
  },
  {
    id: "output-2",
    type: "outputNode",
    position: { x: 0 + NODE_STEP_X, y: NODE_STEP_Y * 4 },
    data: { label: "Send notification", icon: "general_notification" },
  },
  {
    id: "output-3",
    type: "outputNode",
    position: { x: 0 + NODE_STEP_X * 2, y: NODE_STEP_Y * 4 },
    data: { label: "Export report", icon: "action_download" },
  },
];

/** Dummy edges for the workflow editor canvas. */
const dummyEdges: Edge[] = [
  { id: "e-initial1-transform1", source: "initial-1", target: "transform-1" },
  { id: "e-transform1-join1", source: "transform-1", target: "join-1" },
  { id: "e-initial2-join1", source: "initial-2", target: "join-1", targetHandle: "target-1" },
  { id: "e-join1-branch1", source: "join-1", target: "branch-1" },
  { id: "e-branch1-output1", source: "branch-1", target: "output-1", sourceHandle: "source-0" },
  { id: "e-branch1-output2", source: "branch-1", target: "output-2", sourceHandle: "source-1" },
  { id: "e-initial3-transform3", source: "initial-3", target: "transform-3" },
  { id: "e-transform3-output3", source: "transform-3", target: "output-3" },
];

/** Single workflow dummy data: header metadata + canvas nodes and edges. */
export const workflowDummyData = {
  title: "Workflow Builder",
  itemLabel: "Untitled workflow",
  itemCaption: "last updated 12:03 on March 1 2026",
  nodes: dummyNodes,
  edges: dummyEdges,
};

/** Empty workflow for creating a new workflow (no nodes or edges). */
export const workflowEmptyData = {
  title: "Workflow Builder",
  itemLabel: "Untitled workflow",
  itemCaption: "",
  nodes: [] as Node<WorkflowDummyNodeData, string>[],
  edges: [] as Edge[],
};

/** Workflow definition shape for the builder (matches WorkflowBuilder Workflow type). */
export interface WorkflowDefinition {
  title: string;
  itemLabel?: string;
  itemCaption?: string;
  id?: string;
  nodes: Node<WorkflowDummyNodeData, string>[];
  edges: Edge[];
}

/** Expense approval: submit → validate → branch by amount → approve or route to manager → notify
 *  Layout: vertical NODE_STEP_Y; two branches spaced by NODE_STEP_X; final node centered below. */
const expenseApprovalNodes: Node<WorkflowDummyNodeData, string>[] = [
  { id: "exp-1", type: "initialNode", position: { x: 12, y: 0 }, data: { label: "Expense submitted", icon: "money_card" } },
  { id: "exp-2", type: "transformNode", position: { x: 12, y: NODE_STEP_Y }, data: { label: "Validate expense", icon: "general_exclamationmark_circle" } },
  { id: "exp-3", type: "branchNode", position: { x: 12, y: NODE_STEP_Y * 2 }, data: { label: "Amount over limit?", icon: "navigation_arrow_up_arrow_down" } },
  { id: "exp-4", type: "outputNode", position: { x: 0, y: NODE_STEP_Y * 3 }, data: { label: "Auto-approve", icon: "general_checkmark" } },
  { id: "exp-5", type: "outputNode", position: { x: NODE_STEP_X, y: NODE_STEP_Y * 3 }, data: { label: "Route to manager", icon: "human_person" } },
  { id: "exp-6", type: "outputNode", position: { x: NODE_STEP_X - Math.floor(NODE_MAX_WIDTH / 2), y: NODE_STEP_Y * 4 }, data: { label: "Notify submitter", icon: "general_notification" } },
];
const expenseApprovalEdges: Edge[] = [
  { id: "e-exp1-2", source: "exp-1", target: "exp-2" },
  { id: "e-exp2-3", source: "exp-2", target: "exp-3" },
  { id: "e-exp3-4", source: "exp-3", target: "exp-4", sourceHandle: "source-0" },
  { id: "e-exp3-5", source: "exp-3", target: "exp-5", sourceHandle: "source-1" },
  { id: "e-exp4-6", source: "exp-4", target: "exp-6" },
  { id: "e-exp5-6", source: "exp-5", target: "exp-6" },
];

/** Invoice processing: new invoice → extract data → match to PO → branch → finance or review
 *  Layout: vertical NODE_STEP_Y; two branches spaced by NODE_STEP_X. */
const invoiceProcessingNodes: Node<WorkflowDummyNodeData, string>[] = [
  { id: "inv-1", type: "initialNode", position: { x: 12, y: 0 }, data: { label: "New invoice received", icon: "money_dollarsign_envelope" } },
  { id: "inv-2", type: "transformNode", position: { x: 12, y: NODE_STEP_Y }, data: { label: "Extract invoice data", icon: "action_edit_pencil" } },
  { id: "inv-3", type: "transformNode", position: { x: 12, y: NODE_STEP_Y * 2 }, data: { label: "Match to purchase order", icon: "general_link" } },
  { id: "inv-4", type: "branchNode", position: { x: 12, y: NODE_STEP_Y * 3 }, data: { label: "Match found?", icon: "navigation_arrow_left_arrow_right" } },
  { id: "inv-5", type: "outputNode", position: { x: 0, y: NODE_STEP_Y * 4 }, data: { label: "Send to finance", icon: "money_card" } },
  { id: "inv-6", type: "outputNode", position: { x: NODE_STEP_X, y: NODE_STEP_Y * 4 }, data: { label: "Flag for review", icon: "general_exclamationmark_triangle" } },
];
const invoiceProcessingEdges: Edge[] = [
  { id: "e-inv1-2", source: "inv-1", target: "inv-2" },
  { id: "e-inv2-3", source: "inv-2", target: "inv-3" },
  { id: "e-inv3-4", source: "inv-3", target: "inv-4" },
  { id: "e-inv4-5", source: "inv-4", target: "inv-5", sourceHandle: "source-0" },
  { id: "e-inv4-6", source: "inv-4", target: "inv-6", sourceHandle: "source-1" },
];

/** New joiner onboarding: new hire → create accounts → assign training → notify + welcome
 *  Layout: vertical NODE_STEP_Y; two outputs spaced by NODE_STEP_X. */
const newJoinerOnboardingNodes: Node<WorkflowDummyNodeData, string>[] = [
  { id: "onb-1", type: "initialNode", position: { x: 12, y: 0 }, data: { label: "New hire created", icon: "human_person_plus" } },
  { id: "onb-2", type: "transformNode", position: { x: 12, y: NODE_STEP_Y }, data: { label: "Create IT accounts", icon: "object_device_computer" } },
  { id: "onb-3", type: "transformNode", position: { x: 12, y: NODE_STEP_Y * 2 }, data: { label: "Assign training", icon: "social_education" } },
  { id: "onb-4", type: "joinNode", position: { x: 12, y: NODE_STEP_Y * 3 }, data: { label: "Complete setup", icon: "general_checkmark" } },
  { id: "onb-5", type: "outputNode", position: { x: 0, y: NODE_STEP_Y * 4 }, data: { label: "Notify manager", icon: "general_notification" } },
  { id: "onb-6", type: "outputNode", position: { x: NODE_STEP_X, y: NODE_STEP_Y * 4 }, data: { label: "Send welcome email", icon: "general_email" } },
];
const newJoinerOnboardingEdges: Edge[] = [
  { id: "e-onb1-2", source: "onb-1", target: "onb-2" },
  { id: "e-onb2-3", source: "onb-2", target: "onb-3" },
  { id: "e-onb3-4", source: "onb-3", target: "onb-4" },
  { id: "e-onb4-5", source: "onb-4", target: "onb-5" },
  { id: "e-onb4-6", source: "onb-4", target: "onb-6" },
];

const expenseApprovalWorkflow: WorkflowDefinition = {
  id: "expense-approval",
  title: "Workflow Builder",
  itemLabel: "Expense approval",
  itemCaption: "last updated 28 Jan 2025",
  nodes: expenseApprovalNodes,
  edges: expenseApprovalEdges,
};

const invoiceProcessingWorkflow: WorkflowDefinition = {
  id: "invoice-processing",
  title: "Workflow Builder",
  itemLabel: "Invoice processing",
  itemCaption: "last updated 27 Jan 2025",
  nodes: invoiceProcessingNodes,
  edges: invoiceProcessingEdges,
};

const newJoinerOnboardingWorkflow: WorkflowDefinition = {
  id: "new-joiner-onboarding",
  title: "Workflow Builder",
  itemLabel: "New joiner onboarding",
  itemCaption: "last updated 26 Jan 2025",
  nodes: newJoinerOnboardingNodes,
  edges: newJoinerOnboardingEdges,
};

/** Look up workflow definition by id (for editing in workflow builder). */
export const workflowDefinitionsById: Record<string, WorkflowDefinition> = {
  "expense-approval": expenseApprovalWorkflow,
  "invoice-processing": invoiceProcessingWorkflow,
  "new-joiner-onboarding": newJoinerOnboardingWorkflow,
};
