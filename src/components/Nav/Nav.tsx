"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import NavItem from "./NavItem/NavItem";
import { Icon, IconButton, Avatar, Pill } from "@/components";
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

  // Theme state - always start with "light" to match server and avoid hydration mismatch
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const router = useRouter();
  const pathname = usePathname();

  // After mount: restore theme from localStorage and sync to DOM (deferred to avoid setState-in-effect lint)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme === "light" || savedTheme === "dark") {
      const apply = () => {
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
      };
      queueMicrotask(apply);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  // Sync theme to DOM when it changes (e.g. after toggle)
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  // Handle theme toggle
  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    }
  };

  // Map item IDs to routes
  const itemRoutes: Record<string, string> = {
    home: "/",
    "get-paid": "/get-paid",
    payments: "/payments",
    pots: "/pots",
    insights: "/insights",
    team: "/team",
  };

  // Determine active item from current pathname if not controlled
  const pathnameBasedActiveId = pathname
    ? Object.entries(itemRoutes).find(([, route]) => pathname === route)?.[0]
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
      <div className={styles.logoContainer}>
        <Image
          src="/assets/Monzo.svg"
          alt="Monzo"
          width={120}
          height={36}
          className={`${styles.logo} ${shouldExpand ? styles.logoVisible : ""}`}
          priority
        />
      </div>
      <div className={styles.companyContainer}>
        <Avatar
          image="/assets/ElementalCore.png"
          name="Elemental Core"
          size="medium"
        />
        <div
          className={`${styles.companyInfo} ${shouldExpand ? styles.companyInfoVisible : ""}`}
        >
          <span className={styles.companyName}>Elemental Core ltd</span>
          <Pill label="Pro" severity="default" icon="navigation_star" />
        </div>
      </div>

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
          label="Team"
          leadingIcon={
            <Icon name="human_person_circles" size="medium" color="content-primary" />
          }
          expanded={shouldExpand}
          active={activeItemId === "team"}
          onClick={() => handleItemClick("team")}
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
          <div
            className={`${styles.themeToggleContainer} ${shouldExpand ? styles.themeToggleVisible : ""}`}
          >
            <IconButton
              variant="secondary"
              size="medium"
              icon="general_theme"
              aria-label={
                theme === "light" ? "Switch to dark mode" : "Switch to light mode"
              }
              onClick={handleThemeToggle}
            />
          </div>
        </div>
      )}
    </nav>
  );
}
