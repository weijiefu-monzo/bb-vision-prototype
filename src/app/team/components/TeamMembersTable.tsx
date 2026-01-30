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
  Avatar,
  HorizontalBarChart,
} from "@/components";
import styles from "./TeamMembersTable.module.css";

const TEAM_MEMBERS = [
  {
    name: "Alex Chen",
    role: "Admin",
    status: "Active",
    monthlySpend: "£2,450",
    spent: 2450,
    limit: 5000,
  },
  {
    name: "Sam Williams",
    role: "Member",
    status: "Active",
    monthlySpend: "£1,820",
    spent: 1820,
    limit: 3000,
  },
  {
    name: "Jordan Taylor",
    role: "Member",
    status: "Pending",
    monthlySpend: "£0",
    spent: 0,
    limit: 2000,
  },
  {
    name: "Riley Moore",
    role: "Viewer",
    status: "Active",
    monthlySpend: "£340",
    spent: 340,
    limit: 500,
  },
  {
    name: "Casey Davis",
    role: "Member",
    status: "Inactive",
    monthlySpend: "£0",
    spent: 0,
    limit: 1500,
  },
] as const;

export type TeamMember = (typeof TEAM_MEMBERS)[number];

const SPEND_LIMIT_COLORS_ACTIVE = [
  "var(--chart-sequential-on-light-order1)",
  "var(--chart-sequential-on-light-order5)",
];
const SPEND_LIMIT_COLORS_DISABLED = [
  "var(--semantic-content-disabled)",
  "var(--semantic-content-disabled)",
];

function SpendLimitBar({
  spent,
  limit,
  status,
}: {
  spent: number;
  limit: number;
  status: "Active" | "Pending" | "Inactive";
}) {
  const spentVal = Math.min(spent, limit);
  const remainingVal = Math.max(0, limit - spent);
  const data = [
    {
      label: "",
      values: [spentVal, remainingVal],
    },
  ];
  const useDisabledColor =
    status === "Pending" || status === "Inactive";
  const colors = useDisabledColor
    ? SPEND_LIMIT_COLORS_DISABLED
    : SPEND_LIMIT_COLORS_ACTIVE;
  return (
    <div className={styles.spendLimitChart}>
      <HorizontalBarChart
        data={data}
        seriesLabels={[]}
        colors={colors}
        showLegend={false}
        width={200}
        height={24}
      />
    </div>
  );
}

export interface TeamMembersTableProps {
  onRowClick?: (member: TeamMember) => void;
}

export default function TeamMembersTable({ onRowClick }: TeamMembersTableProps) {
  return (
    <Table fullWidth>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Spend limit</TableHeaderCell>
          <TableHeaderCell align="right">Monthly spend</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {TEAM_MEMBERS.map((member, index) => (
          <TableRow
            key={index}
            onClick={() => onRowClick?.(member)}
          >
            <TableTitleCell
              title={member.name}
              avatar={<Avatar name={member.name} />}
            />
            <TableCell>{member.role}</TableCell>
            <TableCell>
              <Pill
                label={member.status}
                severity={
                  member.status === "Active"
                    ? "positive"
                    : member.status === "Pending"
                      ? "warning"
                      : "default"
                }
              />
            </TableCell>
            <TableCell>
              <SpendLimitBar
                spent={member.spent}
                limit={member.limit}
                status={member.status}
              />
            </TableCell>
            <TableCell align="right">{member.monthlySpend}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
