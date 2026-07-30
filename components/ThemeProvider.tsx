"use client";

import { createContext, useCallback, useContext, type ReactNode } from "react";
import type { ThemeName } from "@/lib/config/schema";
import { themeClassName } from "@/lib/styles/themes";
import { readStoredTheme, subscribeToStoredTheme, writeStoredTheme } from "@/lib/theme-storage";
import { useClientValue } from "@/lib/use-client-value";

type ThemeContextValue = {
  theme: ThemeName;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  defaultTheme,
  children,
}: {
  defaultTheme: ThemeName;
  children: ReactNode;
}) {
  // Falls back to the config default until the stored override is readable.
  const theme = useClientValue(
    useCallback(() => readStoredTheme() ?? defaultTheme, [defaultTheme]),
    defaultTheme,
    subscribeToStoredTheme,
  );

  function toggleTheme() {
    writeStoredTheme(theme === "dark" ? "light" : "dark");
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
