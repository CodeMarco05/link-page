export const GROUP_COLLAPSE_STORAGE_PREFIX = "group-collapsed:";

export function groupCollapseStorageKey(name: string): string {
  return `${GROUP_COLLAPSE_STORAGE_PREFIX}${name}`;
}
