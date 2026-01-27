"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { NavState } from "@/components";

interface NavContextType {
  navState: NavState;
  setNavState: (state: NavState) => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export function NavProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage if available, otherwise default to "expanded"
  // Only persist expanded/collapsed, not floating (which is transient)
  const [navState, setNavStateState] = useState<NavState>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("navState");
      if (saved === "expanded" || saved === "collapsed") {
        return saved as NavState;
      }
    }
    return "expanded";
  });

  // Save to localStorage whenever navState changes
  // Normalize floating to collapsed since floating is a transient hover state
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stateToSave = navState === "floating" ? "collapsed" : navState;
      localStorage.setItem("navState", stateToSave);
    }
  }, [navState]);

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
