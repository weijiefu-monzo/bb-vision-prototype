"use client";

import React, { ReactNode, HTMLAttributes } from "react";
import Link from "next/link";
import styles from "./Table.module.css";

export interface TableTitleCellProps extends Omit<HTMLAttributes<HTMLTableCellElement>, "children"> {
  title: string;
  href?: string;
  avatar?: ReactNode;
  caption?: ReactNode;
  align?: "left" | "right" | "center";
}

export function TableTitleCell({
  title,
  href,
  avatar,
  caption,
  align = "left",
  className,
  ...props
}: TableTitleCellProps) {
  const titleContent = href ? (
    <Link href={href} className={styles.tableTitleLink}>
      {title}
    </Link>
  ) : (
    <span className={styles.tableTitleText}>{title}</span>
  );

  return (
    <td
      className={`${styles.tableCell} ${styles.tableTitleCell} ${styles[`tableCell${align.charAt(0).toUpperCase() + align.slice(1)}`]} ${className || ""}`}
      {...props}
    >
      <div className={styles.tableTitleCellContent}>
        {avatar && <div className={styles.tableTitleAvatar}>{avatar}</div>}
        <div className={styles.tableTitleTextContainer}>
          {titleContent}
          {caption && <div className={styles.tableTitleCaption}>{caption}</div>}
        </div>
      </div>
    </td>
  );
}
