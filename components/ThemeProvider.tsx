"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { ThemeName } from "@/lib/config/schema";
import { themeClassName } from "@/lib/styles/themes";

const STORAGE_KEY = "theme-override";

type ThemeContextValue = {
  theme: ThemeName;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredTheme(): ThemeName | null {
  if (typeof window === "undefined") {
    return null;
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "dark" || stored === "light" || stored === "auto" ? stored : null;
}

export function ThemeProvider({
  defaultTheme,
  children,
}: {
  defaultTheme: ThemeName;
  children: ReactNode;
}) {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const stored = readStoredTheme();
    if (stored) {
      setTheme(stored);
    }
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={themeClassName(theme)}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
