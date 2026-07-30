"use client";

import { useCallback, type ReactNode } from "react";
import {
  readGroupCollapsed,
  subscribeToGroupCollapsed,
  writeGroupCollapsed,
} from "@/lib/group-collapse-storage";
import { useClientValue } from "@/lib/use-client-value";

export function CollapsibleGroup({ name, children }: { name: string; children: ReactNode }) {
  // null until the client has read localStorage, matching the server render.
  const collapsed = useClientValue(
    useCallback(() => readGroupCollapsed(name), [name]),
    null,
    subscribeToGroupCollapsed,
  );

  function toggle() {
    writeGroupCollapsed(name, !collapsed);
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
      <div className={collapsed ? "hidden" : "contents"}>{children}</div>
    </section>
  );
}
