export interface PaymentRow {
  recipient: string;
  amount: string;
  project: string;
  paymentType: string;
  dueDate: string;
  approvalStatus: string;
}

export const scheduledPaymentsDummyData: PaymentRow[] = [
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
