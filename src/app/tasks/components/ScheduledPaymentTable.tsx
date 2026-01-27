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
} from "@/components";
import styles from "../page.module.css";

export default function ScheduledPaymentTable() {
  return (
    <>
      <div className={styles.summaryRow}>
        <DataCard label="Total payment due" value="£91,740" />
        <DataCard label="Post-approval balance" value="£1.16m" />
        <DataCard
          label="Budget remaining"
          value="18%"
          severity="positive"
        />
        <DataCard
          label="Risk"
          value="2 payments"
          caption="require attention"
          severity="warning"
        />
      </div>
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
          <TableRow>
            <TableTitleCell
              title="Acme Corporation"
              avatar={<Avatar name="Acme Corporation" />}
            />
            <TableCell align="right">£12,500.00</TableCell>
            <TableCell>Q4 Marketing Campaign</TableCell>
            <TableCell>Invoice</TableCell>
            <TableCell>15 Feb 2025</TableCell>
            <TableCell>Approved</TableCell>
          </TableRow>
          <TableRow>
            <TableTitleCell
              title="Tech Solutions Ltd"
              avatar={<Avatar name="Tech Solutions Ltd" />}
            />
            <TableCell align="right">£8,750.00</TableCell>
            <TableCell>Website Redesign</TableCell>
            <TableCell>Recurring</TableCell>
            <TableCell>20 Feb 2025</TableCell>
            <TableCell>Pending</TableCell>
          </TableRow>
          <TableRow>
            <TableTitleCell
              title="Global Services Inc"
              avatar={<Avatar name="Global Services Inc" />}
            />
            <TableCell align="right">£45,200.00</TableCell>
            <TableCell>Infrastructure Upgrade</TableCell>
            <TableCell>Invoice</TableCell>
            <TableCell>25 Feb 2025</TableCell>
            <TableCell>Approved</TableCell>
          </TableRow>
          <TableRow>
            <TableTitleCell
              title="Design Studio"
              avatar={<Avatar name="Design Studio" />}
            />
            <TableCell align="right">£3,200.00</TableCell>
            <TableCell>Brand Identity</TableCell>
            <TableCell>One-time</TableCell>
            <TableCell>28 Feb 2025</TableCell>
            <TableCell>Pending</TableCell>
          </TableRow>
          <TableRow>
            <TableTitleCell
              title="Consulting Group"
              avatar={<Avatar name="Consulting Group" />}
            />
            <TableCell align="right">£21,090.00</TableCell>
            <TableCell>Strategic Planning</TableCell>
            <TableCell>Recurring</TableCell>
            <TableCell>1 Mar 2025</TableCell>
            <TableCell>Approved</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
