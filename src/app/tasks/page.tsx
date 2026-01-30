"use client";

import { Suspense, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  PageLayout,
  Nav,
  type PageLayoutRef,
  PageHeader,
  Chip,
  DetailHeader,
} from "@/components";
import type { PaymentRow } from "@/data";
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

export type { PaymentRow } from "@/data";

function TasksPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { navState, setNavState } = useNavState();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRow | null>(
    null,
  );
  const layoutRef = useRef<PageLayoutRef>(null);

  // Derive selected task type from URL query parameter (default: scheduled-payment)
  const taskTypeFromUrl = searchParams.get("type");
  const selectedTaskType: TaskType =
    taskTypeFromUrl &&
    VALID_TASK_TYPES.includes(
      taskTypeFromUrl as (typeof VALID_TASK_TYPES)[number],
    )
      ? (taskTypeFromUrl as TaskType)
      : null;
  const effectiveTaskType = selectedTaskType ?? "scheduled-payment";

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
              selected={effectiveTaskType === "invoice-overdue"}
              onClick={() =>
                handleTaskTypeChange(
                  effectiveTaskType === "invoice-overdue"
                    ? null
                    : "invoice-overdue",
                )
              }
            />
            <Chip
              icon="money_cheque"
              label="Scheduled Payment"
              selected={effectiveTaskType === "scheduled-payment"}
              onClick={() =>
                handleTaskTypeChange(
                  effectiveTaskType === "scheduled-payment"
                    ? null
                    : "scheduled-payment",
                )
              }
            />
            <Chip
              icon="general_task"
              label="Expense Claim"
              selected={effectiveTaskType === "expense-claim"}
              onClick={() =>
                handleTaskTypeChange(
                  effectiveTaskType === "expense-claim" ? null : "expense-claim",
                )
              }
            />
            <Chip
              icon="general_home"
              label="New Joiner"
              selected={effectiveTaskType === "new-joiner"}
              onClick={() =>
                handleTaskTypeChange(
                  effectiveTaskType === "new-joiner" ? null : "new-joiner",
                )
              }
            />
          </div>
        </div>
        {effectiveTaskType === "scheduled-payment" && (
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

function TasksPageFallback() {
  return (
    <div className={styles.pageContainer}>
      <div style={{ padding: "var(--spacing-large, 24px)" }}>Loading…</div>
    </div>
  );
}

export default function TasksPage() {
  return (
    <Suspense fallback={<TasksPageFallback />}>
      <TasksPageContent />
    </Suspense>
  );
}
