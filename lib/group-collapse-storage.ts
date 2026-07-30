const GROUP_COLLAPSE_STORAGE_PREFIX = "group-collapsed:";

function groupCollapseStorageKey(name: string): string {
  return `${GROUP_COLLAPSE_STORAGE_PREFIX}${name}`;
}

export function readGroupCollapsed(name: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.localStorage.getItem(groupCollapseStorageKey(name)) === "1";
}

const listeners = new Set<() => void>();

/** Lets components re-read collapse state after any of them writes it. */
export function subscribeToGroupCollapsed(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

export function writeGroupCollapsed(name: string, collapsed: boolean): void {
  window.localStorage.setItem(groupCollapseStorageKey(name), collapsed ? "1" : "0");
  for (const listener of listeners) {
    listener();
  }
}

/** Drops saved state for groups that no longer exist in the config. */
export function pruneGroupCollapsed(activeNames: string[]): void {
  const activeKeys = new Set(activeNames.map(groupCollapseStorageKey));

  const staleKeys = Object.keys(window.localStorage).filter(
    (key) => key.startsWith(GROUP_COLLAPSE_STORAGE_PREFIX) && !activeKeys.has(key),
  );

  for (const key of staleKeys) {
    window.localStorage.removeItem(key);
  }
}
