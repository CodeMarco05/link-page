import type { ThemeName } from "@/lib/config/schema";

export function themeClassName(theme: ThemeName): string {
  return `theme-${theme}`;
}
