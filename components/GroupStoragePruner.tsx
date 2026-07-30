"use client";

import { useEffect } from "react";
import { GROUP_COLLAPSE_STORAGE_PREFIX, groupCollapseStorageKey } from "@/lib/group-collapse-storage";

export function GroupStoragePruner({ groupNames }: { groupNames: string[] }) {
  useEffect(() => {
    const activeKeys = new Set(groupNames.map(groupCollapseStorageKey));

    const keysToRemove: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith(GROUP_COLLAPSE_STORAGE_PREFIX) && !activeKeys.has(key)) {
        keysToRemove.push(key);
      }
    }

    for (const key of keysToRemove) {
      window.localStorage.removeItem(key);
    }
  }, [groupNames]);

  return null;
}
