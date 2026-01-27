"use client";

import React from "react";
import {
  DataCard,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableTitleCell,
  Avatar,
  Pill,
  PageSection,
  Button,
} from "@/components";
import type { PaymentRow } from "../page";
import styles from "../page.module.css";

export interface ScheduledPaymentTableProps {
  onRowClick?: (payment: PaymentRow) => void;
}

const PAYMENT_DATA: PaymentRow[] = [
  {
    recipient: "Acme Corporation",
    amount: "£12,500.00",
    project: "Q4 Marketing Campaign",
    paymentType: "Invoice",
    dueDate: "15 Feb 2025",
    approvalStatus: "Approved",
  },
  {
    recipient: "Tech Solutions Ltd",
    amount: "£8,750.00",
    project: "Website Redesign",
    paymentType: "Recurring",
    dueDate: "20 Feb 2025",
    approvalStatus: "Pending",
  },
  {
    recipient: "Global Services Inc",
    amount: "£45,200.00",
    project: "Infrastructure Upgrade",
    paymentType: "Invoice",
    dueDate: "25 Feb 2025",
    approvalStatus: "Approved",
  },
  {
    recipient: "Design Studio",
    amount: "£3,200.00",
    project: "Brand Identity",
    paymentType: "One-time",
    dueDate: "28 Feb 2025",
    approvalStatus: "Pending",
  },
  {
    recipient: "Consulting Group",
    amount: "£21,090.00",
    project: "Strategic Planning",
    paymentType: "Recurring",
    dueDate: "1 Mar 2025",
    approvalStatus: "Approved",
  },
];

export default function ScheduledPaymentTable({
  onRowClick,
}: ScheduledPaymentTableProps) {
  return (
    <>
      <div className={styles.summaryRow}>
        <DataCard label="Total payment due" value="£91,740" />
        <DataCard label="Post-approval balance" value="£1.16m" />
        <DataCard label="Budget remaining" value="18%" severity="positive" />
        <DataCard
          label="Risk"
          value="2 payments"
          caption="require attention"
          severity="warning"
        />
      </div>
      <PageSection
        title="Scheduled payments by March 2025"
        trailing={<Button size="medium">Approve all</Button>}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Recipient</TableHeaderCell>
              <TableHeaderCell align="right">Amount</TableHeaderCell>
              <TableHeaderCell>Project</TableHeaderCell>
              <TableHeaderCell>Payment type</TableHeaderCell>
              <TableHeaderCell>Due date</TableHeaderCell>
              <TableHeaderCell>Approval status</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PAYMENT_DATA.map((payment, index) => (
              <TableRow key={index} onClick={() => onRowClick?.(payment)}>
                <TableTitleCell
                  title={payment.recipient}
                  avatar={<Avatar name={payment.recipient} />}
                />
                <TableCell align="right">{payment.amount}</TableCell>
                <TableCell>{payment.project}</TableCell>
                <TableCell>
                  <Pill label={payment.paymentType} severity="default" />
                </TableCell>
                <TableCell>{payment.dueDate}</TableCell>
                <TableCell>
                  <Pill
                    label={payment.approvalStatus}
                    severity={
                      payment.approvalStatus === "Approved"
                        ? "positive"
                        : payment.approvalStatus === "Pending"
                          ? "warning"
                          : "default"
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageSection>
    </>
  );
}
