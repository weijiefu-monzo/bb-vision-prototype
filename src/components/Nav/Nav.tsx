"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import NavItem from "./NavItem/NavItem";
import { Icon, IconButton } from "@/components";
import styles from "./Nav.module.css";

export interface NavProps {
  expanded?: boolean;
  isFloating?: boolean;
  activeItemId?: string;
  onActiveItemChange?: (itemId: string) => void;
  onNavStateToggle?: () => void;
}

export default function Nav({
  expanded = true,
  isFloating = false,
  activeItemId: controlledActiveItemId,
  onActiveItemChange,
  onNavStateToggle,
}: NavProps) {
  // Internal state for active item if not controlled
  const [internalActiveItemId, setInternalActiveItemId] =
    useState<string>("home");

  const router = useRouter();
  const pathname = usePathname();

  // Map item IDs to routes
  const itemRoutes: Record<string, string> = {
    home: "/",
    "get-paid": "/get-paid",
    payments: "/payments",
    pots: "/pots",
    insights: "/insights",
    projects: "/projects",
  };

  // Determine active item from current pathname if not controlled
  const pathnameBasedActiveId = pathname
    ? Object.entries(itemRoutes).find(([_, route]) => pathname === route)?.[0]
    : undefined;

  // Use controlled activeItemId if provided, otherwise use pathname-based, otherwise use internal state
  const activeItemId =
    controlledActiveItemId !== undefined
      ? controlledActiveItemId
      : pathnameBasedActiveId || internalActiveItemId;

  // Handle nav item click
  const handleItemClick = (itemId: string) => {
    const route = itemRoutes[itemId];
    if (route) {
      router.push(route);
    }
    if (controlledActiveItemId === undefined) {
      setInternalActiveItemId(itemId);
    }
    onActiveItemChange?.(itemId);
  };

  // When floating (hovered), show expanded NavItems even if nav is collapsed
  const shouldExpand = expanded || isFloating;

  return (
    <nav className={styles.nav}>
      <div className={styles.navItems}>
        <NavItem
          label="Home"
          leadingIcon={
            <Icon name="general_home" size="medium" color="content-primary" />
          }
          expanded={shouldExpand}
          active={activeItemId === "home"}
          onClick={() => handleItemClick("home")}
        />

        <NavItem
          label="Get Paid"
          leadingIcon={
            <Icon
              name="money_invoice_envelope"
              size="medium"
              color="content-primary"
            />
          }
          expanded={shouldExpand}
          active={activeItemId === "get-paid"}
          onClick={() => handleItemClick("get-paid")}
        />

        <NavItem
          label="Payments"
          leadingIcon={
            <Icon name="money_cheque" size="medium" color="content-primary" />
          }
          expanded={shouldExpand}
          active={activeItemId === "payments"}
          onClick={() => handleItemClick("payments")}
        />
        <NavItem
          label="Pots"
          leadingIcon={
            <Icon name="general_pot" size="medium" color="content-primary" />
          }
          expanded={shouldExpand}
          active={activeItemId === "pots"}
          onClick={() => handleItemClick("pots")}
        />
        <NavItem
          label="Insights"
          leadingIcon={
            <Icon
              name="general_chart_bar_line"
              size="medium"
              color="content-primary"
            />
          }
          expanded={shouldExpand}
          active={activeItemId === "insights"}
          onClick={() => handleItemClick("insights")}
        />
        <NavItem
          label="Projects"
          leadingIcon={
            <Icon name="general_layout" size="medium" color="content-primary" />
          }
          expanded={shouldExpand}
          active={activeItemId === "projects"}
          onClick={() => handleItemClick("projects")}
        />
      </div>

      {onNavStateToggle && (
        <div className={styles.navFooter}>
          <IconButton
            variant="secondary"
            size="medium"
            icon={
              expanded
                ? "navigation_chevron_left_2"
                : "navigation_chevron_right_2"
            }
            aria-label={expanded ? "Collapse navigation" : "Expand navigation"}
            onClick={onNavStateToggle}
          />
        </div>
      )}
    </nav>
  );
}
