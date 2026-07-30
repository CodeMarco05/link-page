import type { LinkItem } from "@/lib/config/schema";

export function resolveIconUrl(item: LinkItem): string {
  if (item.icon) {
    return item.icon;
  }

  const host = new URL(item.url).hostname;
  return `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
}
