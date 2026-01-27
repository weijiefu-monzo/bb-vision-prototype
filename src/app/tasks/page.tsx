"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  PageLayout,
  Nav,
  type PageLayoutRef,
  PageHeader,
  Chip,
  DetailHeader,
} from "@/components";
import { useNavState } from "@/contexts/NavContext";
import ScheduledPaymentTable from "./components/ScheduledPaymentTable";
import styles from "./page.module.css";

const VALID_TASK_TYPES = [
  "invoice-overdue",
  "scheduled-payment",
  "expense-claim",
  "new-joiner",
] as const;

type TaskType = (typeof VALID_TASK_TYPES)[number] | null;

export interface PaymentRow {
  recipient: string;
  amount: string;
  project: string;
  paymentType: string;
  dueDate: string;
  approvalStatus: string;
}

export default function TasksPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { navState, setNavState } = useNavState();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRow | null>(
    null,
  );
  const layoutRef = useRef<PageLayoutRef>(null);

  // Derive selected task type from URL query parameter
  const taskTypeFromUrl = searchParams.get("type");
  const selectedTaskType: TaskType =
    taskTypeFromUrl &&
    VALID_TASK_TYPES.includes(
      taskTypeFromUrl as (typeof VALID_TASK_TYPES)[number],
    )
      ? (taskTypeFromUrl as TaskType)
      : null;

  // Update URL when task type changes
  const handleTaskTypeChange = (taskType: TaskType) => {
    const params = new URLSearchParams(searchParams.toString());
    if (taskType) {
      params.set("type", taskType);
    } else {
      params.delete("type");
    }
    router.push(`/tasks?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={styles.pageContainer}>
      <PageLayout
        ref={layoutRef}
        navState={navState}
        isDetailOpen={isDetailOpen}
        onNavStateChange={setNavState}
        onDetailOpenChange={setIsDetailOpen}
        navContent={
          <Nav
            expanded={navState === "expanded"}
            onNavStateToggle={() => {
              setNavState(navState === "expanded" ? "collapsed" : "expanded");
            }}
          />
        }
        detailContent={
          selectedPayment ? (
            <DetailHeader
              title={selectedPayment.recipient}
              description={selectedPayment.amount}
              onBack={() => {
                setIsDetailOpen(false);
                setSelectedPayment(null);
              }}
            />
          ) : (
            <></>
          )
        }
      >
        <PageHeader
          title="Tasks"
          description="View your current tasks and priorities"
          onBack={() => router.push("/")}
        />
        <div className={styles.chipsContainer}>
          <div className={styles.chipsRow}>
            <Chip
              icon="money_invoice_envelope"
              label="Invoice Overdue"
              selected={selectedTaskType === "invoice-overdue"}
              onClick={() =>
                handleTaskTypeChange(
                  selectedTaskType === "invoice-overdue"
                    ? null
                    : "invoice-overdue",
                )
              }
            />
            <Chip
              icon="money_cheque"
              label="Scheduled Payment"
              selected={selectedTaskType === "scheduled-payment"}
              onClick={() =>
                handleTaskTypeChange(
                  selectedTaskType === "scheduled-payment"
                    ? null
                    : "scheduled-payment",
                )
              }
            />
            <Chip
              icon="general_task"
              label="Expense Claim"
              selected={selectedTaskType === "expense-claim"}
              onClick={() =>
                handleTaskTypeChange(
                  selectedTaskType === "expense-claim" ? null : "expense-claim",
                )
              }
            />
            <Chip
              icon="general_home"
              label="New Joiner"
              selected={selectedTaskType === "new-joiner"}
              onClick={() =>
                handleTaskTypeChange(
                  selectedTaskType === "new-joiner" ? null : "new-joiner",
                )
              }
            />
          </div>
        </div>
        {selectedTaskType === "scheduled-payment" && (
          <ScheduledPaymentTable
            onRowClick={(payment) => {
              setSelectedPayment(payment);
              setIsDetailOpen(true);
            }}
          />
        )}
      </PageLayout>
    </div>
  );
}
