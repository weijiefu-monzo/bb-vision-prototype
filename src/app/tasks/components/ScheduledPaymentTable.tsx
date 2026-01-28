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
import type { PaymentRow } from "@/data";
import { scheduledPaymentsDummyData } from "@/data";
import styles from "../page.module.css";

export interface ScheduledPaymentTableProps {
  onRowClick?: (payment: PaymentRow) => void;
}

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
        title="Payments due by March 2025"
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
            {scheduledPaymentsDummyData.map((payment, index) => (
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
