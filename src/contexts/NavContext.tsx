"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { NavState } from "@/components";

interface NavContextType {
  navState: NavState;
  setNavState: (state: NavState) => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export function NavProvider({ children }: { children: ReactNode }) {
  // Always start with "expanded" to match server render and avoid hydration mismatch
  // We'll sync with localStorage after mount
  const [navState, setNavStateState] = useState<NavState>("expanded");
  const [isMounted, setIsMounted] = useState(false);

  // After mount, read from localStorage to restore user preference
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("navState");
      if (saved === "expanded" || saved === "collapsed") {
        setNavStateState(saved as NavState);
      }
    }
  }, []);

  // Save to localStorage whenever navState changes (but only after mount)
  // Normalize floating to collapsed since floating is a transient hover state
  useEffect(() => {
    if (isMounted && typeof window !== "undefined") {
      const stateToSave = navState === "floating" ? "collapsed" : navState;
      localStorage.setItem("navState", stateToSave);
    }
  }, [navState, isMounted]);

  const setNavState = (state: NavState) => {
    setNavStateState(state);
  };

  return (
    <NavContext.Provider value={{ navState, setNavState }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNavState() {
  const context = useContext(NavContext);
  if (context === undefined) {
    throw new Error("useNavState must be used within a NavProvider");
  }
  return context;
}
