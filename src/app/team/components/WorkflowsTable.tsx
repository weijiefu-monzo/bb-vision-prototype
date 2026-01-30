"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableTitleCell,
  Pill,
  IconButton,
  Icon,
} from "@/components";

const WORKFLOWS = [
  {
    id: "expense-approval",
    name: "Expense approval",
    createdBy: "Alex Chen",
    lastUpdatedAt: "28 Jan 2025",
    lastRunAt: "28 Jan 2025, 10:32",
    status: "Running" as const,
  },
  {
    id: "invoice-processing",
    name: "Invoice processing",
    createdBy: "Sam Williams",
    lastUpdatedAt: "27 Jan 2025",
    lastRunAt: "27 Jan 2025, 15:20",
    status: "Paused" as const,
  },
  {
    id: "new-joiner-onboarding",
    name: "New joiner onboarding",
    createdBy: "Alex Chen",
    lastUpdatedAt: "26 Jan 2025",
    lastRunAt: "24 Jan 2025, 09:00",
    status: "Idle" as const,
  },
] as const;

export type Workflow = (typeof WORKFLOWS)[number];

export interface WorkflowsTableProps {
  onRowClick?: (workflow: Workflow) => void;
  onEditClick?: (workflow: Workflow) => void;
}

export default function WorkflowsTable({ onRowClick, onEditClick }: WorkflowsTableProps) {
  return (
    <Table fullWidth>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Created by</TableHeaderCell>
          <TableHeaderCell>Last updated at</TableHeaderCell>
          <TableHeaderCell>Last run at</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell align="right">Actions</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {WORKFLOWS.map((workflow, index) => (
          <TableRow key={index} onClick={() => onRowClick?.(workflow)}>
            <TableTitleCell
              title={workflow.name}
              avatar={<Icon name="general_flex" size="medium" />}
            />
            <TableCell>{workflow.createdBy}</TableCell>
            <TableCell>{workflow.lastUpdatedAt}</TableCell>
            <TableCell>{workflow.lastRunAt}</TableCell>
            <TableCell>
              <Pill
                label={workflow.status}
                severity={
                  workflow.status === "Running"
                    ? "positive"
                    : workflow.status === "Paused"
                      ? "warning"
                      : "default"
                }
              />
            </TableCell>
            <TableCell align="right">
              <div
                style={{
                  display: "flex",
                  gap: "var(--spacing-x-small, 4px)",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <IconButton
                  variant="secondary"
                  size="medium"
                  icon={
                    workflow.status === "Running"
                      ? "action_pause"
                      : "action_play"
                  }
                  aria-label={workflow.status === "Running" ? "Pause" : "Play"}
                  onClick={() => {}}
                />
                <IconButton
                  variant="secondary"
                  size="medium"
                  icon="general_nosign"
                  aria-label="Stop"
                  onClick={() => {}}
                />
                <IconButton
                  variant="secondary"
                  size="medium"
                  icon="action_edit_pencil"
                  aria-label="Edit"
                  onClick={() => onEditClick?.(workflow)}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
