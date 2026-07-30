"use client";

import { useEffect, useState, type ReactNode } from "react";
import { groupCollapseStorageKey } from "@/lib/group-collapse-storage";

function readStoredCollapsed(storageKey: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.localStorage.getItem(storageKey) === "1";
}

export function CollapsibleGroup({ name, children }: { name: string; children: ReactNode }) {
  const storageKey = groupCollapseStorageKey(name);
  const [collapsed, setCollapsed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCollapsed(readStoredCollapsed(storageKey));
    setHydrated(true);
  }, [storageKey]);

  function toggle() {
    const next = !collapsed;
    setCollapsed(next);
    window.localStorage.setItem(storageKey, next ? "1" : "0");
  }

  return (
    <section className="flex flex-col gap-3">
      <button
        type="button"
        onClick={toggle}
        className="flex items-center gap-2 text-left text-sm font-semibold uppercase tracking-wide text-[var(--muted-foreground)]"
      >
        <span
          className={`inline-block transition-transform duration-150 ${collapsed ? "-rotate-90" : ""}`}
        >
          &#9662;
        </span>
        {name}
      </button>
      <div className={hydrated && collapsed ? "hidden" : "contents"}>{children}</div>
    </section>
  );
}
