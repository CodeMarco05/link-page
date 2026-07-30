"use client";

import { useEffect } from "react";
import { pruneGroupCollapsed } from "@/lib/group-collapse-storage";

/** Housekeeping only: clears collapse state for groups removed from the config. */
export function GroupStoragePruner({ groupNames }: { groupNames: string[] }) {
  // groupNames is a fresh array each render, so depend on its contents instead.
  const namesKey = JSON.stringify(groupNames);

  useEffect(() => {
    pruneGroupCollapsed(JSON.parse(namesKey) as string[]);
  }, [namesKey]);

  return null;
}
