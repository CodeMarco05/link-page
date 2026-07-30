"use client";

import { useSyncExternalStore } from "react";

/** Subscribe callback shape expected by useSyncExternalStore. */
type Subscribe = (onChange: () => void) => () => void;

const noopSubscribe: Subscribe = () => () => {};

/**
 * Reads a value that only exists on the client (localStorage, the clock, …).
 *
 * On the server, and on the very first client render, `serverSnapshot` is used
 * so both agree; React then re-renders with the real client value. Using
 * useSyncExternalStore instead of an effect keeps the read in one place and
 * avoids setState-in-effect cascades.
 */
export function useClientValue<T>(
  getSnapshot: () => T,
  serverSnapshot: T,
  subscribe: Subscribe = noopSubscribe,
): T {
  return useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
}

/** Notifies subscribers on an interval — for values that change on their own. */
export function intervalSubscribe(ms: number): Subscribe {
  return (onChange) => {
    const timer = setInterval(onChange, ms);
    return () => clearInterval(timer);
  };
}
