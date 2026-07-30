import type { ThemeName } from "@/lib/config/schema";
import { themeNames } from "@/lib/config/schema";

const THEME_STORAGE_KEY = "theme-override";

function isThemeName(value: string | null): value is ThemeName {
  return value !== null && (themeNames as readonly string[]).includes(value);
}

export function readStoredTheme(): ThemeName | null {
  if (typeof window === "undefined") {
    return null;
  }
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isThemeName(stored) ? stored : null;
}

const listeners = new Set<() => void>();

export function subscribeToStoredTheme(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

export function writeStoredTheme(theme: ThemeName): void {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  for (const listener of listeners) {
    listener();
  }
}
