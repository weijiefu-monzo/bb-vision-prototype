import type { Node, Edge } from "@xyflow/react";

/** Dummy node data shape for workflow canvas (label + optional icon). */
export interface WorkflowDummyNodeData extends Record<string, unknown> {
  label: string;
  icon?: string;
}

/** Dummy nodes for the workflow editor canvas. */
const dummyNodes: Node<WorkflowDummyNodeData, string>[] = [
  {
    id: "initial-1",
    type: "initialNode",
    position: { x: 80, y: 40 },
    data: { label: "Load data", icon: "navigation_arrow_up" },
  },
  {
    id: "initial-2",
    type: "initialNode",
    position: { x: 280, y: 40 },
    data: { label: "Start workflow", icon: "object_clock" },
  },
  {
    id: "initial-3",
    type: "initialNode",
    position: { x: 480, y: 40 },
    data: { label: "Trigger event", icon: "general_lightning" },
  },
  {
    id: "transform-1",
    type: "transformNode",
    position: { x: 80, y: 160 },
    data: { label: "Filter rows", icon: "general_chart_line" },
  },
  {
    id: "transform-2",
    type: "transformNode",
    position: { x: 280, y: 160 },
    data: { label: "Map fields", icon: "general_layout" },
  },
  {
    id: "transform-3",
    type: "transformNode",
    position: { x: 480, y: 160 },
    data: { label: "Validate", icon: "general_exclamationmark_circle" },
  },
  {
    id: "join-1",
    type: "joinNode",
    position: { x: 80, y: 280 },
    data: { label: "Merge streams", icon: "general_link" },
  },
  {
    id: "join-2",
    type: "joinNode",
    position: { x: 320, y: 280 },
    data: { label: "Combine datasets", icon: "object_document" },
  },
  {
    id: "branch-1",
    type: "branchNode",
    position: { x: 80, y: 400 },
    data: { label: "Split by condition", icon: "navigation_arrow_up_arrow_down" },
  },
  {
    id: "branch-2",
    type: "branchNode",
    position: { x: 320, y: 400 },
    data: { label: "Route branches", icon: "navigation_arrow_left_arrow_right" },
  },
  {
    id: "output-1",
    type: "outputNode",
    position: { x: 80, y: 520 },
    data: { label: "Save result", icon: "general_info_circle" },
  },
  {
    id: "output-2",
    type: "outputNode",
    position: { x: 280, y: 520 },
    data: { label: "Send notification", icon: "general_notification" },
  },
  {
    id: "output-3",
    type: "outputNode",
    position: { x: 480, y: 520 },
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
