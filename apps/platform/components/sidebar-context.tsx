"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { storage } from "@labs/utils"; // Assuming we have utils, otherwise use localStorage directly

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    // Default to false (open)
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem("sidebar_collapsed");
    if (stored) {
      setIsCollapsed(JSON.parse(stored));
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebar_collapsed", JSON.stringify(newState));
  };

  const setCollapsed = (collapsed: boolean) => {
      setIsCollapsed(collapsed);
      localStorage.setItem("sidebar_collapsed", JSON.stringify(collapsed));
  }

  // Prevent hydration mismatch by rendering nothing or default until mounted? 
  // Actually simpler to just render, client side might flicker but acceptable for now.
  // Or better: use a fixed initial state and effect to update.

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
