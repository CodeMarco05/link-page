import type { CardStyleName } from "@/lib/config/schema";

export type CardStyleClasses = {
  card: string;
  icon: string;
  name: string;
};

export const cardStyles: Record<CardStyleName, CardStyleClasses> = {
  modern: {
    card: "rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-150",
    icon: "rounded-lg bg-[var(--surface-muted)]",
    name: "font-medium",
  },
  minimal: {
    card: "border-b border-[var(--border)] hover:bg-[var(--surface-muted)] transition-colors duration-150 rounded-none",
    icon: "rounded-md",
    name: "font-normal",
  },
  glass: {
    card: "rounded-2xl bg-[var(--surface)]/60 backdrop-blur-md border border-white/10 shadow-lg hover:bg-[var(--surface)]/80 transition-all duration-150",
    icon: "rounded-full bg-white/10",
    name: "font-medium",
  },
  terminal: {
    card: "rounded-none border border-[var(--border)] bg-[var(--surface)] font-mono hover:border-[var(--accent)] transition-colors duration-150",
    icon: "rounded-none",
    name: "font-mono uppercase tracking-wide text-sm",
  },
};

export function getCardStyle(style: CardStyleName): CardStyleClasses {
  return cardStyles[style];
}
